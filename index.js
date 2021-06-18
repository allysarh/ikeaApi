//konfigurasi DOT ENV
const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const app = express()
const PORT = 2025
const { db } = require('./config/database')
const { userRouter, productsRouter, transactionRouter } = require('./routers')
// cors --> config supaya FE bisa mengakses BE
const cors = require('cors')
// impoet bearer token 
const bearerToken = require('express-bearer-token')

// development https
const https = require('https')
const fs = require('fs') 


app.use(cors())
app.use(bearerToken()) // untuk mengambil data auth/token dari request header yang dikirim oleh FE

// membaca file (GET FILE) -- untuk memberikan akses langsung ke direktori public
app.use(express.static('public'))

// menyambumngkan dengan mySQL
db.getConnection((err, connection) => {
    if (err) {
        return console.error('error my sql:', err.message)
    }
    console.log(`Connected to MySQL server: ${connection.threadId} `)
})

// menggunakan express
app.use(express.json())

//ROUTING
app.get('/', (req, res) => {
        res.status(200).send(`<h1>${process.env.GRT}</h1>`)
    })
app.use('/users', userRouter).get('/users', (req, res) => res.status(200).send('USER PAGE'))
app.use('/products', productsRouter).get('/products', (req, res) => res.status(200).send('PRODUK PAGE'))
app.use('/transactions', transactionRouter).get('/transactions', (req, res) => res.status(200).send('TRANSACTION PAGE'))

// error handing
app.use((error, req, res, next) =>{
    console.log("Handling error: ", error)
    res.status(500).send({status: 'Error', messages: error})
})

// create server https
https.createServer({
key: fs.readFileSync('./ssl/ikeassl.key'),
cert: fs.readFileSync('./ssl/ikeassl.cert')
}, app).listen(PORT, () => console.log("Server Running At:", PORT))


// LISTEN to port
// app.listen(PORT, () => console.log("Server Running At:", PORT))


