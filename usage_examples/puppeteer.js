// npm install puppeteer axios request-promise-native
// Please https://github.com/berstend/puppeteer-extra if your using headless mode.
// Get Free api key here https://nocaptchaai.com
// Cheap promo 30k solves for 10$
// Selenium, puppeteer, python, playwright scripts https://github.com/shimuldn/hCaptchaSolverApi/tree/main/usage_examples

// https://free.nocaptchaai.com/api/solve for free user and https://pro.nocaptchaai.com/api/solve for paid user.

// Node selectors are different for most of the sites. Please adjust the selector accordingly.




const puppeteer = require('puppeteer');
const axios = require('axios');
const request_data = require('request-promise-native');

async function doSolvingWith_noCaptchaAi_API(uid, apikey, site, siteKey, account_type='free') {
    if (uid === "" || apikey === "") {
        console.log("Please input uid and apikey");
        return;
    }

    if (account_type === "free") {
        api_url = 'https://free.nocaptchaai.com/api/solve'
    } else {
        api_url = 'https://pro.nocaptchaai.com/api/solve'
    }

    if (siteKey === "") {
        console.log("Please input sitekey| sitekey is mendotory for free user. Paid user please ask us for a exception code.")
        return null
    }
    const config = {
        uid: uid, // Your uid
        apikey: apikey, // Your apikey
        siteKey: siteKey, // sitekey is mendotory for free user. Paid user please ask us for a exception code.
        baseUrl: api_url,
        siteUrl: site
    }
        
    const browser = await puppeteer.launch({
        headless: false,
        ignoreHTTPSErrors: true,
        userDataDir: `data`,
        slowMo: 0,
        args: [
            '--disable-gpu', '--disable-dev-shm-usage', '--no-sandbox', '--lang=en-US',
            '--window-size=700,900',
            '--start-maximized', '--disable-web-security', '--allow-running-insecure-content',
            '--disable-strict-mixed-content-checking', '--ignore-certificate-errors', '--disable-features=IsolateOrigins,site-per-process', '--blink-settings=imagesEnabled=true'
        ]
    })
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
    const page = await browser.newPage();
    await page.goto(config.siteUrl);
    await sleep(1000)
    const elementHandle = await page.waitForSelector(`div[class="h-captcha"] iframe`); //selector need to change for other site.
    const frame = await elementHandle.contentFrame();
    await frame.click('#checkbox')
    await sleep(1000)
    const fm = page.frames().find(f => f.url().startsWith('https://newassets.hcaptcha.com/captcha')); ////selector need to change for other site.

    await noCaptchaAi(await getImages(), await getTarget())

    async function noCaptchaAi(images, target) {
        try {
            // console.log(images, target)
            if ((Object.keys(images).length) == 9) {
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
                    console.log('Order', JSON.stringify(response.data))
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
                        console.log('Status', JSON.stringify(response.data))
                        return response.data
                    })
                    .catch((error) => {
                        console.log(error.status);
                    });
                        
                    if (status.status == 'solved') {
                        for (item of status.solution) {
                            // console.log(`Clicking ${item}`)
                            await ele[String(item)].click('.image')
                            await sleep(200)
                        }
                    }
                } else if (res.status == 'solved') {
                    console.log("Solved instantly!")
                    for (item of res.solution) {
                        await ele[String(item)].click('.image')
                        await sleep(400)
                    }
                } else if (res.status == 'skip') {
                    console.log(`API not able to solve this task ${target}, Skip`)
                }
                // console.log("Clicking submit.")
                await sleep(2000)

                const btn = await fm.evaluate(() => document.querySelector('.button-submit').textContent)
                await sleep(200)
                

                if (btn == 'Verify') {
                    await fm.evaluate(() => document.querySelector('.button-submit').click());
                    if ((Object.keys(await getImages()).length) == 9) {
                        await noCaptchaAi(await getImages(), await getTarget())
                    } else {{
                        console.log("Solved successfully")
                    }}
                } else if (btn == 'Next') {
                    await fm.evaluate(() => document.querySelector('.button-submit').click());
                    await noCaptchaAi(await getImages(), await getTarget())
                } else if (btn == 'Skip') {
                    await fm.evaluate(() => document.querySelector('.button-submit').click());
                    await noCaptchaAi(await getImages(), await getTarget())
                } else {
                    console.log("Unknown error")
                }
            } else {
                // console.log("images not found")
                TODO: "Fix ME"
                await noCaptchaAi(await getImages(), await getTarget())
            }
        }catch(e) {
            console.log("Node selectors are different for most of the sites. Please adjust the selector accordingly.")
        }
    }

    
    async function getImages() {
        let try_count = 0;
        async function findImages() {
            try {
                try_count = try_count+1
                const ele = await fm.$$('.task-image'); //selector need to change for other site.
                const data = {}
                for (let i = 0; i < ele.length; i++) {
                    const urlData = await ele[i].$eval('.image', i => i.style.background)
                    // console.log(urlData)
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
                // console.log((Object.keys(data).length))
                if ((Object.keys(data).length) != 9) {
                    if (try_count > 20){
                        await findImages()
                    } else {
                        return false
                    }
                } else {
                    return data
                }
                
            } catch(e){
                TODO: "Fix me"
                if (try_count > 20){
                    console.log("Selector are different based on the site. Please make sure selector are correct")
                } else {
                    return await findImages()
                }
            }
        }
        return await findImages()
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
}


uid = '', // Your uid
apikey = '', // Your apikey
site = 'https://shimuldn.github.io/hcaptcha/'

siteKey= 'sitekey' // sitekey is mendotory for free user. Paid user please ask us for a exception code.

account_type='free' // If your a paid user type 'paid' else 'free'

doSolvingWith_noCaptchaAi_API(uid=uid, apikey=apikey, site=site, siteKey=siteKey, account_type=account_type)
