import { chromium } from 'playwright-core';
import assert from 'node:assert/strict';
const base = process.env.URL || 'http://127.0.0.1:21876/';
const ids = ['bases','yaml','helm','architecture','workloads','reseau','stockage','configuration','securite','deploiement','exploitation','atelier'];
const browser = await chromium.launch({executablePath: '/usr/bin/brave-browser', args:['--no-sandbox'], headless:true});
try {
  for (const width of [320, 390, 1440]) {
    const context = await browser.newContext({viewport:{width,height:800}, reducedMotion:'reduce', permissions:['clipboard-read','clipboard-write']});
    const page = await context.newPage(); const errors=[]; page.on('pageerror', e=>errors.push(String(e)));
    await page.goto(base + '#stockage');
    const nav=page.locator('[aria-label="Progression du parcours"]');
    await assertEventually('arrival hash', async()=>assert.equal(await page.locator('[aria-label="Progression du parcours"] [aria-current="location"]').evaluateAll(els=>els[0]?.getAttribute('href')),'#stockage'));
    for (const id of [...ids,...ids.slice().reverse()]) {
      await page.locator('#'+id).evaluate(el=>window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY + 20));
      await assertEventually(`scroll ${id}`,async()=>assert.equal(await page.locator('[aria-label="Progression du parcours"] [aria-current="location"]').evaluateAll(els=>els[0]?.getAttribute('href')),'#'+id));
      assert(await nav.isVisible());
    }
    await nav.locator('a[href="#atelier"]').focus(); await page.keyboard.press('Enter');
    await assertEventually('keyboard anchor',async()=>assert.equal(await page.locator('[aria-label="Progression du parcours"] [aria-current="location"]').evaluateAll(els=>els[0]?.getAttribute('href')),'#atelier'));
    await page.evaluate(()=>window.scrollTo(0,document.documentElement.scrollHeight));
    await assertEventually('bottom',async()=>assert.equal(await page.locator('[aria-label="Progression du parcours"] [aria-current="location"]').evaluateAll(els=>els[0]?.getAttribute('href')),'#atelier'));
    // Real wheel input crosses chapter boundaries in both directions, including short sections.
    for (const delta of [-560, 560]) {
      for (let i=0;i<12;i++) {
        await page.mouse.move(width/2, 300); await page.mouse.wheel(0,delta); await page.waitForTimeout(45);
        await assertEventually('wheel', async()=>{
          const state=await page.evaluate(()=>{
            const sections=[...document.querySelectorAll('section.chapter')];
            const line=Math.min(innerHeight*.3,180);
            let expected=sections.filter(s=>s.getBoundingClientRect().top<=line).at(-1)?.id || '';
            if(scrollY+innerHeight>=document.documentElement.scrollHeight-2) expected=sections.at(-1).id;
            return {expected,actual:document.querySelector('.progress [aria-current]')?.hash.slice(1) || ''};
          });
          assert.equal(state.actual,state.expected);
        });
      }
    }
    await assertEventually('render code',async()=>assert.equal(await page.locator('[data-slot="code-block"]').count(),11));
    const code=page.locator('#deploiement [data-slot="code-block"]').first();
    assert((await code.locator('code').innerText()).includes('apiVersion: apps/v1'));
    assert(await code.locator('code .key').count()>0);
    await code.locator('[data-slot="code-block-copy-button"]').click();
    await assertEventually('copy',async()=>assert.equal(await page.evaluate(()=>navigator.clipboard.readText()),await code.locator('code').innerText()));
    const memo=page.locator('#fiche');
    assert(await memo.locator('h2').isVisible());
    assert.equal(await memo.locator('.memo-copy').count(),5);
    await memo.locator('.memo-copy').first().click();
    assert.equal(await page.evaluate(()=>navigator.clipboard.readText()),'kubectl config current-context');
    for (const link of [page.locator('.top-links a[href="#fiche"]'),page.locator('.end-links a[href="#fiche"]'),page.locator('.top-links a[href^="https://github.com/"]'),page.locator('.end-links a[href^="https://github.com/"]')]) assert(await link.isVisible());
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth),true);
    await page.locator('summary').nth(1).click(); assert(await page.locator('details').nth(1).evaluate(el=>el.open));
    assert.deepEqual(errors,[]); console.log(`PASS ${width}: navigation, ancres, clavier, fin, code, copie, atelier`);
    await context.close();
  }
  const nojs = await browser.newContext({javaScriptEnabled:false, viewport:{width:320,height:800}, reducedMotion:'reduce'});
  const page = await nojs.newPage(); await page.goto(base);
  for (const id of ids) { await page.locator(`nav.chapters a[href="#${id}"]`).click(); assert.equal(await page.evaluate(()=>location.hash),'#'+id); }
  assert.equal(await page.locator('#deploiement pre code').count(),2);
  for (const name of ['demo.yaml','demo-chart/Chart.yaml','demo-chart/values.yaml','demo-chart/templates/deployment.yaml','demo-chart/templates/service.yaml']) {
    assert.equal(await page.locator('figure.code-example').filter({has:page.locator('figcaption', {hasText:name})}).count(),1, `visible file label ${name}`);
  }
  assert.equal(await page.locator('.learning-figure .legend').count(),2);
  assert(await page.locator('#deploiement .key').count()>0);
  await page.locator('summary').nth(1).focus(); await page.keyboard.press('Enter');
  assert(await page.locator('details').nth(1).evaluate(el=>el.open));
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  console.log('PASS sans JavaScript: ancres, exemples, atelier clavier'); await nojs.close();
} finally { await browser.close(); }
async function assertEventually(label, fn) { let last; for(let i=0;i<50;i++){try{await fn();return}catch(e){last=e; await new Promise(r=>setTimeout(r,50));}} throw new Error(label+': '+last); }
