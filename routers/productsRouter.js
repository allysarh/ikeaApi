const express = require('express')
const { productsControllers } = require('../controllers')

//langsung ini aja harusnya bisa juga
// maksudnya: kita impoort express yang memiliki method router
// mengurangi penggunaan memori
const router = express.Router()

router.post('/add', productsControllers.addProducts)
router.get('/read', productsControllers.getProducts)
router.patch('/update/:id', productsControllers.updateProducts)
router.delete('/delete/:id', productsControllers.deleteProducts)

module.exports = router