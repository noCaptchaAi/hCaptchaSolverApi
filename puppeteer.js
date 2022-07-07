// Install npm install puppeteer axios
// put your uid and apikey bellow
// run node puppeteer.js

const uid="62c6bf7eb1e76d24e366" // put your uid inside ""
const apikey="62d0243f-7107-67ee-f312-09d8f5af84f3" // put your apikey inside ""

var args_command = process.argv.slice(3);
const puppeteer = require('puppeteer');
// const base_url = 'https://solve.shimul.me';
const base_url = 'https://shimuldn-hcaptcha-backend-5v5p44w4fv5qj-5050.githubpreview.dev';


(async () => {
  const browser = await puppeteer.launch({
      headless: false,
      //executablePath: '/usr/bin/google-chrome',
      ignoreHTTPSErrors: true,
      userDataDir: `data`,
      slowMo: 0,
      args: [
      "--disable-gpu", "--disable-dev-shm-usage", "--no-sandbox",
      '--window-size=1000,900', 
      '--start-maximized', '--disable-web-security', '--allow-running-insecure-content',
      '--disable-strict-mixed-content-checking', '--ignore-certificate-errors',"--disable-features=IsolateOrigins,site-per-process", '--blink-settings=imagesEnabled=true'
      ]})

//   console.log("Opening newPage")
    const page = await browser.newPage();
    await page.goto('https://shimuldn.github.io/hCaptchaSolverApi/demo_data/demo_sites/1/')

    await page.waitForTimeout(3000)
    const elementHandle = await page.waitForSelector(`div[class="h-captcha"] iframe`);
    const f = await elementHandle.contentFrame();
    // const tt = await f.$eval('div#checkbox', divs => divs.getAttribute("aria-checked"));
    await f.click("#checkbox")
    await page.waitForTimeout(3000)

    // console.log(await getTarget(), await getImages())
    var target = await getTarget()
    var images=await getImages()
    method='/solveww'
    data_type='image'
    var site = await page.evaluate(() => document.location.href)
    
    console.log(images)
    await solve(images, target)


    async function solve(images, target){
        try{
          const fm = page.frames().find(f => f.url().startsWith('https://newassets.hcaptcha.com/captcha'));
          const axios = require('axios');
          const ele = await fm.$$(".task-image");
          var target = await getTarget()
          var res = await axios({
            method: 'get',
            url : encodeURI(base_url+'/solveww?target=' + target + '&data_type='+data_type+'&site='+site),
            headers: {
              'Content-type': 'application/json',
              'uid': uid,
              'apikey': apikey
            },
            data: images
          })
          .then((response) => {
            console.log(response.status, JSON.stringify(response.data))
            // console.log(response.data[0]);
            return response.data
          })
          .catch((error) => {
            console.log(error);
          });
    
          for (num in res["solution"]) {
              if (res["solution"][num] == true) {
                console.log(num)
                await ele[num].click('.image')
                await page.waitForTimeout(200)
              }
            }
    
          btn=await fm.evaluate(() => document.querySelector(".button-submit").textContent)
          if (btn == "Verify") {
            await page.waitForTimeout(200) 
            await fm.evaluate(() => document.querySelector(".button-submit").click());
            target = undefined
          } else if (btn == "Next") {
            await page.waitForTimeout(200)
            await fm.evaluate(() => document.querySelector(".button-submit").click());
            // console.log("Next btn clicked.")
          } else {
            // console.log("btn name is not Verify.")
            await fm.evaluate(() => document.querySelector(".button-submit").click());
            // await page.waitForTimeout(1000) 
          }
        }catch(e){console.log(e)}
      }
    

    async function getImages(){
        try{
          const fm = page.frames().find(f => f.url().startsWith('https://newassets.hcaptcha.com/captcha'));
          const img = await fm.evaluate(() => document.querySelectorAll(".task-image .image")[0].getAttribute("style"));
          function z(e) {
              e = e.match(/(?<=\(\").+?(?=\"\))/g);
              return e ? e[0] : 0;
            }
          var data = {}
          var target = await getTarget()
          const ele = await fm.$$(".task-image");
          for (let i = 0; i < ele.length; i++) {
              const urlData = await ele[i].$eval('.image', i => i.style.background);
              var link = z(urlData)
              data[i] = link
          }
          return data
        }catch(e){console.log(e)}
          
      }

    async function getTarget(){
          var target
          for (var t=0; t<5; t++) {
            try{
              var fm = page.frames().find(f => f.url().startsWith('https://newassets.hcaptcha.com/captcha'));
              const e = await fm.evaluate(() => document.querySelector(".prompt-text").textContent);
              if (e != undefined) {
                if (e.includes("Please click each image containing an ")) {
                  target = e.replace("Please click each image containing an ", "")
                } else if (e.includes("Please click each image containing a ")) {
                  // console.log("Not undefined")
                  target = e.replace("Please click each image containing a ", "")
                } else {
                  console.log("Unknown target", e)
                } 
              }
              return target
              break
            } catch(e){
            }
            await page.waitForTimeout(500)
          }
      }


})();