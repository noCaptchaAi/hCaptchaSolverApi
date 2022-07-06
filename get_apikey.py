# pip install requests
import requests, json
base_url = 'https://solve.shimul.me'

user_id='test'
email='test@example.com'
password = 'password'
name = 'Jhon Doe'

r = requests.get(url = base_url+'/account/signup', headers={'Content-Type': 'application/json'}, data = json.dumps({'user_id': user_id, 'email': email, 'password': password, 'name': name}))

print(json.dumps(r.json()))