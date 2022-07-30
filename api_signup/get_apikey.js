const axios = require('axios');
const base_url = 'https://solve.shimul.me/api/'


// Fill details bellow before making request
// Remember no temp-mail. Temp-mail = ban permanently.
const user_id=''
const email=''
const password = ''
const name = ''


const result = axios({
  method: 'post',
  url: base_url+'account/signup',
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
