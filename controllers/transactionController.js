const { db, dbQuery } = require('../config/database')

//parameter middleware baru: next --> untuk melanjutkan fungsi middleware
// next : management error handling

module.exports = {
    getCart: async (req, res, next) => {
        try {
            // console.log(req.params.id)
            // buat query untuk mendapatkan data cartnya
            // data yang dimabil : idUser, idProduk, nama,harga, gambar, type, qty stok barang (berdasarkan qty yg dipilih), idstok
            let getCart = `SELECT c.id, p.idProduk, p.nama, p.harga, ps.type, ps.qty as qty_stok, ps.idproduk_stok, c.qty from cart c 
            JOIN tb_products p on c.idProduk = p.idProduk 
            JOIN tb_products_stok ps on ps.idproduk_stok = c.idproduk_stok 
            WHERE c.id = ${req.params.id};`
            // c.id = ${req.body.id};`

            getCart = await dbQuery(getCart)
            let getImg = `SELECT * from tb_products_image;`
            getImg = await dbQuery(getImg)

            getCart.forEach(item => {
                item.images = []
                getImg.forEach(e => {
                    // jika id sama, data results_img akan dimasukkan ke dalam properi baru item.images
                    if (item.idProduk == e.idProduk) {
                        item.images.push(e)
                    }
                })
            })

            res.status(200).send(getCart)
        } catch (error) {
            // ketika dipanggil maka akan meneruskan ke middleware selanjutnya
            next(error) // akan mengarahkan ke index js utama
        }
    },
    addCart: async (req, res, next) => {
        try {
            console.log("dr FE", req.body)
            // menyederhanakan syntax 
            let insertCart = `Insert into cart set ?`
            insertCart = await dbQuery(insertCart, req.body)
            // get hasilnya
            console.log("re get:", await reGet(req.body.id))
            res.status(200).send(await reGet(req.body.id))
        } catch (error) {
            next(error)
        }
    },
    updateCart: async (req, res, next) => {
        try {
            let { id, idProduk, idproduk_stok, qty, idcart } = req.body
            console.log("req body backend: ", req.body)

            let updateCart = `Update cart set qty = ${qty} where idcart = ${db.escape(idcart)};`
            updateCart = await dbQuery(updateCart)
            res.status(200).send(await reGet(id))
        } catch (error) {
            next(error)
        }
    },
    deleteCart: async (req, res, next) => {
        try {
            let deleteCart = `DELETE from cart where idcart = ${req.params.idcart}`
            deleteCart = await dbQuery(deleteCart)

            res.status(200).send({ status: "SUCESS", results: deleteCart })
        } catch (error) {
            next(error)
        }
    },
    getTransactions: async (req, res, next) => {
        try {
            // let trans = `SELECT idtransaction, invoice, date, id, ongkir, total_payment, note, status from transactions t join status s on t.idstatus = s.idstatus ${req.params.id > 0 ? `where id = ${req.params.id};` : ';'};`
            let trans = `SELECT idtransaction, invoice, date, t.id, username, ongkir, total_payment, note, status from transactions t join status s on t.idstatus = s.idstatus join tb_user u on t.id = u.id ${req.params.id > 0 ? `where t.id = ${req.params.id};` : ';'};`
            trans = await dbQuery(trans)

            console.log("id --->>>", trans[0].idtransaction)
            let detail = `select idtransaction_detail, idtransaction, d.idProduk, d.idproduk_stok, d.qty, nama, harga, type  from transaction_detail d join tb_products p on p.idProduk = d.idProduk join tb_products_stok s on s.idproduk_stok = d.idproduk_stok;`

            detail = await dbQuery(detail)
            console.log("detail --->", detail)
            trans.forEach(item => {
                item.transactionDetail = []
                detail.forEach(e => {
                    if (item.idtransaction == e.idtransaction) {
                        item.transactionDetail.push(e)
                    }
                })
            })
            console.log(trans.transactionDetail)
            res.status(200).send(trans)

        } catch (error) {
            next(error)
        }
    },
    addTransactions: async (req, res, next) => {
        console.log("req body", req.body)
        try {
            let { id, ongkir, total_payment, note, idstatus, transactionDetail } = req.body
            let invoice = '#INVOICE/' + Math.floor(Math.random() * 1000) + String.fromCharCode(Math.floor(Math.random() * 10) + 65)
            let insertQuery = `INSERT into transactions set ?`
            insertQuery = await dbQuery(insertQuery, { invoice, id, ongkir, total_payment, note, idstatus })
            console.log("CO SUCCESS", insertQuery)

            let detailQuery = `INSERT into transaction_detail (idtransaction, idProduk, idproduk_stok, qty) values ?`
            // EKSEKUSI QUERY SQL PADA NODEJS:
            let dataDetail = transactionDetail.map(item => [insertQuery.insertId, item.idProduk, item.idproduk_stok, item.qty])
            console.log(dataDetail)
            detailQuery = await dbQuery(detailQuery, [dataDetail])
            console.log("detail query", detailQuery)

            // HAPUS CART SAAT INI
            let deleteCart = `Delete from cart where (idcart, id) IN (?)`
            let delCart = transactionDetail.map(item => [item.idcart, id])
            console.log(delCart)
            deleteCart = await dbQuery(deleteCart, [delCart])
            console.log("CO SUCCES", deleteCart)

            // let invoice = '#INVOICE' + Math.floor(Math.random()*1000) + String.fromCharCode(Math.floor(Math.random()*10)+65)
            // let ongkir = 10000
            // let idstatus = 6

            // let addTrans = `INSERT into transactions values (null, ${db.escape(invoice)}, ${db.escape(date)}, ${db.escape(id)}, ${ongkir}, ${total_payment}, ${db.escape(note)}, ${7} )`
            // addTrans = await dbQuery(addTrans)
            // console.log(addTrans)

            // let cartQuery = []
            // cart.forEach(item =>{
            //     cartQuery.push(` INSERT into transaction_detail values (NULL, ${db.escape(addTrans.insertId)}, ${db.escape(item.idProduk)}, ${db.escape(item.idproduk_stok)}, ${db.escape(item.qty)});`)
            // })
            // console.log(cartQuery.join(""))

            // await dbQuery(cartQuery.join(""))

            // GET ULANG
            // let trans = `SELECT * from transactions where id = ${req.params.id};`
            //     trans = await dbQuery(trans)

            //     console.log("id", trans[0].id)
            //     let detail = `SELECT * from transaction_detail where idtransaction = ${trans[0].id};`
            //     detail = await dbQuery(detail)
            //     trans.forEach(item =>{
            //         item.transactionDetail = []
            //         detail.forEach(e =>{
            //             if(item.idtransaction == e.idtransaction){
            //                 item.transactionDetail.push(e)
            //             }
            //         })
            //     })
            //     res.status(200).send(trans)
            res.status(200).send({ succes: true, message: "CHECK OUT SUCCESS ✅✅" })
        } catch (error) {
            next(error)
        }
    },
    updateTransactions: async (req, res, next) =>{
        try {
            console.log("hai")
            console.log(req.params.id)

            let updateTrans = `UPDATE transactions set idstatus = ${req.body.idstatus} where idtransaction = ${req.params.idtransaction}`
            await dbQuery(updateTrans)
            // // tampilkan data transaksi pada history transactions
            // yang ditampilkan : no, tgl, invoice, total payment, status, action
            // admin actino: button detail dan button confirm
            // button confirm --> merubah status unpaid --> paid
            // modal user: 
            res.status(200).send("Berhasil✅✅✅")
        } catch (error) {
            next(error)
        }
    }
}

// API UNTUK CHECK OUT
// Rancangan database: butuh dua buah table tambahan
// #invoice
reGet = async (id) => {
    let getCart = `SELECT c.idcart, c.id, p.idProduk, p.nama, p.harga, ps.type, ps.qty as qty_stok, ps.idproduk_stok, c.qty from cart c 
            JOIN tb_products p on c.idProduk = p.idProduk 
            JOIN tb_products_stok ps on ps.idproduk_stok = c.idproduk_stok 
            WHERE c.id = ${id};`

    getCart = await dbQuery(getCart)
    let getImg = `SELECT * from tb_products_image;`
    getImg = await dbQuery(getImg)

    getCart.forEach(item => {
        item.images = []
        getImg.forEach(e => {
            // jika id sama, data results_img akan dimasukkan ke dalam properi baru item.images
            if (item.idProduk == e.idProduk) {
                item.images.push(e)
            }
        })
    })
    return getCart
}