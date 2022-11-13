require 'json'
require 'net/http'

uid = ''
apikey = ''

base64_json = {
  images: {
   "0" => "base64 hash from image",
   "1" => "base64 hash from image",
   "2" => "base64 hash from image",
   "3" => "base64 hash from image",
   "4" => "base64 hash from image",
   "5" => "base64 hash from image",
   "6" => "base64 hash from image",
   "7" => "base64 hash from image",
   "8" => "base64 hash from image",
   "9" => "base64 hash from image",
   "10" => "base64 hash from image",
   "11" => "base64 hash from image",
   "12" => "base64 hash from image",
   "13" => "base64 hash from image",
   "14" => "base64 hash from image",
   "15" => "base64 hash from image",
   "16" => "base64 hash from image",
   "17" => "base64 hash from image",
   "18" => "base64 hash from image",
  },
  target: "Please click each image containing an airplane",
  method: "hcaptcha_base64",
  sitekey: "sitekey",
  site: "site"
}

uri = URI('https://free.nocaptchaai.com/api/solve')

req = Net::HTTP::Post.new(uri, initheader = {'Content-Type' =>'application/json', 'uid' => uid, 'apikey' => apikey })

req.body = base64_json.to_json

res = Net::HTTP.start(uri.hostname, uri.port) do |http|
  http.request(req)
end
