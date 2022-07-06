const axios = require('axios');
const base_url = 'https://solve.shimul.me'

const user_id='test'
const email='test@example.com'
const password = 'password'
const name = 'Jhon Doe'


const result = axios({
  method: 'post',
  url: base_url+'/account/signup',
  headers: {
  'Content-type': 'application/json'
  },
  data: data={"user_id": user_id, "email": email, "password": password, "name": name}
})
 .then((response) => {
    console.log(response.status);
    console.log(response.data)
})
.catch((error) => {
    console.log(error);
  });