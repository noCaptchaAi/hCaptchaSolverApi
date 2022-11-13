use LWP::UserAgent;
use JSON;

my $ua = LWP::UserAgent->new;

my $uid = ''
my $apikey = ''
my $base64_json = {
  images => {
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
  target => "Please click each image containing an airplane",
  method => "hcaptcha_base64",
  sitekey => "sitekey",
  site => "site"
};

my $response = $ua->post('https://free.nocaptchaai.com/api/solve',
  'Content-Type' => 'application/json',
  'uid' => $uid,
  'apikey' => $apikey,
  'Content' => to_json($base64_json)
);
