import axios from 'axios';
import type { Frame, Page } from 'puppeteer';
import puppeteer from 'puppeteer';

const BASE_URL = 'https://shimuldn.github.io/hCaptchaSolverApi/demo_data/demo_sites/1/';
const API_URL = 'https://free.nocaptchaai.com/api/solve';
const API_KEY = ''; // <-- your API key here
const UID = ''; // <-- your UID here

const sleep = async (ms: number): Promise<void> =>
  await new Promise(resolve => setTimeout(resolve, ms));

const getBase64 = async (url: string): Promise<string> => {
  const { data } = await axios.get(url, { responseType: 'arraybuffer' });
  return Buffer.from(data, 'binary').toString('base64');
};

const getImages = async (frame: Frame): Promise<Record<number, string>> => {
  const data: { [key: number]: string } = {};

  await frame?.waitForFunction(() => {
    const wrapperLoaded = document.querySelector('.task-image .image');
    const imagesLoaded: boolean[] = [];
    document
      .querySelectorAll('.task-image .image')
      .forEach(img => imagesLoaded.push((img as HTMLElement).style.background.includes('url')));

    return wrapperLoaded && imagesLoaded.every(i => i);
  });

  const images = await frame?.$$('.task-image');
  if (!images) throw Error('no images found');

  for (const [index, img] of images.entries()) {
    const value = await img.$eval('.image', el =>
      getComputedStyle(el).getPropertyValue('background')
    );
    const url = /url\("(.*)"/.exec(value);
    if (!url) throw Error('no image url found');

    data[index] = await getBase64(url[1]);
  }

  return data;
};

const getTarget = async (frame: Frame): Promise<string> => {
  const targetElement = await frame?.$('.prompt-text');
  const target = await targetElement?.evaluate(el => el.textContent);
  if (!target) throw Error('no target found');

  return target;
};

const solve = async (page: Page): Promise<void> => {
  try {
    const hcaptchaFrame = page
      .frames()
      .find(f => f.url().includes('newassets.hcaptcha.com/captcha'));
    if (!hcaptchaFrame) throw Error('captcha not found');

    const images = await getImages(hcaptchaFrame);
    const target = await getTarget(hcaptchaFrame);

    const sitekey = await page.$eval('iframe[data-hcaptcha-response]', el => {
      const regex = /sitekey=([a-zA-Z0-9-]+)/;

      const src = el.getAttribute('src');
      if (!src) throw Error("can't find siteKey");

      const result = regex.exec(src);
      if (!result) throw Error("can't find siteKey");

      return result[1];
    });

    const imageElements = await hcaptchaFrame?.$$('.task-image');
    if (!imageElements) throw Error('no images found');

    const { data: query } = await axios.post(
      API_URL,
      { site: page.url(), sitekey, images, target, method: 'hcaptcha_base64' },
      { headers: { 'Content-type': 'application/json', 'apikey': API_KEY, 'uid': UID } }
    );

    if (query.status === 'new') {
      await sleep(1000);

      let solved = false;
      while (!solved) {
        const { data: result } = await axios.get(query.url);

        if (result.status === 'solved') {
          for (const item of result.solution) {
            await imageElements[item].click();
            await sleep(200);
          }

          solved = true;
        }
      }
    }

    const button = await hcaptchaFrame?.$('.button-submit');
    await button?.click();

    await sleep(1000);
  } catch (error) {
    console.error(error);
  }
};

const main = async (): Promise<void> => {
  console.time();

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(BASE_URL);

  await page.waitForNetworkIdle();

  const iframe = await page.waitForSelector('iframe[data-hcaptcha-response]');
  const frame = await iframe?.contentFrame();
  const checkbox = await frame?.waitForSelector('#checkbox');
  await checkbox?.click();

  while ((await frame?.$('#checkbox[aria-checked=false]')) !== null) await solve(page);

  await browser.close();

  console.timeEnd();
};

main();
