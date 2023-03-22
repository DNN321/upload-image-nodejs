const imageUpload = require ('../models/Product')
const StatusCodes = require ('http-status-codes')
const mongoose = require ('mongoose')


const getallProducts = async (req,res)=>{
    const getproducts = req.body
    const allproducts = await imageUpload.find({})
    res.status(StatusCodes.CREATED).json({allproducts})
}

const createProduct = async (req,res)=>{
    const createdproduct = await imageUpload.create(req.body)
    res.status(StatusCodes.CREATED).json({createdproduct})
}


const getSpecificProducts = async (req,res)=>{
    const productId = req.params.id
    const getOneProduct = await imageUpload.findById({_id:productId})
    res.status(StatusCodes.CREATED).json({getOneProduct})

}

module.exports = {getallProducts,getSpecificProducts,createProduct}