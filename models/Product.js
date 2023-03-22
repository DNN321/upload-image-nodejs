const mongoose =require ('mongoose')

const uploadSchema = new mongoose.Schema ({
    name:{
        type: String,
        required:[true,'insert name']
    },
    price:{
        type:Number,
        required:[true,'insert price']

    },

    image:{
        type: String,
        
    }
})


module.exports = mongoose.model ('imageUpload',uploadSchema)