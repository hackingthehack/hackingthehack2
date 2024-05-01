if(process.env.NODE_ENV !== 'production')
{
    require('dotenv').config()
}

const express = require("express")
const indexRouter = require('./routes/index')

const app = express()
const expressLayouts = require("express-ejs-layouts")


app.set('view engine','ejs')
app.set('views', __dirname + '/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
//mongoose
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL,
    {
    useNewUrlParser : true
})

const db = mongoose.connection
db.on('error',error =>console.error(error))
db.once('open', () =>console.log('connected to mongoose'))
// mongoose.connection.on("error", err => {

//     console.log("err", err)
  
//   })
//   mongoose.connection.on("connected", (err, res) => {
  
//     console.log("mongoose is connected")
  
//   })

app.use('/',indexRouter)
app.listen(process.env.PORT || 3000)


