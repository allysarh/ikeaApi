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
    .get('/', (req, res) => {
        res.status(200).send(`<h2>${process.env.GRT}</h2>`)
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


//CATATAN DEPLOYMENT
/**
 * Kalau menggunakan http: PORT 80
 * Kalau deploy front end: konfigurasi otomatis dengan web servernya
 * kalau backend: harus konfigurasi sendiri
 * kalau mengaktifkan fitur https: harus di konfigurasi di index.js utama
 * Harus ada sertifikat SSL
 * Membuat SSL dengan open SSL dari windows
 */

/**
 * PROJECT MANAGEMENT
 * modul baru, belajar cara install webserver dan cara build servernya
 * pengelolaan jira
 * management: github
 * coba sampai penerapan sederhana dari CI/CD
 * final project: 2-3 minggu lagi
 * project management: mengelompokkan untuk sebuah proses management
 * mini final project
 * 
 * SERVER ssh --> supaya ga usah nunggu login server
 * pake puty --> dapet terminalnya aja
 * mobaexterm--> bisa liat direktori yang ada di server
 * 
 * PORVIDER server linode, digital ocean
 * server: PC kita tapi di internet --> OSnya linux
 * makanya harus terbiasa ddengan command line linuz
 * cari aja referensi command line linux
 * konfigurasionya mirip, tapi ada perbedaannya
 * 
 * mini server --> perusahaan yang membuat server sendiri
 * yang rumit -> maintenancenya
 * contoh intel ??
 * 
 * LINODE dan digital ocean: pure osnya saja
 * VPS: sudah disiapkan webservernya dan tools untuk tampilannya
 * Bahka ada c-panelnya
 * kalau hosting nanti hampir sama cuman kayak kita punya os windows dengan akun lain
 * (user1, user2, user3) --> dimana fiturnya terbatas
 * VPS: bisa mengakses akun rootnya (administrartornya)
 */

