# pip install requests
# python3 get_apikey.py
import requests, json
base_url = 'https://solve.shimul.me/api/'



# Fill details bellow before making request. Password are encrypted before saving it to database
# Remember no temp-mail. Temp-mail = ban permanently.
user_id=''
email=''
password = ''
name = ''


signup_data={}
signup_data['user_id']=user_id
signup_data['email']=email
signup_data['name']=name
signup_data['password']=password

r = requests.post(url = base_url+'account/signup', headers={'Content-Type': 'application/json'}, data = json.dumps(signup_data))


# print(r)
print(json.dumps(r.json()))
