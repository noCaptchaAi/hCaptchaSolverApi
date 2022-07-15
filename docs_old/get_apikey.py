# pip install requests
import requests, json
base_url = 'https://solve.shimul.me'


# Fill details bellow before making request
user_id=''
email=''
password = ''
name = ''

r = requests.get(url = base_url+'/account/signup', headers={'Content-Type': 'application/json'}, data = json.dumps({'user_id': user_id, 'email': email, 'password': password, 'name': name}))

print(json.dumps(r.json()))