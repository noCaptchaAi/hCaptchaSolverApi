package main

import (
  "encoding/json"
  "fmt"
  "io/ioutil"
  "log"
  "net/http"
  "bytes"
  "io"
)

type Base64Json struct {
  Images map[string]interface{}
  Target string
  Method string
  Sitekey string
  Site string
}

func main() {
  uid := ""
  apikey := ""
  base64_json := Base64Json{
    Images: map[string]interface{}{
      "0": "base64 hash from image",
      "1": "base64 hash from image",
      "2": "base64 hash from image",
      "3": "base64 hash from image",
      "4": "base64 hash from image",
      "5": "base64 hash from image",
      "6": "base64 hash from image",
      "7": "base64 hash from image",
      "8": "base64 hash from image",
      "9": "base64 hash from image",
      "10": "base64 hash from image",
      "11": "base64 hash from image",
      "12": "base64 hash from image",
      "13": "base64 hash from image",
      "14": "base64 hash from image",
      "15": "base64 hash from image",
      "16": "base64 hash from image",
      "17": "base64 hash from image",
      "18": "base64 hash from image",
    },
    Target: "Please click each image containing an airplane",
    Method: "hcaptcha_base64",
    Sitekey: "sitekey",
    Site: "site"
  }
  js, err := json.Marshal(base64_json)
  req, err := http.NewRequest("POST", "https://free.nocaptchaai.com/api/solve", bytes.NewBuffer(js))
  req.Header.Set("Content-Type", "application/json")
  req.Header.Set("uid", uid)
  req.Header.Set("apikey", apikey)

  client := &http.Client{}
  resp, err := client.Do(req)
  if err != nil {
    panic(err)
  }
  defer resp.Body.Close()

  fmt.Println("response Status:", resp.Status)
  fmt.Println("response Headers:", resp.Header)
  body, _ := ioutil.ReadAll(resp.Body)
  fmt.Println("response Body:", string(body))
}
