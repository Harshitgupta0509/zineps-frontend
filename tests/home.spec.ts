import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const width of [390, 768, 1440]) {
  test(`complete homepage and accessibility at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    await expect(page.locator("h1")).toHaveText(
      "The intelligent layer for global logistics",
    );
    await expect(page.locator("main>section")).toHaveCount(14);
    await expect(page.locator('.logo-set:not([aria-hidden="true"]) img')).toHaveCount(18);
    await expect(page.locator(".faq-item")).toHaveCount(6);
    await expect(page.locator(".news-card")).toHaveCount(3);
    const overflowing = await page.locator("body *").evaluateAll(elements => ({width:innerWidth,scroll:document.documentElement.scrollWidth,items:elements.filter(el => el.getBoundingClientRect().right > innerWidth).map(el => ({tag:el.tagName,cls:el.getAttribute('class'),right:el.getBoundingClientRect().right,overflow:getComputedStyle(el).overflow})).slice(0,25)}));
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ), JSON.stringify(overflowing),
    ).toBeTruthy();
    const images = await page.locator("img").evaluateAll(async (elements) => {
      elements.forEach((img) => {
        (img as HTMLImageElement).loading = "eager";
      });
      await Promise.all(
        elements.map((img) =>
          (img as HTMLImageElement).decode().catch(() => {}),
        ),
      );
      return elements
        .filter((img) => !(img as HTMLImageElement).naturalWidth)
        .map((img) => (img as HTMLImageElement).src);
    });
    expect(images).toEqual([]);
    const accessibility = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(accessibility.violations).toEqual([]);
    await page.screenshot({
      path: `test-results/home-${width}.png`,
      fullPage: true,
    });
    await page.screenshot({
      path: `test-results/hero-${width}.png`,
      fullPage: false,
    });
  });
}
test("navigation, search, FAQ and honest subscription handoff", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const menu = page.getByRole("button", { name: "Menu" });
  await menu.click();
  await page
    .locator(".nav-links summary")
    .filter({ hasText: "Products" })
    .click();
  await expect(
    page
      .getByRole("navigation", { name: "Primary navigation" })
      .getByRole("link", { name: "Shipping for e-commerce & SMEs" }),
  ).toHaveAttribute("href", "https://www.zineps.com/shipping");
  await page.keyboard.press("Escape");
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await page
    .getByLabel("Search questions", { exact: true })
    .fill("shipping contract");
  await expect(page.locator(".faq-item")).toHaveCount(1);
  const question = page.locator(".faq-item summary");
  await question.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".faq-item")).toHaveAttribute("open", "");
  await expect(page.locator(".faq-answer>p")).toContainText("favorable rates");
  await page
    .getByLabel("Email address", { exact: true })
    .fill("test@example.com");
  await page.getByRole("button", { name: "Subscribe", exact: true }).click();
  await expect(
    page.getByRole("link", { name: /complete your subscription/ }),
  ).toHaveAttribute("href", "https://www.zineps.com");
});
