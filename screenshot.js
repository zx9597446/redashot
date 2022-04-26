const puppeteer = require('puppeteer');
const fs = require('fs');
const readline = require('readline');
const { URL } = require('url');

screenshot = async function screenshot(browser, url) {
    const parsed = new URL(url);
    const r1 = parsed.pathname.replaceAll('/', '.');
    const r2 = `output/${parsed.hostname}.${r1}.png`;
    const saveas = r2.replaceAll('..', '.');
    console.log(`requesting ${url} ==> ${saveas}`)

    const page = await browser.newPage();
    await page.setViewport({width: 900, height: 50});
    await page.setDefaultNavigationTimeout(0);
    await page.goto(url, {waitUntil: 'networkidle0', timeout: 0});
    //await page.evaluate(hideElements);
    await page.screenshot({fullPage: true, path: saveas});
    await page.close();
};

async function processLineByLine(browser) {
    const fileStream = fs.createReadStream('url.list');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    for await (const line of rl) {
        await screenshot(browser, line)
    }
}

(async () => {
    const dir = 'output'
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    const browser = await puppeteer.launch({headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox']});
    //const browser = await puppeteer.launch({headless: false});

    await processLineByLine(browser);

    await browser.close()
}) ();

