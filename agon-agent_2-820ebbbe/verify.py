import re
from playwright.sync_api import sync_playwright

clean = lambda s: re.sub(r"\s+", " ", s or "").strip()

with sync_playwright() as p:
    b = p.chromium.launch()
    page = b.new_page(viewport={"width": 390, "height": 844})
    page.goto("http://127.0.0.1:4173/")

    # Overdue flow: watered 20 days ago, 7-day interval -> check due + restart button
    page.fill("#plant-search", "monstera")
    page.click('button:has-text("Monstera")')
    page.click('label:has(input[name="pot-size"][value="medium"])')
    page.click('label:has(input[name="light"][value="bright-indirect"])')
    page.fill("#last-watered", "2026-11-01")
    page.click('button[type="submit"]')
    page.wait_for_selector("article.print-card")
    print("DUE CARD:", clean(page.text_content("article.print-card"))[:300])
    print("restart button visible:", page.is_visible('button:has-text("Checked and watered today?")'))

    # Click it -> schedule recalculates from today (Nov 20 + 7 = Nov 27)
    page.click('button:has-text("Checked and watered today?")')
    page.wait_for_selector("text=Next check:")
    print("AFTER RESTART:", clean(page.text_content("article.print-card"))[:260])
    print("restart button gone:", page.is_visible('button:has-text("Checked and watered today?")') is False)
    page.emulate_media(media="print")
    page.screenshot(path=".shots/overdue-print.png", full_page=True)
    b.close()
    print("DONE")
