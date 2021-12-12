const express = require('express')
const router = express.Router()
const routeProduct = require('./product.routes')
const routeUser = require('./user.routes')

router.use("/products", routeProduct);
router.use('/users',routeUser)

module.exports = router