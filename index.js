const express = require('express')
const app = express()
const PORT = 2025
const fs = require('fs')
const { db } = require('./config/database')
const { userRouter, productsRouter, transactionRouter } = require('./routers')
// cors --> config supaya FE bisa mengakses BE
const cors = require('cors')

app.use(cors())

// menyambumngkan dengan mySQL
db.getConnection((err, connection) => {
    if (err) {
        return console.error('error my sql:', err.message)
    }
    console.log(`Connected to MySQL server: ${connection.threadId} `)
})

// menggunakan express
app.use(express.json())
    .get('/', (req, res) => {
        res.status(200).send('<h2>Selamat datang di API ikea</h2>')
    })
app.use('/users', userRouter).get('/users', (req, res) => res.status(200).send('USER PAGE'))
app.use('/products', productsRouter).get('/products', (req, res) => res.status(200).send('PRODUK PAGE'))
app.use('/transactions', transactionRouter).get('/transactions', (req, res) => res.status(200).send('TRANSACTION PAGE'))

// error handing
app.use((error, req, res, next) =>{
    console.log("Handling error: ", error)
    res.status(500).send({status: 'Error', messages: error})
})
.listen(PORT, () => console.log("Server Running At:", PORT))

