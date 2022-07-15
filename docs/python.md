<!-- TODO -->

<img src="https://www.python.org/static/community_logos/python-logo-generic.svg" height="50">

## 🐍 Python example:

---

<summary>Sending Data</summary>

      ```

      method='/solve'

      base_url = 'https://solve.shimul.me/api'

      target='train'

      data_type='url'

      site='https://shimuldn.github.io/hcp/demo_data/demo_sites/1/index.html'



      images_url={

          "0": "https://github.com/shimuldn/hCaptchaSolverApi/raw/main/demo_data/img/train/0.png",

          "1": "https://github.com/shimuldn/hCaptchaSolverApi/raw/main/demo_data/img/train/1.png",

          "2": "https://github.com/shimuldn/hCaptchaSolverApi/raw/main/demo_data/img/train/2.png",

          "3": "https://github.com/shimuldn/hCaptchaSolverApi/raw/main/demo_data/img/train/3.png",

          "4": "https://github.com/shimuldn/hCaptchaSolverApi/raw/main/demo_data/img/train/4.png",

          "5": "https://github.com/shimuldn/hCaptchaSolverApi/raw/main/demo_data/img/train/5.png",

          "6": "https://github.com/shimuldn/hCaptchaSolverApi/raw/main/demo_data/img/train/6.png",

          "7": "https://github.com/shimuldn/hCaptchaSolverApi/raw/main/demo_data/img/train/7.png",

          "8": "https://github.com/shimuldn/hCaptchaSolverApi/raw/main/demo_data/img/train/8.png"

      }



      req_url=base_url+method+'?target='+target+'&data_type='+data_type+'&site='+site

      r = requests.get(req_url, headers={'Content-Type': 'application/json'}, data = json.dumps(images_url))

      print(json.dumps(r.json()))

      ```

<summary>Receiving Data</summary>

## Heading

<!-- TODO -->
