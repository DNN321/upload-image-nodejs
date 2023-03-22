const imageUpload = require ('../controllers/uploadsController')
const path = require ('path')
const error = require ('../errors')
const StatusCodes = require ('http-status-codes')
const cloudinary = require('cloudinary').v2


//upload to a local server
const localUpload = async (req,res)=>{
    //check req.file
    const productFile = req.file
    if (productFile){
        throw new error.BadRequestError('no file found')
    }

    //check mimetype of the file
    const productImage = req.files.image
    if (!productImage || !productImage.mimetype.startsWith('image')){
        throw new error.BadRequestError('wrong file format')
    }

    //check image is > a specified size
    //const productImageSize = 1024 * 1024
    if (productImage.size > 1024 * 1024){
        throw new error.BadRequestError('reduce image size')
    }

    //store the image in a directory in the server

    const imagePath = path.join(__dirname,'../public/uploads/'+`${productImage.name}`)
    await productImage.mv(imagePath)
    res.status(StatusCodes.CREATED).json({imagePath})

}

//upload to an online server(cloudinary)
const uploadOnline = async (req,res)=>{
    const uploadImage = await cloudinary.uploader.upload(req.files.image.tempFilePath,
        {
            use_filename:true,
            folder:'upload-file'

        })

        console.log(uploadImage)
        res.status(StatusCodes.CREATED).json({uploadImage:{src:uploadImage.secure_url}})
    
}

module.exports = {localUpload,uploadOnline}