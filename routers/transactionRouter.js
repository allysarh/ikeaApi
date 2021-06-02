const express = require('express')
const { transactionController } = require('../controllers')
const router = express.Router()

router.get('/get-cart/:id', transactionController.getCart)
router.post('/post-cart', transactionController.addCart)
router.delete('/delete-cart/:idcart', transactionController.deleteCart)
router.patch('/update-qty', transactionController.updateCart)
router.get('/get-trans/:id', transactionController.getTransactions)
router.post('/add-trans', transactionController.addTransactions)
router.patch('/update-trans/:idtransaction', transactionController.updateTransactions)

module.exports = router