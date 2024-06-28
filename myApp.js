require('dotenv').config()

let bodyParser = require('body-parser');
let express = require('express');
let app = express();

const logger = (req, res, next) => {
    let method = req.method
    let path = req.path
    let ip = req.ip
    let message = `${method} ${path} - ${ip}`
    console.log(message)
    next()
}

const urlmiddleWare = bodyParser.urlencoded({extended: false})

app.use(urlmiddleWare)
app.use(logger)
app.use("/public", express.static(__dirname + "/public"))


app.get('/', (req, res) => res.sendFile(__dirname + "/views/index.html"))

app.get('/json', (req, res) => {
    let toUpper = process.env.MESSAGE_STYLE
    if (toUpper === "uppercase") {    
        res.json({"message": "HELLO JSON"})
    } else {
        res.json({"message": "Hello json"})
    }
})

app.get('/now', (req, res, next) => {
    let date = new Date().toString()
    req.time = date
    next()
}, (req, res) => {
    res.json({"time": req.time})
})

app.get('/:word/echo', (req, res) => {
    let word = req.params.word
    res.json({"echo": word})
})

app.route('/name')
    .get((req, res) => {
        let firstname = req.query.first
        let lastname = req.query.last
        res.json({name: `${firstname} ${lastname}`})
    })
    .post((req, res) => {
        let firstname = req.body.first
        let lastname = req.body.last
        res.json({name: `${firstname} ${lastname}`})
    })

 module.exports = app;
