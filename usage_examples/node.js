import axios = require("axios");

var JSON_Data = {
  images: {
    0: "https://github.com/shimuldn/hCaptchaSolverApi/raw/main/demo_data/img/train/0.png",
    1: "https://github.com/shimuldn/hCaptchaSolverApi/raw/main/demo_data/img/train/0.png",
    2: "https://github.com/shimuldn/hCaptchaSolverApi/raw/main/demo_data/img/train/0.png",
    3: "https://github.com/shimuldn/hCaptchaSolverApi/raw/main/demo_data/img/train/0.png",
    4: "https://github.com/shimuldn/hCaptchaSolverApi/raw/main/demo_data/img/train/0.png",
    5: "https://github.com/shimuldn/hCaptchaSolverApi/raw/main/demo_data/img/train/0.png",
    6: "https://github.com/shimuldn/hCaptchaSolverApi/raw/main/demo_data/img/train/0.png",
    7: "https://github.com/shimuldn/hCaptchaSolverApi/raw/main/demo_data/img/train/0.png",
    8: "https://github.com/shimuldn/hCaptchaSolverApi/raw/main/demo_data/img/train/0.png",
  },
  target: "train",
  data_type: "url", //base64 coming in future
  site_key: "243242",
  site: "https://youre-sending-request-from.com",
};

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
