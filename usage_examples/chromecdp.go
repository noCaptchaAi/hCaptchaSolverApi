package main

import (
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"math/rand"
	"net/http"
	"strings"
	"time"

	"github.com/chromedp/chromedp"
	"github.com/chromedp/chromedp/runner"
	"github.com/skratchdot/open-golang/open"
)

const (
	url  = "https://accounts.hcaptcha.com/demo?sitekey=4c672d35-0701-42b2-88c3-78380b0db560"
	uid  = "<UID>"
	key  = "<KEY>"
	host = "https://free.nocaptchaai.com"
)

func main() {
	var err error
	var res string

	// create context
	ctxt, cancel := chromedp.NewContext(
		context.Background(),
		chromedp.WithLogf(log.Printf),
	)
	defer cancel()

	// create cdp instance
	c, err := chromedp.New(ctxt, chromedp.WithRunnerOptions(
		runner.Flag("headless", false),
		runner.Flag("disable-extensions", true),
		//runner.Flag("no-sandbox", true),
		runner.Flag("disable-setuid-sandbox", true),
		runner.Flag("disable-gpu", true),
		runner.Flag("disable-dev-shm-usage", true),
	))
	if err != nil {
		log.Fatal(err)
	}

	// run task list
	err = c.Run(ctxt, navigate(url))
	if err != nil {
		log.Fatal(err)
	}

	err = c.Run(ctxt, chromedp.Tasks{
		chromedp.ActionFunc(func(ctx context.Context) error {
			// fetch sitekey
			sitekey, err := sitekey()
			if err != nil {
				return err
			}
			fmt.Println("site key:", sitekey)

			// fetch box frame
			boxFrame, boxBB, err := boxFrame()
			if err != nil {
				return err
			}

			// mouse move to box frame
			err = moveMouse(boxFrame, boxBB)
			if err != nil {
				return err
			}

			// click on box frame
			err = click(boxFrame)
			if err != nil {
				return err
			}

			// fetch captcha frame
			captchaFrame, err := captchaFrame()
			if err != nil {
				return err
			}

			// fetch target
			target, err := target(captchaFrame)
			if err != nil {
				return err
			}
			fmt.Println("target:", target)

			// fetch images
			images, err := images(captchaFrame)
			if err != nil {
				return err
			}

			// solve captcha
			res, err = solve(images, target, sitekey, url)
			if err != nil {
				return err
			}
			fmt.Println("solution:", res)

			// click on captcha frame
			err = click(captchaFrame)
			if err != nil {
				return err
			}

			// wait captcha is solved
			err = solved()
			if err != nil {
				return err
			}

			return nil
		}),
	})
	if err != nil {
		log.Fatal(err)
	}

	// shutdown chrome
	err = c.Shutdown(ctxt)
	if err != nil {
		log.Fatal(err)
	}

	// wait for chrome to finish
	err = c.Wait()
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("DONE:", res)
}

func navigate(urlstr string) chromedp.Tasks {
	return chromedp.Tasks{
		chromedp.Navigate(urlstr),
		chromedp.Sleep(3 * time.Second),
	}
}

func solve(images map[int]string, target, sitekey, url string) (string, error) {
	var res string
	const url_ = host + "/api/solve"

	// solve captcha
	res, err := http.Post(url_, "application/json", strings.NewReader(string(fmt.Sprintf(
		"{\"target\": %q, \"images\": %v, \"method\": \"hcaptcha_base64\", \"sitekey\": \"%s\", \"site\": \"%s\"}",
		target, images, sitekey, url,
	))))
	if err != nil {
		return "", err
	}

	var v interface{}
	err = json.NewDecoder(res.Body).Decode(&v)
	if err != nil {
		return "", err
	}

	fmt.Println(v)

	if url, ok := v.(map[string]interface{})["url"]; ok {
		var count = 0
		for {
			fmt.Println(url)
			res, err = http.Get(url.(string))
			if err != nil {
				return "", err
			}

			err = json.NewDecoder(res.Body).Decode(&v)
			if err != nil {
				return "", err
			}

			if _, ok := v.(map[string]interface{})["status"]; ok {
				return v.(map[string]interface{})["status"].(string), nil
			}

			if solution, ok := v.(map[string]interface{})["solution"]; ok {
				return solution.([]interface{})[0].(string), nil
			}

			count++
			if count >= 5 {
				return "", fmt.Errorf("failed to solve the captcha")
			}

			time.Sleep(5 * time.Second)
		}
	} else {
		return v.(map[string]interface{})["status"].(string), nil
	}
}

func images(ctx context.Context) (map[int]string, error) {
	var res string
	images := map[int]string{}
	urls := []string{}

	// fetch urls
	err := chromedp.Evaluate(`document.querySelectorAll('.challenge-container .task-grid .item-img')`, &urls).Do(ctx)
	if err != nil {
		return nil, err
	}

	// download images
	for i, url := range urls {
		data, err := http.Get(url)
		if err != nil {
			return nil, err
		}

		body, err := ioutil.ReadAll(data.Body)
		if err != nil {
			return nil, err
		}

		res = base64.StdEncoding.EncodeToString(body)
		images[i] = res
	}

	return images, nil
}

func target(ctx context.Context) (string, error) {
	var target string

	// fetch target
	err := chromedp.Evaluate(`document.querySelector('.challenge-container .challenge-text').innerHTML.replace(/Please click each image containing an? /, "")`, &target).Do(ctx)
	if err != nil {
		return "", err
	}

	return target, nil
}

func captchaFrame() (context.Context, error) {
	var captchaFrame *cdp.Frame

	// fetch captcha frame
	err := chromedp.Run(ctx, chromedp.Tasks{
		chromedp.WaitVisible(`[title="Main content of the hCaptcha challenge"]`),
		chromedp.Frame(`[title="Main content of the hCaptcha challenge"]`, &captchaFrame),
	})
	if err != nil {
		return nil, err
	}

	return captchaFrame.Context(), nil
}

func boxFrame() (context.Context, [][]float64, error) {
	var boxFrame *cdp.Frame
	var bb [][]float64

	// fetch box frame
	err := chromedp.Run(ctx, chromedp.Tasks{
		chromedp.WaitVisible(`[title="widget containing checkbox for hCaptcha security challenge"]`),
		chromedp.Frame(`[title="widget containing checkbox for hCaptcha security challenge"]`, &boxFrame),
		chromedp.WaitVisible(`#anchor-wr`),
		chromedp.Evaluate(`([document.querySelector("#anchor-wr").getBoundingClientRect().x, document.querySelector("#anchor-wr").getBoundingClientRect().y, document.querySelector("#anchor-wr").getBoundingClientRect().width, document.querySelector("#anchor-wr").getBoundingClientRect().height])`, &bb),
	})
	if err != nil {
		return nil, nil, err
	}

	return boxFrame.Context(), bb, nil
}

func sitekey() (string, error) {
	var sitekey string

	// fetch sitekey
	err := chromedp.Run(ctx, chromedp.Tasks{
		chromedp.WaitVisible(`[title="widget containing checkbox for hCaptcha security challenge"]`),
		chromedp.Evaluate(`document.querySelector("[title='widget containing checkbox for hCaptcha security challenge']").getAttribute("src").split("&sitekey=")[1].split("&")[0]`, &sitekey),
	})
	if err != nil {
		return "", err
	}

	return sitekey, nil
}

func click(ctx context.Context) error {
	return chromedp.Click(`.button-submit`, chromedp.NodeVisible).Do(ctx)
}

func solved() error {
	var res string
	var count = 0

	for {
		// fetch g-recaptcha-response
		err := chromedp.Evaluate(`document.querySelector("[id^='g-recaptcha-response-']").value`, &res).Do(ctx)
		if err != nil {
			return err
		}

		if res != "" {
			break
		}

		count++
		if count >= 5 {
			return fmt.Errorf("failed to solve the captcha")
		}

		time.Sleep(1 * time.Second)
	}

	return nil
}

func moveMouse(ctx context.Context, bb [][]float64) error {
	var bbx, bby, bbw, bbh float64

	// fetch box frame bounding box
	bbx, bby, bbw, bbh = bb[0][0], bb[0][1], bb[0][2], bb[0][3]

	// move mouse to box frame
	err := chromedp.ActionFunc(func(ctx context.Context) error {
		for _, pos := range path(0, 0, bbx, bby, bbw, bbh) {
			err = chromedp.MouseMove(pos[0], pos[1]).Do(ctx)
			if err != nil {
				return err
			}

			time.Sleep(time.Duration(rand.Float64()*25) * time.Millisecond)
		}

		return nil
	}).Do(ctx)
	if err != nil {
		return err
	}

	return nil
}

func path(x0, y0, x1, y1, w, h float64) [][]float64 {
	var res [][]float64

	for t := 0.0; t <= 1.0; t += 0.01 {
		var x, y float64
		x = x0 + (x1-x0)*t
		y = y0 + (y1-y0)*t + (h/w)*(x1-x0)*(math.Cos(math.Pi*t)-1)
		res = append(res, []float64{x, y})
	}

	return res
}
