require('dotenv').config();
const prompt = require("prompt-sync")({ sigint: true });


const axios = require('axios');
const fs = require('fs')


const id = process.env.CLIENT_ID
const secret = process.env.SECRET
const uname = process.env.USERNAME
const pwrd = process.env.PASSWORD
const ua = process.env.UA

const params = new URLSearchParams();
params.append('grant_type', 'password');
params.append('username', uname);
params.append('password', pwrd);

let subs = prompt("Subs? (seperate by comma) ")
let filter = prompt("Look for? ")

subs = subs.split(',')

let postsCollector = []

var minutes = 1, interval = minutes * 60 * 1000;

let firstRun = true;

function checkSubs(subreddits) {
    subreddits.forEach((sub) => {
        axios.post('https://www.reddit.com/api/v1/access_token', params, {
            auth: {
                username: id,
                password: secret
            }
        }).then(function (response) {
            console.log(response.data.access_token)
            axios.get(`https://oauth.reddit.com/r/${sub}/new.json?limit=50`, {
                headers: {
                    "Authorization": `Bearer ${response.data.access_token}`,
                    'User-Agent': ua
                }
            }).then(function (response) {
                console.log(response.data.data.children.length)
                response.data.data.children.forEach(function (post) {
                    let date = new Date(post.data.created * 1000)

                    if (post.data.title.toLowerCase().includes(filter)) {

                        if (postsCollector.some(e => e.title == post.data.title)) {
                            console.log('Exists');
                        } else {

                            postsCollector.push({ title: post.data.title, createdAt: `${date.toDateString()} ${date.toTimeString()}` })
                            firstRun && console.log({
                                title: post.data.title,
                                createdAt: `${date.toDateString()} ${date.toTimeString()}`,
                                subreddit: post.data.subreddit, permalink: post.data.permalink
                            })
                        }
                    }
                })



            });
        });

    })
    firstRun = false;
    postsCollector.length >= 150 && postsCollector.splice(-50)
}

setInterval(checkSubs, interval, subs)