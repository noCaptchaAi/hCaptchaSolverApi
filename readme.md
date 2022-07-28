<p>
<img src="https://c.tenor.com/_W2FjRBFfkcAAAAC/cat-please.gif" height="99">
</a>  ⭐ and spread the word. <br>
Join our Telegram <a href="https://t.me/hCaptchaSolverApi" target="_blank">
<img src="https://telegram.org/img/favicon.ico"  width="25" height="25">
</a> and discord </a>
  <a href="https://discord.gg/E7FfzhZqzA" target="_blank">
<img src="https://camo.githubusercontent.com/73982ce1ec8b82ac1c26e2ff755e44b20005fe131c0836810499dc61a3d4f43f/68747470733a2f2f646973636f72642e636f6d2f6173736574732f65633263333463616464346235663435393434313531323733383061383565362e69636f" width="25" height="25">
</a> for quick updates..
</p>
<hr>
 
<img src="https://user-images.githubusercontent.com/4178343/180614799-2da31008-4cc4-4042-ad15-0dc64967c924.PNG" alt="hCaptchaSolverApi" title="hCaptchaSolverApi" height="50"/> 

# hCaptcha Solver Api (beta) 

Solve hcaptcha with HTTP API <br>
Works with `puppeteer`, `Selenium`, `Playwright` etc out of box. <br>
Automate workflow and throw captcha solving to our ai, Let's GO!!!

<span>⬇️ Selenium Demo</span>
![hCaptchaSolverApi_Demo_Selenium](https://user-images.githubusercontent.com/4178343/180646819-324163a8-0c4c-4571-b01c-2f98ab8a1127.gif)


## Features:
* ⚡ Average solve within 2-6 sec + network & server load factors
* 🌀 Use with JS, Python, Puppeteer, selenium, playwright, Automa
* 🔧 write for browser automation
* 🌐 use with userscripts
* 💡 use with cli tools
* 📦️ browsers extensions (comin soon..)



## AI Currently solving

| Name:-    | truck      | bridge | bedroom | domesticCat | aeroplane | seaplane | car | bus | lion | horse | motorbike | boat | bicycle | train | LivingRoom | lovingRoom | conferenceRoom |
| --------- | ---------- | ------ | ------- | ----------- | --------- | -------- | --- | --- | ---- | ----- | --------- | ---- | ------- | ----- | ---------- | ---------- | -------------- |
| Yes?      | ✔️         | ✔️     | ✔️      | ✔️          | ✔️        | ✔️       | ✔️  | ✔️  | ✔️   | ✔️    | ✔️        | ✔️   | ✔️      | ✔️    | ✔️         | ✔️         | ✔️             |
| Accuracy: | 98%        | 95%    | 95%     | 95%         | 95%       | 95%      | 95% | 95% | 95%  | 95%   | 95%       | 95%  | 95%     | 95%   | 95%        | 95%        | 95%            |
| Updated:  | 07/23/2022 |


## 🌱 ROADMAP
* 🔥 Free Browser 🔌 Extention.. (WIP)
* ⭐ = We work more harder. spread the word :p
* 🌐 New Promo website
* 🔧 API Documentation site 
* 🌌 Free even after beta. [1000 hCaptcha solves per month]
* 🎁 Introducing paid plans to cover CPU, bandwidth costs, devlopment and maintanance
* 🙌 Transparency = We will share where donations are used for open source.

***



## How to USE API? 

Base api ``` = https://solve.shimul.me/api/solve/``` 

Get ApiKey [here](#-get-apikey)
(website coming soon..)
*** Only one account per person.
*** No temp email signup will be accepted from now on.

* Get the captcha url programmatically (currently 9 images are solvable).
* Send a post request to ```https://solve.shimul.me/api/solve/``` with your
        ```UID``` and ```APIKEY``` in Headers and images link with other parameter in ```body```.
* Server will give you a replay with ID and url to check the status if request successful
        else you will get error message.
* Wait for 5 secends to get a status of task, send GET request to ```https://solve.shimul.me/api/status?id="<Put ID here>"```. You get a success or error json response.
    
[Send DEMO JSON:](https://github.com/rustsoft/Api-editing/blob/main/usage_examples/send-request-body.json)
    
[Successfully received JSON:](        https://github.com/rustsoft/Api-editing/blob/main/usage_examples/response-if-order-successfull.json)

        
[ Successfully Solved response](https://github.com/rustsoft/Api-editing/blob/main/usage_examples/successfully-solved.json)
        
    
⚠️ Parameter uid, apikey, target, data_type site_key site are mandatory.
   
    
<br>
<img width="428" alt="image" src="https://user-images.githubusercontent.com/12117121/179324224-817a2ca4-5dd2-49de-95d5-4d00e2152acd.png">
<img width="258" alt="image" src="https://user-images.githubusercontent.com/12117121/179324245-faf5ad7c-8554-4433-9057-201c72594997.png">

<br>
Demo Request Data:

```

{
  "images": {
    "0": "https://i.imgur.com/YNtQAlR.jpeg",
    "1": "https://i.imgur.com/3T7eASH.jpeg",
    "2": "https://i.imgur.com/s4pxelS.jpeg",
    "3": "https://i.imgur.com/1IgTz4Y.jpeg",
    "4": "https://i.imgur.com/rgh5xFV.jpeg",
    "5": "https://i.imgur.com/uZcftQe.jpeg",
    "6": "https://i.imgur.com/MqmsMwz.jpeg",
    "7": "https://i.imgur.com/7lwxxXy.jpeg",
    "8": "https://i.imgur.com/uIX5UVP.jpeg"
  },
  "target": "train",
  "data_type": "url",
  "site_key": "243242-xxxx-xxxx-xxx", // get this from dom `data-site_key`, found on .h-captcha class
  "site": "https://url-sent-request-from.com"
}

```

## 🚚 GET APIKey

<br>

- clone project
- fill with valid info `/api_signup/"pick a file".ext`
- run
- check email for API key
- done, use with your scripts

---

```
git clone https://github.com/shimuldn/hCaptchaSolverApi
```

NodeJS:

```
node get_apikey.js
```

Python:

```
python get_apikey.py
```

## Sample Output:

```
    200

    {

      status: 'account created',

      uid: '62c5bcccecedad26xxx',

      time_stamp: 1657126092,

    }
```

### APi Key sent to email

```
To you
...
..

apikey: 'cf1xxxac-74cc-11xc-78ef-exxxc883xx8'

..
...
hCaptchaSolverApi
```

## After successful request:

### For method='api/solve'

- Task created

```

{
    "createdAt": 1657889534,
    "id": "h-bsW1gZsc_tCMxQSf",
    "status": "new",
    "target": "boat"
}

```

- Task created

```
{"status": "error", "message": "unknown error happen"}
```

### For method='api/status'

- when in queue

```
{
    "status": "in queue"
}

```

- when solved

```
{
    "solution": {
        "0": "False",
        "1": "False",
        "2": "True",
        "3": "False",
        "4": "False",
        "5": "False",
        "6": "False",
        "7": "False",
        "8": "False"
    },
    "status": "solved"
}
```

- when error

```
{
    "status": "error",
    "message": "some error happend"
}
```
