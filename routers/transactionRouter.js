const express = require('express')
const { readToken } = require('../config')
const { transactionController } = require('../controllers')
const router = express.Router()

router.get('/get-cart', readToken,transactionController.getCart)
router.post('/post-cart',readToken, transactionController.addCart)
router.delete('/delete-cart/:idcart', transactionController.deleteCart)
router.patch('/update-qty', readToken, transactionController.updateCart)
router.get('/get-trans', readToken,transactionController.getTransactions)
router.post('/add-trans', readToken, transactionController.addTransactions)
router.patch('/update-trans/:idtransaction', transactionController.updateTransactions)

module.exports = router