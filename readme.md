<div align="center">

![GitHub Repo stars](https://img.shields.io/github/stars/shimuldn/hCaptchaSolverApi?style=flat-square)
<img alt="Discord" src="https://img.shields.io/discord/994856206525018112">

<p>
  <a href="https://discord.gg/E7FfzhZqzA" target="_blank">
<img src="https://camo.githubusercontent.com/73982ce1ec8b82ac1c26e2ff755e44b20005fe131c0836810499dc61a3d4f43f/68747470733a2f2f646973636f72642e636f6d2f6173736574732f65633263333463616464346235663435393434313531323733383061383565362e69636f" width="15" height="15"> Discord</a> 
 <a href="https://t.me/hCaptchaSolverApi" target="_blank">
<img src="https://telegram.org/img/favicon.ico"  width="15" height="15"> Telegram </a>
</p>

**[Register for Free trial credits and API key](https://solve.shimul.me/register)** ~ 1000/mon   \
signed up for free? **please ⭐** and support us. \
we're in beta and our plans are **super cheap** yet solves **better** than market \
come to our [discord](https://discord.gg/E7FfzhZqzA) for **crazy deal 30000 solves / 10$**

# hCaptcha Solver Api (beta)  

<h3>noCaptcha AI recognises and solves hcaptcha challenges with our http Api. <br>
It's so fast that you will tell your mom about it, lot faster than 2captcha and others.
</h3> 
  
## 🎤 unbeatable selling features
⚡ Average solve within <= 0.5 to 10 secs + network & server ping factors \
🌀 Puppeteer, selenium, playwright and all platforms supporting http request \
🌐 Going to work with userscripts \
💡 Great with cli tools too \
📦️ browsers extensions (soon..)

![hCaptchaSolverApi_Demo_Selenium](https://user-images.githubusercontent.com/4178343/180646819-324163a8-0c4c-4571-b01c-2f98ab8a1127.gif)
<i>Selenium Demo Above</i>

</div>


<!-- ## AI Currently solving

| Name:-    | truck      | bridge | bedroom | domesticCat | aeroplane | seaplane | car | bus | lion | horse | motorbike | boat | bicycle | train | LivingRoom | lovingRoom | conferenceRoom |
| --------- | ---------- | ------ | ------- | ----------- | --------- | -------- | --- | --- | ---- | ----- | --------- | ---- | ------- | ----- | ---------- | ---------- | -------------- |
| Yes?      | ✔️         | ✔️     | ✔️      | ✔️          | ✔️        | ✔️       | ✔️  | ✔️  | ✔️   | ✔️    | ✔️        | ✔️   | ✔️      | ✔️    | ✔️         | ✔️         | ✔️             |
| Accuracy: | 98%        | 95%    | 95%     | 95%         | 95%       | 95%      | 95% | 95% | 95%  | 95%   | 95%       | 95%  | 95%     | 95%   | 95%        | 95%        | 95%            |
| Updated:  | 07/23/2022 | -->

<br/>

## Enough talk? where is my API?

1. **[Register for Free trial credits and API key](https://solve.shimul.me/register)** ~ 1000/mon
2. apikey uid sent to email

## How to use API? or How to solve captchas?

**special notes**: 
* we expect users to have some programming knowledge as this is just not plug and play. This is not a UI based sofware interface but data receiver and transmitter API for anyone to use in client side code, server side code, GUI desktop or web apps, cli tools. This api needs some data from user end to solve the captcha's. 
* some troubleshooting and patience is required. 
* please use our discord channel to connect and discuss 
* take some time to read docs here and in `/usage_examples` of this repo. most of them are updated.
* `doc` folders are not updated
********
0.0 not a step but this code runs in our mind if you ⭐ this repo <3

```
function youCool(){
  document.queryselector("#stargazers").addeventLister("click", 
   ()={
    console.log("you're amazing")
    }
  )
}
```

1. You need `uid`, `apikey` from email we sent

2. Use our solving http endpoint:
   ```
   https://solve.shimul.me/api/solve/
   ``` 
3. access target hcaptcha challenge images and convert them to valid image hash of `base64` ([how?](https://duckduckgo.com/?hps=1&q=converting+image+to+base64+stackoverflow&ia=web))

4. store the base64 hashes you converted in step 3 in variables on your platform/language youre using.
5. follow below code block for the `JSON` you need to send to our endpoint. max 18 image hashes are accepted.
   * `target` = the text you see on hcaptcha popup descriving the challege
   * `method` = our internal param so keep as it is
   * `site` = your target domain
   * `sitekey` = find the sitekey on your target html page: ``` <div class="h-captcha" data-sitekey="your_site_key"></div>```
   * note: sitekey and site info collected to improve accuracy. we respect privacy.
   
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

5. test your code with Insomnia, postman or a REST API client, look out for response from our api.

6. api response our server sends are self explainatory, but if youre stuck google

7. send request, if solved you see something like this. where the numbers represent the `images` index as you sent in order.

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

10. your mom must be proud of you now. so are we :D 

If youre really stuck even though it's kinda simple and you've left no google search alone, our discord community is helpful bunch of peoples. 
if needed admins also help.

<h3>If you have any suggestions, ideas, issues, questions related to our paid plans, dedicated api endpoint,company usage please connect via out discord, telegram or email ai[at]shimul.me</h3>
<h3>we offer dedicated endpoint and without limit(still hardware/network limit applies) enterprise, company usage plans as per custom requirements. Need massive amount of solves email to <p><a href="mailto:ai@shimul.me">ai@noCapthca</a></p> </h3>

