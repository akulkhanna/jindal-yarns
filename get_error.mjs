import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    page.on('pageerror', err => {
        console.error('PAGE ERROR:', err.message);
    });
    page.on('console', msg => {
        console.log('CONSOLE:', msg.type(), msg.text());
    });

    await page.goto('http://localhost:5174/jindal-yarns/', { waitUntil: 'networkidle2' }).catch(x => console.log(x));
    await new Promise(r => setTimeout(r, 4000));
    await browser.close();
})();
