const mongoose = require('mongoose')


const ProductSchema = mongoose.Schema({
    productId:{
        type: String,
        required: true,
        unique: true
    },
    productName: {
        type: String, 
        required: true, 
        
    },
    category: Array,
    price:{
        type: Number,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    size: {
        type:String,
        default: 'No Size'
    },
   img: {
        type: String,
        required: true
    },
   
    
},{timestamps: true});
module.exports = mongoose.model('Products', ProductSchema);