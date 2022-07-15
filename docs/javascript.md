<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/512px-Unofficial_JavaScript_logo_2.svg.png?20141107110902" width="150">

## Learn more on`\usage_examples\puppeteer-example.js`

<hr>

- install npm requirements

```
yarn add axios
```

```
npm install axios
```

```
pnpm install axios
```

- to send request, edit authetication requiremnts with `uid` and `apikey`

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
node script.js
```
