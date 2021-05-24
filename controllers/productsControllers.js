const fs = require('fs')
// import database
const { db } = require('../config/database')

let getSQL = `SELECT * from tb_products;`, getImage = `SELECT * FROM tb_products_image`; 
let getStok = `SELECT * from tb_products_stok ps JOIN status s on ps.idstatus = s.idstatus;`

module.exports = {
    getProducts: (req, res) => {
        let hasil = Object.keys(req.query).reduce((all, item) => { all.push(item + " = " + `'${req.query[item]}'`); return all }, []).join(" AND ");
        if (Object.keys(req.query).length > 0) {
            getSQL = `SELECT * from tb_products WHERE ${hasil};`
            console.log(getSQL)
        } else {
            getSQL = `SELECT * from tb_products;`
        }

        // bersifat asynchronous
        db.query(getSQL, (err, results) => {
            if (err) {
                res.status(500).send({ status: 'err get product from my sql', messages: err })
            }

            // menambahkan data image --> one to many
            db.query(getImage, (err_img, results_img) =>{
                if(err_img){
                    res.status(500).send({status: 'Error MySQL', messages: err_img})
                }
                // looping results data product
                results.forEach(item => {
                    // membuat properti images untuk psroduct
                    item.images = []
                    // looping results_image untuk dicocokkan dgn foreign key-nya
                    results_img.forEach(e =>{
                        // jika id sama, data results_img akan dimasukkan ke dalam properi baru item.images
                        if(item.idProduk == e.idProduk){
                            item.images.push(e.images)
                        }
                    })
                });

                // menambahkan data stok
                db.query(getStok, (err_stk, results_stk) =>{
                    if(err_stk){
                        res.status(500).send({status: 'Error MySQL', messages: err_stok})
                    }

                    results.forEach(i =>{
                        i.stok = []
                        results_stk.forEach(a =>{
                            if(i.idProduk === a.idProduk){
                                delete a.idProduk
                                delete a.idstatus
                                i.stok.push(a)
                            }
                        })
                    })
                    console.log(getStok)
                    // console.log("results stok: ", results_stk)
                    res.status(200).send(results)
                })

            })
        })
    },
    addProducts: (req, res) => {
        console.log('add products')
        let { nama, deskripsi, harga, image, qty, brand } = req.body
        console.log(nama)
        let postSQL = `INSERT INTO tb_products (nama, deskripsi, harga, image, qty, brand)
        values (${db.escape(nama)},${db.escape(deskripsi)}, ${db.escape(harga)}, ${db.escape(image)}, ${db.escape(qty)}, ${db.escape(brand)} )`

        db.query(postSQL, (err, results) => {
            if (err) {
                res.status(500).send({ status: 'err add product to my sql', messages: err })
            }
            res.status(200).send(results)
        })
    },
    updateProducts: (req, res) => {
            let dataSearch = []
            for (prop in req.body){
                dataSearch.push(`${prop} = ${db.escape(req.body[prop])}`)
            }
            let updateSQL = `UPDATE tb_products set ${dataSearch.join(' , ')} where idProduk = ${req.params.id};` 
            db.query(updateSQL, (err, results) => {
                if (err) {
                    res.status(500).send({ status: 'err update product from my sql', messages: err })
                }
                
                db.query(getSQL, (err, results) => {
                    if (err) {
                        res.status(500).send({ status: 'err get product from my sql', messages: err })
                    }
                    res.status(200).send(results)
                })
            })
    },
    deleteProducts: (req, res) =>{
        console.log('DELETE PRODUK')
        let delSQL = `UPDATE tb_products set qty = '0', status = 'Not Available' where idProduk = ${db.escape(req.params.id)};`
        console.log(delSQL)
        db.query(delSQL, (err, results) => {
            if (err) {
                res.status(500).send({ status: 'err get product from my sql', messages: err })
            }
            
            // manfaatkan query join
            db.query(getSQL, (err, results) => {
                if (err) {
                    res.status(500).send({ status: 'err get product from my sql', messages: err })
                }
                res.status(200).send(results)
            })
        })
    }
}