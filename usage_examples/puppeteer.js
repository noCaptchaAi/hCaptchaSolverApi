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

(async function noCaptcha() {
    const config = {
        uid: '', // Your uid
        apikey: '', // Your apikey
        sitekey: '<site key here>', // sitekey is mendotory for free user. Paid user please ask us for a exception code.
        baseUrl: 'https://free.nocaptchaai.com/api/solve',
        // baseUrl: 'https://pro.nocaptchaai.com/api/solve', // Enable this if your pro/paid user and disable free one
        siteUrl: 'https://shimuldn.github.io/hcaptcha/',
        base64: false  // Sending url is going away end of Sep 2022 So use base64
    },
    browser = await puppeteer.launch({
        headless: false,
        ignoreHTTPSErrors: true,
        userDataDir: 'data',
        slowMo: 0,
        args: [
            '--disable-gpu', '--disable-dev-shm-usage', '--no-sandbox', '--lang=en-US',
            '--window-size=1000,900',
            '--start-maximized', '--disable-web-security', '--allow-running-insecure-content',
            '--disable-strict-mixed-content-checking', '--ignore-certificate-errors', '--disable-features=IsolateOrigins,site-per-process', '--blink-settings=imagesEnabled=true'
        ]
    }),
    sleep = ms => new Promise(resolve => setTimeout(resolve, ms)),
    page = await browser.newPage();
    
    await page.goto(config.siteUrl);
    await sleep(3000)
    const elementHandle = await page.waitForSelector('div[class="h-captcha"] iframe');
    const frame = await elementHandle.contentFrame();
    await frame.click('#checkbox')
    await sleep(3000)
    const fm = page.frames().find(f => f.url().startsWith('https://newassets.hcaptcha.com/captcha'));

    const ele = await fm.$$('.task-image');
    const data = {
        'images': await getImages(),
        'target': await getTarget(),
        'site': config.siteUrl
    }
    data[config.base64 ? 'sitekey' : 'site_key'] = config.sitekey;
    data[config.base64 ? 'method' : 'data_type'] = config.base64 ? 'hcaptcha_base64' : 'url';
    const res = await axios({
        method: 'post',
        url: config.baseUrl,
        headers: {
            'Content-type': 'application/json',
            'uid': config.uid,
            'apikey': config.apikey
        },
        data
    })
    .then((response) => {
        console.log('Order', response.status, JSON.stringify(response.data))
        return response.data
    })
    .catch(console.log);
//     console.log(res);
    if (res.status == 'new') {
        await sleep(2000)
        const status = await axios({
            method: 'get',
            url: res.url
        })
        .then((response) => {
           console.log('Status',response.status, JSON.stringify(response.data))
            return response.data
        })
        .catch(console.log);
//         console.log(status);
        if (status.status == 'solved') {
            for (item of status.solution) {
                await ele[item].click('.image')
                await sleep(200)
            }
        }
    }

    let btn = await fm.evaluate(() => document.querySelector('.button-submit').textContent)
    await sleep(200)
    await fm.evaluate(() => document.querySelector('.button-submit').click());

    if (btn == 'Verify') {
        await sleep(2000)
        btn = await fm.evaluate(() => document.querySelector('.button-submit').textContent)
        if (btn == 'Next' || btn == 'Skip') {
            noCaptcha()
        }
    } else if (btn == 'Next' || btn == 'Skip') {
        noCaptcha()
    } else {
        await sleep(1000)
    }

    async function getImages() {
        const ele = await fm.$$('.task-image');
        const data = {};
        for (let i = 0; i < ele.length; i++) {
            const urlData = await ele[i].$eval('.image', i => i.style.background);
            const url = urlData.match(/url\("(.*)"/)[1] || 0;
            if (config.base64) {
                TODO: "Need to make image download faster."
                const d = await request_data({
                        url,
                        method: 'GET',
                        encoding: null // This is actually important, or the image string will be encoded to the default encoding
                    })
                    .then(result => {
                        let imageBuffer = Buffer.from(result);
                        let imageBase64 = imageBuffer.toString('base64');
                        return imageBase64
                    });
                data[i] = d

            }
            else {
                data[i] = url;
            }
        }
        return data
    }

    async function getTarget() {
        try {
            return await fm.evaluate(() => document.querySelector('.prompt-text').textContent);
        } catch (e) {
            console.log(e)
            await sleep(500)
        }
    }
})();
