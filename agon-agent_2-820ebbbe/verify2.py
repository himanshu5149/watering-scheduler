import re
from playwright.sync_api import sync_playwright

clean = lambda s: re.sub(r"\s+", " ", s or "").strip()

with sync_playwright() as p:
    b = p.chromium.launch()
    page = b.new_page(viewport={"width": 390, "height": 844})
    page.goto("http://127.0.0.1:4173/")
    page.click('button:has-text("My plant isn’t listed")')
    page.fill("#custom-plant-name", "Test plant")
    page.fill("#custom-plant-days", "7.5")
    print("helper:", clean(page.text_content("text=(custom) — base interval")))
    page.click('label:has(input[name="pot-size"][value="medium"])')
    page.click('label:has(input[name="light"][value="bright-indirect"])')
    page.click('button[type="submit"]')
    page.wait_for_selector("article.print-card")
    print("CARD:", clean(page.text_content("article.print-card"))[:160])
    page.emulate_media(media="print")
    page.screenshot(path=".shots/custom-print.png", full_page=True)
    b.close()
    print("DONE")
