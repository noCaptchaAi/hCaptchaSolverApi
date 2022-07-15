<a href="https://discord.gg/E7FfzhZqzA" target="_blank">
<img src="https://discord.com/assets/ec2c34cadd4b5f4594415127380a85e6.ico" width="50" height="50">
</a>
<a href="https://t.me/hCaptchaSolverApi" target="_blank">
<img src="https://telegram.org/img/favicon.ico"  width="50" height="50">
</a>

# hCaptcha Solver api [WIP]

Tired of  **Are you human?** Questions?

**hCaptchaSolverApi** can automagically bypass hCaptcha challenges with HTTP requests. Use with puppeteer, selenium, playwright browser automation scripts to bypass hCaptcha under the hood and more.


<br>
NOTE: API rewriting in progress, fixes are rolling in the next few days.

- Expect bugs
- Rewrite ETA: 20 JULY 2022

## USAGE

hCaptchaSolverApi is a HTTP api, so usage is boundless, you can implement using almost every lang having HTTP feature and so on.

- browser automation, User scripts
- injection scrips
- cli tools
- use our API to make your own browsers extensions
- anything else you can imagine

## Get Started Docs Browser
    <a id="Javascript"></a>
    ## Getting Started


<br>

## Time to Solve?

A task is solved under 2-10 sec, (depends on network & server load)


## How this API work. 
<br>

    1. Get the captcha url programmatically (currently 9 images are solvable).
    2. Send a post request to https://solve.shimul.me/api/solve with your
        UID and APIKEY in Headers and images link with other parameter in body.
    3. Server will give you a replay with ID and url to check the status if request successful
        else you will get error message.
    4. Wait for 5 secends and send a GET request to https://solve.shimul.me/api/status?id=   < Put order id here.
        until you get a success or error json result.
    5. You will get a replay with "in queue" if not solved yet or solution.
    
    >> Check this json file https://github.com/rustsoft/Api-editing/blob/main/usage_examples/send-request-body.json
    Please make sure your request body formatting same as this.
    
    >> When order successfully received received response will be
        https://github.com/rustsoft/Api-editing/blob/main/usage_examples/response-if-order-successfull.json
        
    >> When order successfully processed response will be
        https://github.com/rustsoft/Api-editing/blob/main/usage_examples/successfully-solved.json
    
    Parameter uid, apikey, target, data_type site_key site are mandatory.
   
    
<br>
<img width="428" alt="image" src="https://user-images.githubusercontent.com/12117121/179324224-817a2ca4-5dd2-49de-95d5-4d00e2152acd.png">
<img width="258" alt="image" src="https://user-images.githubusercontent.com/12117121/179324245-faf5ad7c-8554-4433-9057-201c72594997.png">

<br>

## API access & Endpoint


`Base api = https://solve.shimul.me/api`

Note: Only accepts authenticated requests with `uid` and `apikey`

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
