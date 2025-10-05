from playwright.sync_api import sync_playwright, Page, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # Navigate to Dashboard and take screenshot
    page.goto("http://localhost:3000/dashboard")
    expect(page.get_by_role("heading", name="Dashboard")).to_be_visible()
    expect(page.get_by_text("Invoice Chart")).to_be_visible()
    page.screenshot(path="jules-scratch/verification/final_dashboard.png")

    # Navigate to Clients and take screenshot
    page.goto("http://localhost:3000/clients")
    expect(page.get_by_role("heading", name="Clients")).to_be_visible()
    page.screenshot(path="jules-scratch/verification/final_clients.png")

    # Navigate to New Client page and take screenshot
    page.goto("http://localhost:3000/clients/new")
    expect(page.get_by_role("heading", name="New Client")).to_be_visible()
    page.screenshot(path="jules-scratch/verification/final_new_client.png")

    # Navigate to Settings and take screenshot
    page.goto("http://localhost:3000/settings")
    expect(page.get_by_role("heading", name="Settings")).to_be_visible()
    page.screenshot(path="jules-scratch/verification/final_settings.png")

    # Navigate to Invoices and take screenshot
    page.goto("http://localhost:3000/")
    expect(page.get_by_role("heading", name="Invoices")).to_be_visible()
    # Check for the first actions dropdown to be visible
    expect(page.get_by_role("button", name="Open menu").first).to_be_visible()
    page.screenshot(path="jules-scratch/verification/final_invoices.png")

    context.close()
    browser.close()

with sync_playwright() as playwright:
    run(playwright)