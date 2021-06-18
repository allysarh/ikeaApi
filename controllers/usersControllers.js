// const fs = require('fs');
const { db, dbQuery, transporter, createToken  } = require('../config');
const Crypto = require('crypto');

module.exports = {
    getUsers: async (req, res) => {
        // async
        try {
            // let hasil =  Object.keys(req.query).reduce((all, item) => {all.push( item + " = " + `'${req.query[item]}'`); return all}, []).join("and ");
            let getSQL, dataSearch = []

            for (let prop in req.query) {
                dataSearch.push(`${prop} = ${db.escape(req.query[prop])}`)
            }
            if (dataSearch.length > 0) {
                getSQL = `SELECT * from tb_user WHERE ${dataSearch.join(' AND ')} AND idstatus = 11;`
            } else {
                getSQL = `SELECT * from tb_user WHERE idstatus = 11;`
            }

            let getUser = await dbQuery(getSQL)

            console.log("get user: ", getUser)
            res.status(200).send(getUser)
        } catch (error) {
            res.status(500).send("error get data user!")
        }

        //sync
        // modifikasi fungsi getuser --> urlnya dibuat bisa nerima query yang dinamis
        // gunakan looping oject
        // let hasil =  Object.keys(req.query).reduce((all, item) => {all.push( item + " = " + `'${req.query[item]}'`); return all}, []).join("and ");
        // let getSQL, dataSearch = []

        // for (let prop in req.query){
        //     dataSearch.push(`${prop} = ${db.escape(req.query[prop])}`)
        // }
        // if(dataSearch.length > 0){
        //     getSQL = `SELECT * from tb_user WHERE ${dataSearch.join(' AND ')};`
        // } else {
        //     getSQL = `SELECT * from tb_user;`
        // }
        // console.log(getSQL)
        // db.query(getSQL, (err, results) => {
        //     if (err) {
        //         res.status(500).send({ status: 'err my sql', messages: err })
        //     }
        //     res.status(200).send(results)
        // })
        //------///
        // if(Object.keys(req.query).length){
        // db.query(getSQL, (err, results) => {
        //     if (err) {
        //         res.status(500).send({ status: 'err my sql', messages: err })
        //     }
        //     res.status(200).send(results)
        // })
        // } else {
        //     db.query(`SELECT * from tb_user;`, (err, results) => {
        //         if (err) {
        //             res.status(500).send({ status: 'err my sql', messages: err })
        //         }
        //         res.status(200).send(results)
        //     })
        // }

        // pake params => pencarian data lewat query ga masalah (boleh diketahui oleh user)
        // req.body ==> jika data tersebut bersifat rahasia / tdk boleh diketaui oleh user

    },
    login: async (req, res) => {
        console.log(req.body)
        // async
        try {
            console.log("body:", req.body.email)
            if (req.body.email && req.body.password) {
                let hashPassword = Crypto.createHmac("sha256", "ikeak$$$").update(req.body.password).digest("hex")
                let getSQL = `SELECT id, username, email, password, role, status from tb_user u JOIN status s where u.idstatus = s.idstatus and email=${db.escape(req.body.email)} and password=${db.escape(hashPassword)};`
                let getLogin = await dbQuery(getSQL)
                console.log("getLogin", getLogin)
                // menambahkan cart
                let getCart = `SELECT c.idcart, c.id, p.idProduk, p.nama, p.harga, ps.type, ps.qty as qty_stok, ps.idproduk_stok, c.qty from cart c 
                JOIN tb_products p on c.idProduk = p.idProduk 
                JOIN tb_products_stok ps on ps.idproduk_stok = c.idproduk_stok where c.id = ${getLogin[0].id};`

                getCart = await dbQuery(getCart)
                let getImg = `SELECT * from tb_products_image;`
                getImg = await dbQuery(getImg)

                getCart.forEach(item => {
                    item.images = []
                    getImg.forEach(e => {
                        // jika id sama, data results_img akan dimasukkan ke dalam properi baru item.images
                        if (item.idProduk == e.idProduk) {
                            item.images.push({ idproduk_image: e.idProduk, images: e.images })
                        }
                    })
                })
    
                getLogin[0].cart = getCart

                // token
                let {id, username, email ,role, status} = getLogin[0]
                let token = createToken({id, username, email, role, status})
                console.log("token",token)
                res.status(200).send({id, username, email ,role, status, token})
            }
            
        } catch (error) {
            res.status(500).send("error")
        }
        //sync
        // console.log("login")
        // let getSQL = `SELECT * from tb_user where email=${db.escape(req.body.email)} and password=${db.escape(req.body.password)};`
        // if (req.body.email && req.body.password) {
        //     db.query(getSQL, (err, results) => {
        //         if (err) {
        //             res.status(500).send({ status: 'err my sql', messages: err })
        //         }
        //         if (results.length > 0) {
        //             res.status(200).send(results)
        //         } else {
        //             res.status(404).send({ status: 'Account not found' })
        //         }
        //     })
        // } else {
        //     res.status(404).send({ status: 'Query not found' })
        // }
    },
    register: async (req, res, next) => {
        try {
            // membuat OTP
            let char = '0123456789abcdefghijklmnoprstuvwxyz'
            let OTP = ''

            for(let i =0; i<6; i++){
                OTP += char.charAt(Math.floor(Math.random() * char.length))
            }
            let getSQL = `SELECT * from tb_user;`

            // hashing password
            let hashPassword = Crypto.createHmac("sha256", "ikeak$$$").update(req.body.password).digest("hex")

            // fungsi register
            let insertSQL = `INSERT INTO tb_user (username, email, password, otp) values (${db.escape(req.body.username)}, ${db.escape(req.body.email)}, ${db.escape(hashPassword)}, ${db.escape(OTP)});`
            console.log(insertSQL)
            let register = await dbQuery(insertSQL)

            let getUser = await dbQuery(`Select * from tb_user where id = ${register.insertId}`)
            let { id, username, email, role, idstatus, otp } = getUser[0]

            // fungsi untuk membuat token --> dilewati dulu
            // token untuk proteksi
            let token = createToken({id, username, email, role, idstatus})

            // Membuat konfigurasi untuk email
            // 1. kontent email
            let mail = {
                from: 'Admin Ikea <allysa.rahagustiani@gmail.com>', // sernder sesuai konfig nodemailer
                to: email,// penerima sesuai data select dari db
                subject: '[IKEA WEB]: Verification email', // subject email
                html: `<div style="text-align: 'center';">Your OTP: <b>${OTP}</b>
                <a href='http://localhost:3000/verif/${token}'>Verify your email</a>
                </div>`
            }
            // 2. konfig transporter
            await transporter.sendMail(mail)
            res.status(200).send({success: true, message: 'Register success ✅✅'})
        } catch (error) {
            next(error)
        }

        // tanpa async
        // console.log("register")
        // let getSQL = `SELECT * from tb_user;`
        // let insertSQL = `INSERT INTO tb_user (username, email, password) 
        // values (${db.escape(req.body.username)}, ${db.escape(req.body.email)}, ${db.escape(req.body.password)});`
        // // buat fungsi register
        // console.log(insertSQL)
        // db.query(insertSQL, (err, results) => {
        //     if (err) {
        //         res.status(500).send({ status: 'err my sql', messages: err })
        //     }
        //     db.query(getSQL, (err, results) => {
        //         if (err) {
        //             res.status(500).send({ status: 'err my sql', messages: err })
        //         }
        //         res.status(200).send(results)
        //     })
        //     // res.status(200).send(results)
        // })
    },
    keepLogin: async (req, res) => {
        try {
            // console.log("keep login", req.body)
            console.log("keep login", req.user.id)
            let getSQL = `SELECT * from tb_user WHERE id = ${req.user.id}`
            let keepLogin = await dbQuery(getSQL)
            console.log(keepLogin)
            keepLogin[0].cart = []

            let getCart = `SELECT c.idcart, c.id, p.idProduk, p.nama, p.harga, ps.type, ps.qty as qty_stok, ps.idproduk_stok, c.qty from cart c 
            JOIN tb_products p on c.idProduk = p.idProduk 
            JOIN tb_products_stok ps on ps.idproduk_stok = c.idproduk_stok where c.id = ${keepLogin[0].id};`

            getCart = await dbQuery(getCart)
            let getImg = `SELECT * from tb_products_image;`
            getImg = await dbQuery(getImg)

            getCart.forEach(item => {
                item.images = []
                getImg.forEach(e => {
                    // jika id sama, data results_img akan dimasukkan ke dalam properi baru item.images
                    if (item.idProduk == e.idProduk) {
                        item.images.push({ idproduk_image: e.idProduk, images: e.images })
                    }
                })
            })
            // console.log(getCart)
            keepLogin[0].cart = getCart

            let {id, username, email ,role, idstatus} = keepLogin[0]
            let token = createToken({id, username, email, role, idstatus})
            res.status(200).send({id, username, email, role, idstatus, token})
        } catch (error) {
            res.status(500).send("Error keep login")
        }
        // db.query(getSQL, (err, results) =>{
        //     if (err) {
        //         res.status(500).send({ status: 'err my sql', messages: err })
        //     }
        //     res.status(200).send(results)
        // })
    },
    verifyOtp: async (req, res, next) =>{
        try {
            console.log("hasil read token", req.user)
            
            let update = `UPDATE tb_user set idstatus = 11 where id = ${db.escape(req.user.id)} and otp=${db.escape(req.body.otp)};`
            await dbQuery(update)
            
            res.status(200).send({status: 200, message: "Verifikasi sukses ✅✅"})

        } catch (error) {
            next(error)
        }
        
    },
    reVerif: async (req, res, next) =>{
        try {
            let char = '0123456789abcdefghijklmnoprstuvwxyz'
            let OTP = ''

            for(let i =0; i<6; i++){
                OTP += char.charAt(Math.floor(Math.random() * char.length))
            }

            let hashPassword = Crypto.createHmac("sha256", "ikeak$$$").update(req.body.password).digest("hex")
            let getUser = await dbQuery(`SELECT * from tb_user where email = ${db.escape(req.body.email)} and password = ${db.escape(hashPassword)};`)
            let { id, username, email, role, idstatus} = getUser[0]
            console.log(getUser)
            
            
            let updateOTP = `UPDATE tb_user set otp = ${db.escape(OTP)} where id = ${db.escape(id)};`
            await dbQuery(updateOTP)
            
            // fungsi untuk membuat token 
            let token = createToken({id, username, email, role, idstatus})

            let mail = {
                from: 'Admin Ikea <allysa.rahagustiani@gmail.com>', 
                to: req.body.email,// penerima sesuai data select dari db
                subject: '[IKEA WEB]: Re-Verification email', // subject email
                html: `<div style="text-align: 'center';">Hello, ${username}. Your new OTP: <b>${OTP}</b>
                <a href='http://localhost:3000/verif/${token}'>Verify your email</a>
                </div>`
            }
        
            await transporter.sendMail(mail)

            res.status(200).send("Berhasil✅✅")
        } catch (error) {
            console.log(error)
        }
    }
}