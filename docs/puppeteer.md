<img src="https://user-images.githubusercontent.com/10379601/29446482-04f7036a-841f-11e7-9872-91d1fc2ea683.png" width="150">

## See more on [`\usage_examples\puppeteer.js`](https://raw.githubusercontent.com/shimuldn/hCaptchaSolverApi/main/usage_examples/puppeteer.js)

<br>

## Puppeteer example

<hr>

### install npm requirements

```
yarn add puppeteer axios
```

```
npm install puppeteer axios
```

```
pnpm install puppeteer axios
```

### to send request, edit authetication requiremnts with `uid`, `apikey` and `site_key`

```
var JSON_Data = {
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
    "data_type": "url", //base64 coming in future
    "site_key": "243242",
    "site": "https://youre-sending-request-from.com"
}

var res = await axios({
    method: 'post',
    url : 'https://solve.shimul.me/api/solve',
    headers: {
        'Content-type': 'application/json',
        'uid': uid,
        'apikey': apikey
    },
    data: JSON_Data
})
```

- run

```
node puppeteer.js
```
