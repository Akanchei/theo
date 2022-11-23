
const Product = require('../models/Products')
const router = require('express').Router()
const CryptoJS = require('crypto-js')
const { protect } = require("../middleware/auth.middleware");
const Cart = require('../models/Cart');
router.post("/", /*verifyTokenAdmin,protect,*/ async (req,res)=>{
    const newProduct = Product(req.body)
    try {
        const savedProduct = await newProduct.save()
        res.status(200).json(savedProduct)
    } catch (error) {
        res.status(500).json(error)
    }
})
//get a single product
router.get('/:id', /*verifyTokenAuth,*/ async(req,res)=>{
    try {
        const singleProduct = await Product.findById(req.params.id)
        res.status(200).json(singleProduct)
    } catch (error) {
        res.status(500).json(error)
    }
})
//get all products by category
router.get('/',  async (req,res)=>{
    const qcategory = req.params.category
    try {   
        let product;

        if(qcategory){
            product = await Product.find({category:{
                $in: qcategory
            }}).sort({}) 
        }else{
            product = await Product.find()
        }
            
            res.status(200).json(product)
        
    } catch (error) {
        res.status(500).json(error)
    }
})
router.get('/', async(req,res)=>{
    const query = req.params.new
    try {
        const products = query? await Product.find().sort({_id:-1}).limit(8):await Product.find();
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json(error)
    }
})

//update a product
router.put('/:id', /*verifyTokenAdmin,*/ async (req,res)=>{
    try {
     const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
         $set: req.body
     },{new: true});
     res.status(200).json(updatedProduct)
    } catch (error) {
     res.status(500).json(error)
    }
 })
// delete a product
 router.delete('/:id', /*verifyTokenAdmin,*/ protect, async (req,res)=>{
     try {
         const deletedProduct = await Product.findByIdAndDelete(req.params.id)
         res.json(200).json("Product has been deleted")
     } catch (error) {
         res.status(500).json(error)
     }
 })
 module.exports = router