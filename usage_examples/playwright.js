// npm install axios ghost-cursor playwright
// put your uid and key
// run node playwright.js in terminal

// https://github.com/Dollar3795/hCaptcha-Scraper

const { default: axios } = require("axios");
const { path } = require("ghost-cursor");
const playwright = require("playwright");
const solver = {
    "uid": "<UID>",
    "key": "<KEY>"
};

(async () => {
    function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min)) + min; }
    function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

    const url = "https://accounts.hcaptcha.com/demo?sitekey=4c672d35-0701-42b2-88c3-78380b0db560";

    const browser = await playwright.chromium.launch({ "headless": false });
    const context = await browser.newContext({ "viewport": null });
    await context.addInitScript("Object.defineProperty(navigator, \"webdriver\", {\"get\": () => false});");
    await context.addInitScript("navigator.mediaDevices.getUserMedia = navigator.webkitGetUserMedia = navigator.mozGetUserMedia = navigator.getUserMedia = webkitRTCPeerConnection = RTCPeerConnection = MediaStreamTrack = undefined;");
    const page = await context.newPage();

    await page.goto(url, { "waitUntil": "networkidle" });

    page.on("response", async function (response) {
        if (response.url().startsWith("https://hcaptcha.com/getcaptcha/")) {
            const resp = await response.json();
            let images = {};
            let counter = 1;
            let target = resp.requester_question.en.replace(/Please click each image containing an? /, "");
            for (const task of resp.tasklist) {
                images[counter - 1] = await axios.get(task.datapoint_uri, { responseType: "arraybuffer" }).then(response => Buffer.from(response.data, "base64").toString('base64'));
                counter = counter + 1;
            }
            await sleep(1000);
            console.log(await solve(images, target));
        }
    });

    const boxFrame = await page.waitForSelector("[title='widget containing checkbox for hCaptcha security challenge']").then(frame => frame.contentFrame()), boxBB = await boxFrame.waitForSelector("#anchor-wr").then(e => e.boundingBox());
    const site_key = await page.evaluate(() => {
        return document.querySelector("[title='widget containing checkbox for hCaptcha security challenge']").getAttribute("src").split("&sitekey=")[1].split("&")[0];
    });
    let cursorPos = { "x": 0, "y": 0 };
    for (const pos of path({ "x": 0, "y": 0 }, { "x": boxBB.x + getRandomInt(0, boxBB.width), "y": boxBB.y + getRandomInt(0, boxBB.height) })) {
        cursorPos = pos;
        await page.mouse.move(pos.x, pos.y);
        await sleep(Math.random() * 25);
    }
    await page.mouse.down();
    await sleep(Math.random() * 100);
    await page.mouse.up();
    await sleep(500);

    async function solve(images, target) {
        const captchaFrame = await page.waitForSelector("[title='Main content of the hCaptcha challenge']").then(frame => frame.contentFrame());
        let res = await axios({
            method: "post",
            url: "https://free.nocaptchaai.com/api/solve",
            headers: {
                "Content-type": "application/json",
                "uid": solver.uid,
                "apikey": solver.key
            },
            data: {
                "images": images,
                "target": target,
                "method": "hcaptcha_base64",
                "site": url,
                "sitekey": site_key
            }
        }).then((response) => { return response.data; })
        console.log(res);
        if (res.hasOwnProperty("url")) {
            let url_ = res.url, res_ = null, count = 0;
            while (true) {
                res_ = await axios({
                    method: "get",
                    url: url_
                }).then((response) => { return response.data; });
                console.log(res_);
                if (res_.hasOwnProperty("solution")) break;
                count++;
                if (count >= 5) return "Failed to Solve the Captcha."
                // Polling time 3s for paid user and 5s for free user
                await sleep(5000);
            }
            for (var correct of res_.solution) {
                await captchaFrame.click("body > div.challenge-container > div > div > div.task-grid > div:nth-child(" + (parseInt(correct) + 1) + ")");
                await sleep(getRandomInt(300, 500));
            }
            await captchaFrame.click(".button-submit");
            count = 0;
            let g_recaptcha_response = "";
            while (true) {
                g_recaptcha_response = await page.evaluate(() => { return document.querySelector("[id^='g-recaptcha-response-']").value; });
                if (g_recaptcha_response != "") { break; }
                count = count + 1;
                if (count >= 5) return "Failed to Solve the Captcha.";
                await sleep(1000);
            }
            return "Solved."
        } else {
            if (res.status == "skip") { await captchaFrame.click(".button-submit"); return "Skipped the Captcha."; }
            return "Failed to Solve the Captcha.";
        }
    }
    await sleep(100);
})();
