const fs = require('fs');
const { db, dbQuery } = require('../config/database')
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
                getSQL = `SELECT * from tb_user WHERE ${dataSearch.join(' AND ')} AND idstatus = 3;`
            } else {
                getSQL = `SELECT * from tb_user WHERE idstatus = 3;`
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
                let getSQL = `SELECT * from tb_user where email=${db.escape(req.body.email)} and password=${db.escape(req.body.password)};`
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
                console.log(getCart)
                getLogin[0].cart = getCart

                res.status(200).send(getLogin)
            }
            res.status(404).send("Not found")
        } catch (error) {
            res.status(500).send("Error login")
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
    register: async (req, res) => {
        try {
            console.log(req.body)
            let getSQL = `SELECT * from tb_user;`
            let insertSQL = `INSERT INTO tb_user (username, email, password) values (${db.escape(req.body.username)}, ${db.escape(req.body.email)}, ${db.escape(req.body.password)});`
            console.log(insertSQL)
            let register = await dbQuery(insertSQL)
            res.status(200).send("Register success!")
        } catch (error) {
            res.status(500).send(error)
        }
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
            console.log("keep login", req.body)
            let getSQL = `SELECT * from tb_user WHERE id = ${req.body.id}`
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
            console.log(getCart)
            keepLogin[0].cart = getCart

            res.status(200).send(keepLogin)
        } catch (error) {
            res.status(500).send("Error keep login")
        }
        // db.query(getSQL, (err, results) =>{
        //     if (err) {
        //         res.status(500).send({ status: 'err my sql', messages: err })
        //     }
        //     res.status(200).send(results)
        // })
    }
}