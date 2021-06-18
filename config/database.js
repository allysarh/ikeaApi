// konfigurasi untuk database

const mysql = require('mysql')

// membuat database dari mysql
// create connection --> satu saja membuat koneksi
// createpool --> secara otomatis ketika membuat koneksi databse, akan terputus dan saat request ulang dibuatkan lagi

// dari node js  
const util = require('util')

const db = mysql.createPool({
    host: process.env.HOSTSQL,
    user: process.env.USERSQL,
    password: process.env.PASSWORDSQL,
    database: process.env.DBSQL,
    port: process.env.PORTSQL,
    //multiple statement --> bisa double query
    multipleStatements: true
})

// bind --> agar bisa dihubungkan dengan fungsi asalnya
// kalo di react: penulisan bind function biasa bukan arrow function
const dbQuery = util.promisify(db.query).bind(db)

// db.getConnection((err, connection) =>{
//     if(err){
//         return console.error('error my sql:', err.message)
//     }
//     console.log(`Connected to MySQL server: ${connection.threadId} `)
// })
module.exports = { db, dbQuery }