const puppeteer = require('puppeteer');
const axios = require('axios');

(async () => {

    const config = {
        uid: '',
        apikey: '',
        siteKey: '',
        baseUrl: 'https://solve.shimul.me/api/solve',
        siteUrl: ''
    }
        
    const browser = await puppeteer.launch({
        headless: false,
        ignoreHTTPSErrors: true,
        userDataDir: `data`,
        slowMo: 0,
        args: [
            '--disable-gpu', '--disable-dev-shm-usage', '--no-sandbox', '--lang=en-US',
            '--window-size=1000,900',
            '--start-maximized', '--disable-web-security', '--allow-running-insecure-content',
            '--disable-strict-mixed-content-checking', '--ignore-certificate-errors', '--disable-features=IsolateOrigins,site-per-process', '--blink-settings=imagesEnabled=true'
        ]
    })

    const page = await browser.newPage();
    await page.goto(config.siteUrl);
    await page.waitForTimeout(3000)
    const elementHandle = await page.waitForSelector(`div[class="h-captcha"] iframe`);
    const frame = await elementHandle.contentFrame();
    await frame.click('#checkbox')
    await page.waitForTimeout(3000)
    const fm = page.frames().find(f => f.url().startsWith('https://newassets.hcaptcha.com/captcha'));

    await solve(await getImages(), await getTarget())

    async function solve(images, target) {
        const ele = await fm.$$('.task-image');
        const res = await axios({
            method: 'post',
            url: config.baseUrl,
            headers: {
                'Content-type': 'application/json',
                'uid': config.uid,
                'apikey': config.apikey
            },
            data: {
                'images': images,
                'target': target,
                'data_type': 'url',
                'site_key': config.siteKey,
                'site': config.siteUrl
            }
        })
        .then((response) => {
            console.log(response.status, JSON.stringify(response.data))
            return response.data
        })
        .catch(console.log);

        if (res.status == 'new') {
            await page.waitForTimeout(2000)
            const status = await axios({
                method: 'get',
                url: res.url
            })
            .then((response) => {
                console.log(response.status, JSON.stringify(response.data))
                return response.data
            })
            .catch(console.log);
                
            if (status.status == 'solved') {

                for (item of status.solution) {
                    await ele[item].click('.image')
                    await page.waitForTimeout(200)
                }
            }
        }
              
        const btn = await fm.evaluate(() => document.querySelector('.button-submit').textContent)
        await page.waitForTimeout(200)
        await fm.evaluate(() => document.querySelector('.button-submit').click());

        if (btn == 'Verify') {
            await page.waitForTimeout(2000)
        } else if (btn == 'Next' || btn == 'Skip') {
            await solve(await getImages(), await getTarget())
        } else {
            await page.waitForTimeout(1000)
        }
    }

    async function getImages() {
        const ele = await fm.$$('.task-image');
        const data = {}
        for (let i = 0; i < ele.length; i++) {;
            const urlData = await ele[i].$eval('.image', i => i.style.background)
            data[i] = urlData.match(/url\("(.*)"/)[1] || 0;
        }
        return data
    }

    async function getTarget() {
        try {
            const e = await fm.evaluate(() => document.querySelector('.prompt-text').textContent);
            return e.replace('Please click each image containing an ', '').replace('Please click each image containing a ', '')
        } catch (e) {
            console.log(e)
            await page.waitForTimeout(500)
        }
    }
})();
