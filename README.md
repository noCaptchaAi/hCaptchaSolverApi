# hCaptcha Solver api [WIP]

### Tired of "Are you human?" questions or hCaptchas?

hCaptcha solver api can automagically bypass hCaptcha challenges with http requests. Use with puppeteer, selenium, playwright browser automation scripts to bypass hCaptcha under the hood and more

`project in WIP - expect bugs.`


## API Use cases

---
* Use along with browser automation scripts
* Testing
* Writing cross browsers extensions
* Others



<!-- ## Benchmark

---

Execution time per captcha solve: 

1-3sec \

(depends on network and api conditions) -->


## API endpoints

---

`Base api = https://solve.shimul.me`



You will need the `UID` and `apikey` for sending request.

To get them, register with a `post` request with email and secure password to base api above once to get uid and apikey.
Or use the instruction below.

## Apikey Signup:

---

Node: 

* edit `get_apikey.js` with your user name, name, email and password

* `node get_apikey.js`



Python:

* edit `get_apikey.py` with your user name, name, email and password

* `python get_apikey.py`


Result:

```
200

{

  status: 'account created',

  uid: '62c5bcccecedad2671cf',

  time_stamp: 1657126092,

}
```

=> Check the email you provided. You should receive your api key like below.

```
apikey: 'cf117eac-74cc-118c-78ef-ecec2c883578'
```
= > Save your ```UID``` and ```APIKEY``` (APIKEY will be sent to your email)



<!-- TODO -->



## NodeJS example

---

<details>

  <summary>Send Data</summary>

  

  ## Heading

  1. A numbered

  2. list

     * With some

     * Sub bullets

</details>



<details>

  <summary>Receive Data</summary>

  

  ## Heading

  1. A numbered

  2. list

     * With some

     * Sub bullets

</details>



## Python example:

---

<details>

  <summary>Send Data</summary>

  

  ## Heading

  1. A numbered

  2. list

     * With some

     * Sub bullets

</details>



<details>

  <summary>Receive Data</summary>

  

  ## Heading

  1. A numbered

  2. list

     * With some

     * Sub bullets

</details>



<!-- TODO -->



---





Options:

  1: '/solve'

  2: '/solveww'



```

method='/solveww'

base_url = 'https://solve.shimul.me'

target='train'

data_type='url'

site='https://shimuldn.github.io/hcp/demo_data/demo_sites/1/index.html'



images_url={

    "0": "https://github.com/shimuldn/hcp/raw/main/demo_data/img/train/0.png",

    "1": "https://github.com/shimuldn/hcp/raw/main/demo_data/img/train/1.png",

    "2": "https://github.com/shimuldn/hcp/raw/main/demo_data/img/train/2.png",

    "3": "https://github.com/shimuldn/hcp/raw/main/demo_data/img/train/3.png",

    "4": "https://github.com/shimuldn/hcp/raw/main/demo_data/img/train/4.png",

    "5": "https://github.com/shimuldn/hcp/raw/main/demo_data/img/train/5.png",

    "6": "https://github.com/shimuldn/hcp/raw/main/demo_data/img/train/6.png",

    "7": "https://github.com/shimuldn/hcp/raw/main/demo_data/img/train/7.png",

    "8": "https://github.com/shimuldn/hcp/raw/main/demo_data/img/train/8.png"

}



req_url=base_url+method+'?target='+target+'&data_type='+data_type+'&site='+site

r = requests.get(req_url, headers={'Content-Type': 'application/json'}, data = json.dumps(images_url))

print(json.dumps(r.json()))

```



Response if successful:



For method='/solve'



```

  {"created": 1657112419, "dataType": "url", "id": "62c58763de50eff8803e", "status": "new", "target": "train"}

```



  For method='/solveww'

```

  {"created": 1657095043, "data_type": null, "id": "62c588724ca5be9bae55", "ptime": "1.47s", "solution": {"0": true, "1": true, "2": false, "3": true, "4": true, "5": false, "6": true, "7": false, "8": false}, "status": "processed", "success": true, "target": "train", "ttime": "2.38s", "updated": 1657112692}

```





## Puppeteer example

Install

```

npm install puppeteer axios

```

Put your uid and apikey on the file asked for and run

```

node puppeteer.js

```
