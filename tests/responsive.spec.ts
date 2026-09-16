import { test, expect } from "@playwright/test";

for (const [width,height] of [[320,740],[390,844],[768,1024],[1024,768],[844,390],[1440,1000]]) {
  test(`responsive layout ${width}x${height}`, async ({page}) => {
    await page.setViewportSize({width,height});
    await page.goto("/");
    await page.evaluate(()=>document.fonts.ready);
    await expect(page.locator("h1")).toBeVisible();
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBeTruthy();
    if(width<=1024){
      await page.getByRole("button",{name:"Menu"}).click();
      await expect(page.locator("#primary-navigation")).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(page.locator("#primary-navigation")).toBeHidden();
    }
    for(const selector of ["#partner-rates","#why-zineps","#shipping-ai","#global-scale","#difference","#news","#get-started"]){
      await page.locator(selector).scrollIntoViewIfNeeded();
      expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),selector).toBeTruthy();
    }
    const tabs=page.getByRole("tab");
    await tabs.nth(1).click();
    await expect(tabs.nth(1)).toHaveAttribute("aria-selected","true");
    if(width<=1024 && height>=620){
      const size=await page.locator(".parcel-studio").boundingBox();
      expect(size?.height).toBeGreaterThan(160);
    }
  });
}
