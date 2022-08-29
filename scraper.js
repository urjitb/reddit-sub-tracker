require('dotenv').config();

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

async function checkSubs(subreddits, filter) {

    let fR = true;
    let postsCollector = []
    let options = {
        headers: {
            'User-Agent': ua
        }
    }
    await axios.post('https://www.reddit.com/api/v1/access_token', params, {
        auth: {
            username: id,
            password: secret
        }
    }).then(function (response) {
        options.headers['Authorization'] = `Bearer ${response.data.access_token}`
        console.log(options)
    })
    await Promise.all(subreddits.map(async function (sub) {

        await axios.get(`https://oauth.reddit.com/r/${sub}/new.json?limit=50`, options).then(function (response) {

            response.data.data.children.forEach(function (post) {
                let date = new Date(post.data.created * 1000)

                if (post.data.title.toLowerCase().includes(filter)) {

                    if (postsCollector.some(e => e.title == post.data.title)) {
                   
                    } else {
         
                        postsCollector.push({ title: post.data.title,
                            createdAt: `${date.toDateString()} ${date.toTimeString()}`,
                            subreddit: post.data.subreddit, permalink: post.data.permalink,
                            url: post.data.url,
                            selftext: post.data.selftext,
                            
                            ups: post.data.ups,
                            upvote_ratio: post.data.upvote_ratio
                        })

                    }
                }
            })

            postsCollector.length >= 150 && postsCollector.splice(-50)

        });

        fR = false;

    }))


    return (postsCollector)
}


module.exports = { checkSubs };
