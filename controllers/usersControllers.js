const fs = require('fs')
const { db } = require('../config/database')
module.exports = {
    getUsers: (req, res) => {
        // modifikasi fungsi getuser --> urlnya dibuat bisa nerima query yang dinamis
        // gunakan looping oject
        let hasil =  Object.keys(req.query).reduce((all, item) => {all.push( item + " = " + `'${req.query[item]}'`); return all}, []).join("and ");
        let getSQL, dataSearch = []

        for (let prop in req.query){
            dataSearch.push(`${prop} = ${db.escape(req.query[prop])}`)
        }
        if(dataSearch.length > 0){
            getSQL = `SELECT * from tb_user WHERE ${dataSearch.join(' AND ')};`
        } else {
            getSQL = `SELECT * from tb_user;`
        }
        console.log(getSQL)
        db.query(getSQL, (err, results) => {
            if (err) {
                res.status(500).send({ status: 'err my sql', messages: err })
            }
            res.status(200).send(results)
        })

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
    login: (req, res) => {
        console.log("login")
        let getSQL = `SELECT * from tb_user where email=${db.escape(req.body.email)} and password=${db.escape(req.body.password)};`
        if (req.body.email && req.body.password) {
            db.query(getSQL, (err, results) => {
                if (err) {
                    res.status(500).send({ status: 'err my sql', messages: err })
                }
                if (results.length > 0) {
                    res.status(200).send(results)
                } else {
                    res.status(404).send({ status: 'Account not found' })
                }
            })
        } else {
            res.status(404).send({ status: 'Query not found' })
        }
    },
    register: (req, res) => {
        console.log("register")
        let getSQL = `SELECT * from tb_user;`
        let insertSQL = `INSERT INTO tb_user (username, email, password) 
        values (${db.escape(req.body.username)}, ${db.escape(req.body.email)}, ${db.escape(req.body.password)});`
        // buat fungsi register
        console.log(insertSQL)
        db.query(insertSQL, (err, results) => {
            if (err) {
                res.status(500).send({ status: 'err my sql', messages: err })
            }
            db.query(getSQL, (err, results) => {
                if (err) {
                    res.status(500).send({ status: 'err my sql', messages: err })
                }
                res.status(200).send(results)
            })
            // res.status(200).send(results)
        })
    },
    keepLogin: (req,res) =>{
        console.log("keep login")
        let getSQL = `SELECT * from tb_user WHERE id = ${req.body.id}`

        db.query(getSQL, (err, results) =>{
            if (err) {
                res.status(500).send({ status: 'err my sql', messages: err })
            }
            res.status(200).send(results)
        })
    }
}