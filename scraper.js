require('dotenv').config();

const axios = require('axios');
const fs = require('fs')


const id = process.env.CLIENT_ID
const secret = process.env.SECRET
const uname = process.env.USERNAME
const pwrd = process.env.PASSWORD


const params = new URLSearchParams();
params.append('grant_type', 'password');
params.append('username', uname);
params.append('password', pwrd);
axios.post('https://www.reddit.com/api/v1/access_token', params, {
    auth: {
        username: id,
        password: secret
    }
}).then(function (response) {
    console.log(response.data.access_token)
    axios.get('https://oauth.reddit.com/r/india/new.json', {
        headers: {
            "Authorization": `Bearer ${response.data.access_token}`,
            'User-Agent':'web:subtrackr:v0.1 (by /u/Anxious-Marketing259'
        }
    }).then(function (response){
        console.log(response.data.data.children)
    });
});