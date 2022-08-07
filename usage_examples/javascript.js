//  in order to use axios you have to load tit from CDN eg. unpkg or jsdeliver
// you can also use fetch api
var JSON_Data = {
  images: {
    0: "https://i.imgur.com/YNtQAlR.jpeg",
    1: "https://i.imgur.com/3T7eASH.jpeg",
    2: "https://i.imgur.com/s4pxelS.jpeg",
    3: "https://i.imgur.com/1IgTz4Y.jpeg",
    4: "https://i.imgur.com/rgh5xFV.jpeg",
    5: "https://i.imgur.com/uZcftQe.jpeg",
    6: "https://i.imgur.com/MqmsMwz.jpeg",
    7: "https://i.imgur.com/7lwxxXy.jpeg",
    8: "https://i.imgur.com/uIX5UVP.jpeg",
  },
  target: "train",
  data_type: "url", //base64 coming in future
  site_key: "243242",
  site: "https://youre-sending-request-from.com",
};

//  axios
var res = await axios({
  method: "post",
  url: "https://solve.shimul.me/api/solve",
  headers: {
    "Content-type": "application/json",
    uid: uid,
    apikey: apikey,
  },
  data: JSON_Data,
});

// fetch api
async function solve(images, target) {
  const request = await fetch("https://solve.shimul.me/solve", {
    method: "post",
    headers: {
      "Content-type": "application/json",
      uid: uid,
      apikey: apikey,
    },
    body: JSON.stringify(JSON_Data),
  }).then((response) => {
    return response.json();
  }).then((data) => {
    console.log(data);
  });
}
