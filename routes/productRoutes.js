const express = require ('express')
const router = express.Router()
const {getallProducts,getSpecificProducts,createProduct} = require ('../controllers/productController')
const {localUpload,uploadOnline} = require ('../controllers/uploadsController')

router.route('/').get(getallProducts).post(createProduct)
router.route('/:id').get(getSpecificProducts)
router.route('/uploads').post(uploadOnline)


module.exports = router



