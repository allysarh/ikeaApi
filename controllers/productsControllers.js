const fs = require('fs');
const { type } = require('os');
const { join } = require('path');
// import database
const { db, dbQuery } = require('../config/database');


module.exports = {
    getProducts: async (req, res) => {
        try {
            let getSQL = `SELECT * from tb_products p where p.idstatus = 1;`, getImage = `SELECT * FROM tb_products_image`;
            let getStok = `SELECT * from tb_products_stok ps JOIN status s on ps.idstatus = s.idstatus where ps.idstatus=1;`
            let hasil = Object.keys(req.query).reduce((all, item) => { all.push(item + " = " + `'${req.query[item]}'`); return all }, []).join(" AND ");
            console.log(typeof (hasil))
            if (Object.keys(req.query).length > 0) {
                getSQL = `SELECT * from tb_products WHERE ${hasil};`
                console.log(getSQL)
            } else {
                getSQL = `SELECT * from tb_products p where p.idstatus = 1;`
            }

            let get = await dbQuery(getSQL)
            let getImg = await dbQuery(getImage)
            let getStk = await dbQuery(getStok)
            console.log("get", get)
            console.log("get Img")
            // get === results
            get.forEach(item => {
                // membuat properti images untuk product (nambahin image ke data result)
                item.images = []

                // looping results_image untuk dicocokkan dgn foreign key-nya
                getImg.forEach(e => {
                    // jika id sama, data results_img akan dimasukkan ke dalam properi baru item.images
                    if (item.idProduk == e.idProduk) {
                        item.images.push(e)
                    }
                })

                item.stok = []
                getStk.forEach(a => {
                    if (item.idProduk === a.idProduk) {
                        delete a.idProduk
                        delete a.idstatus
                        item.stok.push(a)
                    }
                })
            });

            res.status(200).send(get)

        } catch (error) {
            if (error) {
                console.log(error)
                res.status(500).send({ status: 'err get product from my sql', messages: err })
            }
        }

        // bersifat asynchronous
        // db.query(getSQL, (err, results) => {
        //     if (err) {
        //         console.log(err)
        //         res.status(500).send({ status: 'err get product from my sql', messages: err })
        //     }

        //     // menambahkan data image --> one to many
        //     db.query(getImage, (err_img, results_img) => {
        //         if (err_img) {
        //             res.status(500).send({ status: 'Error MySQL', messages: err_img })
        //         }
        //         // looping results data product
        //         results.forEach(item => {
        //             // membuat properti images untuk product (nambahin image ke data result)
        //             item.images = []

        //             // looping results_image untuk dicocokkan dgn foreign key-nya
        //             results_img.forEach(e => {
        //                 // jika id sama, data results_img akan dimasukkan ke dalam properi baru item.images
        //                 if (item.idProduk == e.idProduk) {
        //                     item.images.push(e)
        //                 }
        //             })
        //         });

        //         // menambahkan data stok
        //         db.query(getStok, (err_stk, results_stk) => {
        //             if (err_stk) {
        //                 res.status(500).send({ status: 'Error MySQL', messages: err_stk })
        //             }

        //             if (results_stk) {
        //                 results.forEach(i => {
        //                     i.stok = []
        //                     results_stk.forEach(a => {
        //                         if (i.idProduk === a.idProduk) {
        //                             delete a.idProduk
        //                             delete a.idstatus
        //                             i.stok.push(a)
        //                         }
        //                     })
        //                 })
        //                 // console.log(getStok)
        //                 // console.log("results stok: ", results_stk)
        //             }
        //             res.status(200).send(results)
        //         })

        //     })
        // })
    },
    addProducts: async (req, res) => {
        try {
            // console.log(req.body.images) 
            let postProduk = `INSERT into tb_products values (null, ${db.escape(req.body.nama)}, ${db.escape(req.body.deskripsi)}, ${db.escape(req.body.harga)}, ${db.escape(req.body.brand)}, ${db.escape(req.body.idstatus)});`
            let postImg = `INSERT into tb_products_image values `
            let postStk = `INSERT into tb_products_stok values `
            let dataImg = []
            let post = await dbQuery(postProduk) 
            req.body.images.forEach(item => {
                dataImg.push(`(null, ${post.insertId}, ${db.escape(item.images)})`)
            })
            console.log(dataImg)
            let dataStk = []
            req.body.stok.forEach(item => {
                dataStk.push(`(null, ${db.escape(item.type)}, 
                ${db.escape(req.body.idstatus)}, ${db.escape(item.qty)}, ${post.insertId})`)
            })
            console.log(postImg+dataImg)
            await dbQuery(postImg + dataImg)
            await dbQuery(postStk + dataStk)

            res.status(200).send("Insert product success!✅")
        } catch (error) {
            res.status(500).send({ status: 'err update product to my sql', messages: error })
        }

        // sync
        // let postProduk = `INSERT into tb_products values (null, ${db.escape(req.body.nama)}, ${db.escape(req.body.deskripsi)}, ${db.escape(req.body.harga)}, ${db.escape(req.body.brand)}, ${db.escape(req.body.idstatus)});`
        // let postImg = `INSERT into tb_products_image values `
        // let postStk = `INSERT into tb_products_stok values `

        // db.query(postProduk, (err, results) => {
        //     if (err) {
        //         res.status(500).send({ status: 'Error MySQL', messages: err })
        //     }

        //     if (results.insertId) {
        //         // menjalankan insert untuk tb_products_img dan tb_produtcs_stk
        //         // looping: setiap looping insert data, cara2: buat query multiple data
        //         let dataImg = []
        //         req.body.images.forEach(item => {
        //             dataImg.push(`(null, ${results.insertId}, ${db.escape(item)})`)
        //         })

        //         let dataStk = []
        //         req.body.stok.forEach(item => {
        //             dataStk.push(`(null, ${db.escape(item.type)}, 
        //             ${db.escape(req.body.idstatus)}, ${db.escape(item.qty)}, ${results.insertId})`)
        //         })
        //         console.log(postStk + dataStk) // string + array --> string
        //         console.log(postImg + dataImg)

        //         db.query(postImg + dataImg, (err_img, results_img) => {
        //             if (err_img) {
        //                 res.status(500).send({ status: 'Error MySQL', messages: err_img })
        //             }

        //             db.query(postStk + dataStk, (err_stk, results_stk) => {
        //                 if (err_stk) {
        //                     res.status(500).send({ status: 'Error MySQL', messages: err_stk })
        //                 }

        //                 res.status(200).send("Insert product success!✅")
        //             })
        //         })
        //     }
        // })

        // algoritma:
        // 1. melihat apakah ada stok di request body
        // 2. split req body berdasarkan images, stok dan produk (sisasnya)
        // 3. buat db query stok --> images --> produk

        // ADD PRODUK
        // let produk = { ...req.body }, produkProp = []
        // delete produk.stok
        // delete produk.images

        // for (prop in produk) {
        //     produkProp.push(prop)
        //     prodOut = produkProp.filter((item, idx) => produkProp.indexOf(item) === idx)
        // }
        // produkPropSQL = prodOut.join(" , ") + " , idProduk"
        // produkValSQL = `(${db.escape(Object.values(produk)) + `, ${db.escape(null)}`})`

        // produkSQL = `INSERT into tb_products (${produkPropSQL}) values ${produkValSQL}`
        // console.log(produkSQL)
        // // ADD STOK
        // let stokProp = [], stokVal = [], output = []
        // req.body.stok.forEach(item => {
        //     stokVal.push(`(${db.escape(Object.values(item))})`)
        //     // stokVal.push(`(${Object.values(item).join(" , ")})`)
        //     for (prop in item) {
        //         stokProp.push(prop)
        //         output = stokProp.filter((item, idx) => stokProp.indexOf(item) === idx)
        //     }
        // })
        // let hsl = output.join(" , ") + ` , idProduk`

        // let val = stokVal.join(" , ")
        // let stokSQL = `INSERT into tb_products_stok (${hsl}) values ${val};`

        // // UPDATE IMAGES
        // let imgVal = req.body.images.join(" , ")
        // let imgSQL = `INSERT into tb_products images values ${imgVal}`
        // console.log("img val:", imgVal)

        // db.query(produkSQL, (err1, results1) => {
        //     if (err1) {
        //         res.status(500).send(err1)
        //     }
        //     db.query(stokSQL, (err2, results) => {
        //         if (err2) {
        //             res.status(500).send(err2)
        //         }

        //         res.status(200).send(results)
        //     })
        // })
        // console.log("stok prop:",stokProp)
        // console.log("stok val:",stokVal)
        // insert into tb_biodata (nama, usia, alamat) values ('Upin', 23, 'Petaling');
        // for (prop in req.body){
        //     dataSearch.push(prop)
        //     valSearch.push(req.body[prop])
        // }

        // let val = valSearch.map(item => `${db.escape(item)}`).join(" , ")
        // console.log(val)
        // // let postSQL = `INSERT INTO tb_products (nama, deskripsi, harga, image, qty, brand)
        // // values (${db.escape(nama)},${db.escape(deskripsi)}, ${db.escape(harga)}, ${db.escape(image)}, ${db.escape(qty)}, ${db.escape(brand)} )`

        // let postSQL = `INSERT INTO tb_products (${dataSearch.join(" , ")}) values (${val})`
        // console.log(postSQL)

        // db.query(postSQL, (err, results) => {
        //     if (err) {
        //         res.status(500).send({ status: 'err add product to my sql', messages: err })
        //     }
        //     res.status(200).send(results)
        // })
    },
    updateProducts: async (req, res) => {
        try {

            console.log("data update:", req.body)
            let { idProduk, nama, brand, deskripsi, harga, idstatus, images, stok } = req.body

            // update images
            let updateImages = images.map(item => `Update tb_products_image set images = ${db.escape(item.images)} where idproduct_image = ${db.escape(item.idproduct_image)};`)

            // update stok
            let updateStok = stok.map(item => `Update tb_products_stok set type = ${db.escape(item.type)}, qty = ${item.qty} where idproduk_stok = ${item.idproduk_stok};`)

            // update master
            let update = `UPDATE tb_products set nama = ${db.escape(nama)}, brand =${db.escape(brand)}, deskripsi = ${db.escape(deskripsi)}, harga = ${db.escape(harga)}, idstatus=${db.escape(idstatus)} where idProduk = ${db.escape(idProduk)};
            ${updateImages.join('\n')}
            ${updateStok.join('\n')}`
            
            await dbQuery(update)
            
            // GET ULANG
            let getSQL = `SELECT * from tb_products p where p.idstatus = 1;`, getImage = `SELECT * FROM tb_products_image`;
            let getStok = `SELECT * from tb_products_stok ps JOIN status s on ps.idstatus = s.idstatus where ps.idstatus=1;`
            let hasil = Object.keys(req.query).reduce((all, item) => { all.push(item + " = " + `'${req.query[item]}'`); return all }, []).join(" AND ");
            console.log(typeof (hasil))
            if (Object.keys(req.query).length > 0) {
                getSQL = `SELECT * from tb_products WHERE ${hasil};`
                console.log(getSQL)
            } else {
                getSQL = `SELECT * from tb_products p where p.idstatus = 1;`
            }

            let get = await dbQuery(getSQL)
            let getImg = await dbQuery(getImage)
            let getStk = await dbQuery(getStok)

            // get === results
            get.forEach(item => {
                // membuat properti images untuk product (nambahin image ke data result)
                item.images = []

                // looping results_image untuk dicocokkan dgn foreign key-nya
                getImg.forEach(e => {
                    // jika id sama, data results_img akan dimasukkan ke dalam properi baru item.images
                    if (item.idProduk == e.idProduk) {
                        item.images.push(e)
                    }
                })

                item.stok = []
                getStk.forEach(a => {
                    if (item.idProduk === a.idProduk) {
                        delete a.idProduk
                        delete a.idstatus
                        item.stok.push(a)
                    }
                })
            });

            res.status(200).send(get)
        } catch (error) {
            res.status(500).send({ status: 'err update product to my sql', messages: error })
        }
        // db.query(update, (err, results) => {
        //     if (err) {
        //         res.status(500).send({ status: 'err update product to my sql', messages: err })
        //     }

        //     db.query(updateImages.join('\n'), (err_img, results_img) =>{
        //         if (err_img) {
        //             res.status(500).send({ status: 'err update product image to my sql', messages: err_img })
        //         }

        //         db.query(updateStok.join('\n'), (err_stk, results_stk) =>{
        //             if(err_stk){
        //                 res.status(500).send({status: 'Error update stok', messages: err_stk})
        //             }
        //             res.status(200).send("Update image success")
        //         })
        //     })
        // })
        // update satu baris
        // let updateSQL = `UPDATE tb_products set ${dataSearch.join(' , ')} where idProduk = ${req.params.id};`
        // let dataSearch = []
        // console.log("req body ==>", req.body)
        // for (prop in req.body) {
        //     dataSearch.push(`${prop} = ${db.escape(req.body[prop])}`)
        // }
        // let updateSQL = `UPDATE tb_products set ${dataSearch.join(' , ')} where idProduk = ${req.params.id};`
        // console.log(updateSQL)
        // db.query(updateSQL, (err, results) => {
        //     if (err) {
        //         res.status(500).send({ status: 'err update product from my sql', messages: err })
        //     }

        //     db.query(getSQL, (err, results) => {
        //         if (err) {
        //             res.status(500).send({ status: 'err get product from my sql', messages: err })
        //         }
        //         res.status(200).send(results)
        //     })
        // })
    },
    deleteProducts: async (req, res) => {
        //DELETE 1 BARIS
        // console.log('DELETE PRODUK')
        // let delSQL = `UPDATE tb_products set qty = '0', status = 'Not Available' where idProduk = ${db.escape(req.params.id)};`
        // console.log(delSQL)
        // db.query(delSQL, (err, results) => {
        //     if (err) {
        //         res.status(500).send({ status: 'err get product from my sql', messages: err })
        //     }

        //     // manfaatkan query join
        //     db.query(getSQL, (err, results) => {
        //         if (err) {
        //             res.status(500).send({ status: 'err get product from my sql', messages: err })
        //         }
        //         res.status(200).send(results)
        //     })
        // })

        // DELETE MULTIPLE BARIS
        // data jangan dihapus cuma diganti jd non available, karena datanya bisa dipake di divisi lain
        // contoh: marketing

        // async

        try {
            let delSQL = `UPDATE tb_products set idstatus = 2 where idProduk = ${req.query.id};`
            let del = await dbQuery(delSQL)
            console.log("delete result", del)
            res.status(200).send("Delete product success ✅✅")

        } catch (error) {
            res.status(500).send({ status: 'err delete product from my sql', messages: error })

        }
        //sync
        // console.log(req.query.id)
        // let delSQL = `UPDATE tb_products set idstatus = 2 where idProduk = ${req.query.id};`
        // console.log(delSQL)
        // db.query(delSQL, (err, results) => {
        //     if (err) {
        //         res.status(500).send({ status: 'err delete product from my sql', messages: err })
        //     }

        //     res.status(200).send("Delete product success ✅✅")
        // })
    }


}

// BACKUP UPDATE CONTROLLER SYNC
// console.log("data update:", req.body)
//         let { idProduk, nama, brand, deskripsi, harga, idstatus, images, stok } = req.body
//         // ini boleh pake looping atau boleh manual, kalo pake looping pake kondisi sbg pembatas images dan stok nya
//         let update = `UPDATE tb_products set nama = ${db.escape(nama)}, brand =${db.escape(brand)}, deskripsi = ${db.escape(deskripsi)},
//         harga = ${db.escape(harga)}, idstatus=${db.escape(idstatus)} where idProduk = ${db.escape(idProduk)};`
//         console.log(update)

//         db.query(update, (err, results) => {
//             if (err) {
//                 res.status(500).send({ status: 'err update product to my sql', messages: err })
//             }

//             // update images dan stok
//             // memanfaatkan looping untuk beberapa kali 
//             let updateImages = images.map(item => `Update tb_products_image set images = ${db.escape(item.images)} where idproduct_image = ${db.escape(item.idproduct_images)};`)
//             // for (let prop in images){
//             //     updateImages.push(`Update tb_product_images`)
//             // }
//             console.log("update images query: ",updateImages)
//             let updateStok = stok.map(item => `Update tb_products_stok set type = ${db.escape(item.type)}, qty = ${item.qty} where idproduk_stok = ${item.idproduk_stok};`)
//             console.log("update stok:", updateStok)
//             db.query(updateImages.join('\n'), (err_img, results_img) =>{
//                 if (err_img) {
//                     res.status(500).send({ status: 'err update product image to my sql', messages: err_img })
//                 }

//                 db.query(updateStok.join('\n'), (err_stk, results_stk) =>{
//                     if(err_stk){
//                         res.status(500).send({status: 'Error update stok', messages: err_stk})
//                     }
//                     res.status(200).send("Update image success")
//                 })
//             })
//         })