const express = require('express')
const app = express()
const port = 3000
const scraper = require('./scraper')
const bodyParser = require('body-parser')
const cors = require("cors")

app.use(cors({origin: '*'}))

app.use(express.json())



app.post('/api/check-subs',  async (req, res) => {
try{
  const subs = req.body.subs
  const filter = req.body.filter

  const data = await scraper.checkSubs(subs, filter)
  res.send(data)
}catch(err){
  console.log(err)

}

  

})

app.get('/', (req,res)=>{
  res.send("?")
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})