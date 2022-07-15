<a href="https://discord.gg/E7FfzhZqzA" target="_blank">
<img src="https://discord.com/assets/ec2c34cadd4b5f4594415127380a85e6.ico" width="50" height="50">
</a>
<a href="https://t.me/hCaptchaSolverApi" target="_blank">
<img src="https://telegram.org/img/favicon.ico"  width="50" height="50">
</a>

# hCaptcha Solver api [WIP]

## NOTE: API rewriting in progress, fixes are rolling in the next few days.

- Expect bugs
- Rewrite ETA: 20 JULY 2022

<br>

## Tired of "Are you human?" questions?

## hCaptchaSolverApi can automagically bypass hCaptcha challenges with http requests. Use with puppeteer, selenium, playwright browser automation scripts to bypass hCaptcha under the hood and more

<br>

## USAGE
<br>

hCaptchaSolverApi is a HTTP api so usage is boundless, you can impliment with almost every lang with HTTP api.

- Use with browser automation scripts
- Userscripts
- injection scrips to solve problems without extention
- use with any browser extentions that utilises HTTP requests
- Writing cross browsers extensions
- Others

<br>

## Time to Solve?

<br>

A task is solved under 2-10 sec, (depends on network & server load)

<br>

## API access & Endpoint


`Base api = https://solve.shimul.me/api`

Note: Only accepts authenticaed requests with `uid` and `apikey`

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

## How to Get uid and API Key

<br>

- clone project
- fill with valid info `/api_signup/"pick a file".ext`
- run
- check email for api key
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

<br>

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
