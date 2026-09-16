import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

for (const width of [390,768,1440]) {
  test(`logistics globe at ${width}px`,async({page})=>{
    const errors:string[]=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.setViewportSize({width,height:1000});
    await page.goto('/');
    await expect(page.locator('.logistics-globe canvas')).toHaveCount(0);
    await page.locator('.logistics-globe').scrollIntoViewIfNeeded();
    await expect(page.locator('.logistics-globe')).toHaveClass(/is-ready/,{timeout:45000});
    await expect(page.locator('.logistics-globe canvas')).toBeVisible();
    await expect(page.locator('.logistics-globe')).toHaveAttribute('data-active','true');
    await page.waitForTimeout(1800);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
    expect((await new AxeBuilder({page}).include('#global-scale').withTags(['wcag2a','wcag2aa']).analyze()).violations).toEqual([]);
    await page.evaluate(()=>{if(document.activeElement instanceof HTMLElement)document.activeElement.blur();});
    await page.waitForTimeout(1200);
    await page.locator('#global-scale').screenshot({path:`test-results/globe-${width}.png`});
    await page.locator('h1').scrollIntoViewIfNeeded();
    await expect(page.locator('.logistics-globe')).toHaveAttribute('data-active','false');
    expect(errors).toEqual([]);
  });
}
test('reduced motion retains a static globe',async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('/');
  await page.locator('.logistics-globe').scrollIntoViewIfNeeded();
  await expect(page.locator('.logistics-globe')).toHaveClass(/is-ready/,{timeout:45000});
  await expect(page.locator('.logistics-globe')).toHaveAttribute('data-reduced','true');
  await expect(page.locator('.logistics-globe canvas')).toBeVisible();
});
