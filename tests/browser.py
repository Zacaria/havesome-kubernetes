from playwright.sync_api import sync_playwright
import sys
url = sys.argv[1] if len(sys.argv) > 1 else 'http://127.0.0.1:18764/'
with sync_playwright() as p:
    browser = p.chromium.launch(executable_path='/usr/bin/brave-browser', headless=True, args=['--no-sandbox'])
    for width in (320, 390, 1440):
        page = browser.new_page(viewport={'width': width, 'height': 900}, java_script_enabled=False, reduced_motion='reduce')
        errors = []
        page.on('pageerror', lambda error: errors.append(str(error)))
        response = page.goto(url, wait_until='load')
        assert response and response.status == 200
        assert page.locator('html').get_attribute('lang') == 'fr'
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), f'overflow {width}'
        for anchor in ('architecture','workloads','reseau','stockage','configuration','securite','deploiement','exploitation','atelier'):
            page.locator(f'nav a[href="#{anchor}"]').click()
            assert page.evaluate('location.hash') == '#' + anchor
            assert page.locator('#' + anchor).bounding_box()['y'] < 900
        summary = page.locator('summary').nth(1)
        summary.focus(); page.keyboard.press('Enter')
        assert summary.locator('..').get_attribute('open') is not None
        assert 'readiness' in summary.locator('..').inner_text()
        assert not errors
        page.goto(url); page.screenshot(path=f'/home/hermes/.hermes/profiles/builder/cache/scratch/kubernetes-{width}.png')
        print(f'PASS {width}px: 9 ancres, atelier clavier, sans JS, pas de débordement')
        page.close()
    browser.close()
