<div align="center">

![GitHub Repo stars](https://img.shields.io/github/stars/shimuldn/hCaptchaSolverApi?style=flat-square)
<img alt="Discord" src="https://img.shields.io/discord/994856206525018112">

<p>
  <a href="https://discord.gg/E7FfzhZqzA" target="_blank">
<img src="https://camo.githubusercontent.com/73982ce1ec8b82ac1c26e2ff755e44b20005fe131c0836810499dc61a3d4f43f/68747470733a2f2f646973636f72642e636f6d2f6173736574732f65633263333463616464346235663435393434313531323733383061383565362e69636f" width="15" height="15"> Discord</a> 
 <a href="https://t.me/hCaptchaSolverApi" target="_blank">
<img src="https://telegram.org/img/favicon.ico"  width="15" height="15"> Telegram </a>
</p>

**[🔥 register for Free trial credits and API key & ⭐ us 🔥](https://nocaptchaai.com/register)**  \
 **promo discount 30000 solves / 10$** on our [discord](https://discord.gg/E7FfzhZqzA)

## noCapcthaAi hCaptcha Solver

<h3>noCaptcha AI recognizes and solves hcaptcha challenges with our HTTP Api. <br>
It's so fast that you will tell your mom about it, lot faster than 2captcha and others.
</h3> 

![hCaptchaSolverApi_Demo_Selenium](https://user-images.githubusercontent.com/4178343/180646819-324163a8-0c4c-4571-b01c-2f98ab8a1127.gif)
<i>Selenium</i>
  
</div>

## Features
⚡ Average solve within: 0.4-5s \
🌀 Puppeteer, selenium, playwright and all platforms supporting http request \
🌐 Going to work with userscripts \
💡 Great with cli tools too \
📦️ browsers extensions (soon..)


## Enough talk? where is my API?

1. **[Register for Free trial credits and API key](https://nocaptchaai.com/register)** ~ 1000/month
2. apikey uid sent to email

## Quickstart

Example Send JSON `Post` Request:
Base64 images ~ body.JSON [here](https://raw.githubusercontent.com/shimuldn/hCaptchaSolverApi/main/usage_examples/base64-body-format.json)

Example Scripts:
* Selenium [here](https://github.com/shimuldn/hCaptchaSolverApi/blob/main/usage_examples/example-selenium.py)
* puppeteer [here]( https://github.com/shimuldn/hCaptchaSolverApi/blob/main/usage_examples/puppeteer.js)
* puppeteer2  [here](https://github.com/shimuldn/hCaptchaSolverApi/blob/main/usage_examples/puppeteer2.js)
* python  [here](https://github.com/shimuldn/hCaptchaSolverApi/blob/main/usage_examples/example2.py)
* python_requests [here](https://github.com/shimuldn/hCaptchaSolverApi/blob/main/usage_examples/python_requests.py)
* playwright  [here](https://github.com/shimuldn/hCaptchaSolverApi/blob/main/usage_examples/playwright.js)
* NodeJs [here](https://github.com/shimuldn/hCaptchaSolverApi/blob/main/usage_examples/node.js)
* JavaScript [here](https://github.com/shimuldn/hCaptchaSolverApi/blob/main/usage_examples/javascript.js)



## How to use API? or How to solve captchas?

Api point

```
 https://free.nocaptchaai.com/api/solve
```

Send JSON format like below: Convert images tpo Base64 hash

```
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

Glossary:

   * `target` = the text you see on hcaptcha popup describing the challenge
   * `method` = our internal param so keep as it is
   * `site` = your target domain
   * `sitekey` = find the sitekey on your target html page: ``` <div class="h-captcha" data-sitekey="your_site_key"></div>```
   * note: sitekey and site info collected to improve accuracy. we respect privacy.

Solve request status: send 'get' request
api endpoint : 

```
 https://free.nocaptchaai.com/api/solve
```

{
    "createdat": 1662353086,
    "id": "h-q7FBc9fXJ0V69ox4",
    "status": "new",
    "target": "adult cat",
    "url": "https://pro.nocaptchaai.com/api/status?id=h-q7FBc9fXJ0V69ox4"
}

Instantolved status:

{
    "processing_time": "1.27s",
    "solution": [
        1,
        3,
        4,
        6
    ],
    "status": "solved"
}
```

### Got suggestions, questions?
email to <a href="mailto:ai@nocaptchaai.com">ai@nocaptchaai.com</a>


### Enterprise/company with custom requirements?
Enterprise/company mail us <a href="mailto:ai@nocaptchaai.com">ai@nocaptchaai.com</a>


<a href="https://discord.gg/E7FfzhZqzA" target="_blank">
<img src="https://camo.githubusercontent.com/73982ce1ec8b82ac1c26e2ff755e44b20005fe131c0836810499dc61a3d4f43f/68747470733a2f2f646973636f72642e636f6d2f6173736574732f65633263333463616464346235663435393434313531323733383061383565362e69636f" width="15" height="15"> Discord</a> 
 <a href="https://t.me/hCaptchaSolverApi" target="_blank">
<img src="https://telegram.org/img/favicon.ico"  width="15" height="15"> Telegram </a>

<br>
  
  
### [Back to top](#hcaptcha-solver-api-beta)
