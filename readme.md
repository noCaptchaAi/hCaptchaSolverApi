<div align="center" padding="0" margin="0">

# hCaptcha Solver Api 
### by [noCaptchaAi.com](https://nocaptchaai.com)
<p align="center" position="inline" padding="0" margin="0">
<a href="https://t.me/noCaptchaAi" target="_blank"><img src="https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white"></a>
<a href="https://discord.gg/E7FfzhZqzA" target="_blank"><img src="https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white"></a>
<a href="https://discord.gg/E7FfzhZqzA"><img alt="Discord" src="https://img.shields.io/discord/994856206525018112"></a>

Blazing fast hCaptcha solver based on NeuralNet image detection AI. **Speed 0.04 ~ 1s/solve** , noCapcthaAi is scaleable and robust so you can throw any kind of load. It's as simple as send base64 images <code>post</code> request and get solved response. We're adding reCaptcha, geetest etc soon.

<h3><a href="https://nocaptchaai.com/register">Register Free trial 🔥</a> </h3>
<h3>Rate: 1000/0.3$ ~ Unlimited 10 threads/99$. More threads? <a href="https://docs.nocaptchaai.com/Intro">Check Plans</h3>
<h3></a> Buy on <a href="https://discord.gg/E7FfzhZqzA">Discord</a> or <a href="https://t.me/noCaptchaAi">Telegram<a/></h2>
<h3><a href="https://github.com/noCaptchaAi/hCaptchaSolver.user.js">Solver Userscript</a> ~ <a href="https://docs.nocaptchaai.com">Api Documents</a></h3>

</p>


<a href="https://stackblitz.com/edit/js-uvenoc?ctl=1&devToolsHeight=53&embed=1&file=index.js&theme=dark" target="_blank"><img src="https://user-images.githubusercontent.com/4178343/180646819-324163a8-0c4c-4571-b01c-2f98ab8a1127.gif" width="700"></a>


<i>Click image to go to website</i>


<a href="https://stackblitz.com/edit/js-uvenoc?ctl=1&devToolsHeight=53&embed=1&file=index.js&theme=dark" target="_blank"><img src="https://user-images.githubusercontent.com/4178343/192277689-3da6c94b-2407-43f4-a5dc-691e4b6d5196.png" width="700"></a>

<i>Live Demo | Click above image, go to Stackblitz IDE</i>


</div>



## Features

⚡ 0.04s ~ 1s solves \
🌐 Support all programming languages with HTTP api \
🌀 Scripts for Python, NodeJS, JS, Puppeteer, Selenium, Playwright and more \
💡 Works with cli tools too \
📦️ Browsers extensions (work in progress)




## QuickStart Solving hCaptcha's

1. Register [Free](https://nocaptchaai.com/register) ~ 1000 solves/month
   - 30,000 solve/ 10$ and Unlimited plans from 99$ month \*\*
2. Install hCaptcha Solver [UserScript](https://github.com/noCaptchaAi/hCaptchaSolver.user.js)
3. Copy `apikey` and `uid` sent to your email.
   - Edit installed `hCaptchaSolver.user.js` file
   - Paste them both 'inside',  ` config = { uid: '', apikey: '' },`
   - Start solving!

**Example Scripts:**

- [Selenium.py](usage_examples/example-selenium.py)
- [Puppeteer.js](usage_examples/puppeteer.js)
- [Puppeteer.ts](usage_examples/puppeteer.ts)
- [Python.py](usage_examples/example2.py)
- [Python_requests.py](usage_examples/python_requests.py)
- [Playwright.js](usage_examples/playwright.js)
- [Node.js](usage_examples/node.js)
- [JavaScript.js](usage_examples/javascript.js)

## Build your own scripts

### javaScript Example with `axios` and `fetch`

```js
// if you wanna use axios, get from CDN from unpkg or jsdeliver, eg. unpkg: https://unpkg.com/axios@1.0.0-alpha.1/dist/axios.min.js
// you need uid and apikey, get free here https://nocaptchaai.com

const uid = ''
const apikey = ''

var base64_json = {
   images: {
   "0": "base64 hash from image",
   "1": "base64 hash from image",
   "2": "base64 hash from image",
   "3": "base64 hash from image",
   "4": "base64 hash from image",
   "5": "base64 hash from image",
   "6": "base64 hash from image",
   "7": "base64 hash from image",
   "8": "base64 hash from image",
   "9": "base64 hash from image",
   "10": "base64 hash from image",
   "11": "base64 hash from image",
   "12": "base64 hash from image",
   "13": "base64 hash from image",
   "14": "base64 hash from image",
   "15": "base64 hash from image",
   "16": "base64 hash from image",
   "17": "base64 hash from image",
   "18": "base64 hash from image",
  },
  target: "Please click each image containing an airplane",
  method: "hcaptcha_base64",
  sitekey: "sitekey",
  site: "site"
};

//  axios
var res = await axios({
  method: "post",
  url: "https://free.nocaptchaai.com/api/solve",
  headers: {
    "Content-type": "application/json",
    uid: uid,
    apikey: apikey,
  },
  data: base64_json,
});

// fetch api
async function solve(images, target) {
  const request = await fetch("https://free.nocaptchaai.com/api/solve", {
    method: "post",
    headers: {
      "Content-type": "application/json",
      uid: uid,
      apikey: apikey,
    },
    body: JSON.stringify(base64_json),
  }).then((response) => {
    return response.json();
  }).then((data) => {
    console.log(data);
  });
}
```

## How to use API? How a solve works?

## 1) Send JSON `post` request to Api point

```
 https://free.nocaptchaai.com/api/solve
```

Convert images to Base64, JSON like below or [this.JSON](https://raw.githubusercontent.com/shimuldn/hCaptchaSolverApi/main/usage_examples/base64-body-format.json)

```json
{
  "images": {
    "0": "1st base64 image hash",
    "1": "if another base64 hash",
    "2": "if another base64 hash",
    "3": "if another base64 hash",
    "4": "if another base64 hash",
    "5": "if another base64 hash",
    "6": "if another base64 hash",
    "7": "if another base64 hash",
    "8": "if another base64 hash",
    "9": "if another base64 hash",
    "10": "if another base64 hash",
    "11": "if another base64 hash",
    "12": "if another base64 hash",
    "13": "if another base64 hash",
    "14": "if another base64 hash",
    "15": "if another base64 hash",
    "16": "if another base64 hash",
    "17": "if another base64 hash",
    "18": "max 18 base64 hash"
  },
  "target": "Please click each image containing an airplane",
  "method": "hcaptcha_base64",
  "sitekey": "sitekey",
  "site": "site"
}
```

## 2) GET Solved

a) response:

```json
{
    "createdat": 1662353086,
    "id": "h-q7FBc9fXJ0V69ox4",
    "status": "new",
    "target": "airplane",
    "url": "https://free.nocaptchaai.com/api/status?id=h-q7FBc9fXJ0V69ox4"
}
```

Send a GET request to url your received, can be used as to check status for tasks not insatntly solved.

```
https://free.nocaptchaai.com/api/status?id=h-q7FBc9fXJ0V69ox4
```

b) Instant solved status (Paid user only!):

```json
{
    "processing_time": "0.05s",
    "solution": [
        1,
        3,
        4,
        6
    ],
    "status": "solved"
}
```

Glossary:

- `target` = the text you see on hcaptcha popup describing the challenge
- `method` = our internal param so keep as it is
- `site` = your target domain
- `sitekey` = find the sitekey on your target html page: ` <div class="h-captcha" data-sitekey="your_site_key"></div>`
- note: sitekey and site info collected to improve accuracy. we respect privacy.

### Got suggestions, questions?

email to <a href="mailto:ai@nocaptchaai.com">ai@nocaptchaai.com</a>

### Enterprise/company with custom requirements?

Enterprise/company mail us <a href="mailto:ai@nocaptchaai.com">ai@nocaptchaai.com</a>

<a href="https://discord.gg/E7FfzhZqzA" target="_blank">
<img src="https://camo.githubusercontent.com/73982ce1ec8b82ac1c26e2ff755e44b20005fe131c0836810499dc61a3d4f43f/68747470733a2f2f646973636f72642e636f6d2f6173736574732f65633263333463616464346235663435393434313531323733383061383565362e69636f" width="15" height="15"> Discord</a>
 <a href="https://t.me/noCaptchaAi" target="_blank">
<img src="https://telegram.org/img/favicon.ico"  width="15" height="15"> Telegram </a>

<br>

### [Back to top](#readme)
