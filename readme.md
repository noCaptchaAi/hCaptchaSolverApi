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

# hCaptcha Solver Api (beta)  

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
[Usage examples](https://github.com/shimuldn/hCaptchaSolverApi/tree/main/usage_examples) \
check our Puppeteer, selenium, playwright, node, python scripts and test with our apikey

## How to use API? or How to solve captchas?

Our API solves challenges with http requests. So when you send `post` request with JSON formatted like below our api receves your task, then a `get` request gives you solved response which you can implement on your system. Please follow steps below a the `JOSN` format you need to send:

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

1. You need `uid`, `apikey` from email we sent

2. Use our solving http endpoint:
   ```
   https://free.nocaptchaai.com/api/solve/
   ``` 
3. Access target hcaptcha challenge images and convert them to valid image hash of `base64` ([how?](https://duckduckgo.com/?hps=1&q=converting+image+to+base64+stackoverflow&ia=web))

4. Store the base64 hashes you converted in step 3 in variables on your platform/language you're using.

5. Follow below code block for the `JSON` you need to send to our endpoint, max 18 image hashes are accepted.

   * `target` = the text you see on hcaptcha popup describing the challenge
   * `method` = our internal param so keep as it is
   * `site` = your target domain
   * `sitekey` = find the sitekey on your target html page: ``` <div class="h-captcha" data-sitekey="your_site_key"></div>```
   * note: sitekey and site info collected to improve accuracy. we respect privacy.

5. Test with Insomnia, postman or a REST API client to check if youre sending valid JSON like above, look at response from our api, it'll tell you mostly if there's problem with format or such.

6. api response our server sends are self-explanatory, but if you're stuck google

7. send request, if solved, you see something like this. Where the numbers represent the images index as you sent in order.


```
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
8. use above info to tell your code or UI based interface to select these images index from `solution` and send for submission.

9. you should now get your hcaptcha challenge solved by an automated Ai.

10. your did it, good job! 

Stuck or no stuck, join our discord community, admins are active and instant updates are posted there.

### Got suggestions, questions?
email to <a href="mailto:ai@nocaptchaai.com">ai@nocaptchaai.com</a>


### Enterprise/company with custom requirements?
email us <a href="mailto:ai@nocaptchaai.com">ai@nocaptchaai.com</a>


<a href="https://discord.gg/E7FfzhZqzA" target="_blank">
<img src="https://camo.githubusercontent.com/73982ce1ec8b82ac1c26e2ff755e44b20005fe131c0836810499dc61a3d4f43f/68747470733a2f2f646973636f72642e636f6d2f6173736574732f65633263333463616464346235663435393434313531323733383061383565362e69636f" width="15" height="15"> Discord</a> 
 <a href="https://t.me/hCaptchaSolverApi" target="_blank">
<img src="https://telegram.org/img/favicon.ico"  width="15" height="15"> Telegram </a>

<br>
  
  
### [Back to top](#hcaptcha-solver-api-beta)
