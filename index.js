const express = require('express')
const app = express()
const port = 3000
const scraper = require('./scraper')
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.post('/api/check-subs',  async(req, res) => {

  const subs = req.body.subs
  const filter = req.body.filter
  const data = await scraper.checkSubs(subs, filter)
  
  res.send(data)

})

app.get('/', (req,res)=>{
  res.send("?")
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})