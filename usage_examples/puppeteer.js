// npm install puppeteer axios request-promise-native
// Please https://github.com/berstend/puppeteer-extra if your using headless mode.
// Get Free api key here https://nocaptchaai.com
// Cheap promo 30k solves for 10$
// Unlimited plans starts from 99$
// Selenium, puppeteer, python, playwright scripts https://github.com/shimuldn/hCaptchaSolverApi/tree/main/usage_examples

// https://free.nocaptchaai.com/api/solve for free user and https://pro.nocaptchaai.com/api/solve for paid user.

const puppeteer = require('puppeteer');
const axios = require('axios');
const request_data = require('request-promise-native');

(async () => {

    const config = {
        uid: '', // Your uid
        apikey: '', // Your apikey
        siteKey: '<site key here>', // sitekey is mendotory for free user. Paid user please ask us for a exception code.
        baseUrl: 'https://free.nocaptchaai.com/api/solve',
        // baseUrl: 'https://pro.nocaptchaai.com/api/solve', // Enable this if your pro/paid user and disable free one
        siteUrl: 'https://shimuldn.github.io/hcaptcha/'
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
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
    const page = await browser.newPage();
    await page.goto(config.siteUrl);
    await sleep(3000)
    const elementHandle = await page.waitForSelector(`div[class="h-captcha"] iframe`);
    const frame = await elementHandle.contentFrame();
    await frame.click('#checkbox')
    await sleep(3000)
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
                'method': 'hcaptcha_base64',
                'sitekey': config.siteKey,
                'site': config.siteUrl
            }
        })
        .then((response) => {
            console.log('Order', response.status, JSON.stringify(response.data))
            return response.data
        })
        .catch(console.log);

        if (res.status == 'new') {
            await sleep(2000)
            const status = await axios({
                method: 'get',
                url: res.url,
                headers: {
                    'Content-type': 'application/json',
                    'uid': config.uid,
                    'apikey': config.apikey
                },
            })
            .then((response) => {
                console.log('Status',response.status, JSON.stringify(response.data))
                return response.data
            })
            .catch((error) => {
                console.log(error.status);
              });
                
            if (status.status == 'solved') {
                for (item of status.solution) {
                    await ele[String(item)].click('.image')
                    await sleep(200)
                }
            }
        } else if (res.status == 'solved') {
            for (item of res.solution) {
                await ele[String(item)].click('.image')
                await sleep(200)
            }
        }
        // await sleep(20000)
        const btn = await fm.evaluate(() => document.querySelector('.button-submit').textContent)
        await sleep(200)
        await fm.evaluate(() => document.querySelector('.button-submit').click());

        if (btn == 'Verify') {
            await sleep(2000)
        } else if (btn == 'Next' || btn == 'Skip') {
            await solve(await getImages(), await getTarget())
        } else {
            await sleep(1000)
        }
    }

    async function getImages() {
        const ele = await fm.$$('.task-image');
        const data = {}
        for (let i = 0; i < ele.length; i++) {;
            const urlData = await ele[i].$eval('.image', i => i.style.background)
            url = urlData.match(/url\("(.*)"/)[1] || 0;
            
            TODO: "Need to make image download faster."
            var d = await request_data({
                url: url,
                method: 'GET',
                encoding: null // This is actually important, or the image string will be encoded to the default encoding
            })
                .then(result => {
                    let imageBuffer  = Buffer.from(result);
                    let imageBase64  = imageBuffer.toString('base64');
                    return imageBase64
                });
            data[i]=d
        }
        return data
    }

    async function getTarget() {
        try {
            const e = await fm.evaluate(() => document.querySelector('.prompt-text').textContent);
            // return e.replace('Please click each image containing an ', '').replace('Please click each image containing a ', '')
            return e
        } catch (e) {
            console.log(e)
            await sleep(500)
        }
    }
})();
