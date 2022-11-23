const Cart = require('../models/Cart')
const router = require('express').Router()

const { protect } = require("../middleware/auth.middleware");

router.post("/", /*verifyTokenAdmin,*/ async (req,res)=>{
    const newCart = Cart(req.body)
    try {
        const savedCart = await newCart.save()
        res.status(200).json(savedCart)
    } catch (error) {
        res.status(500).json(error)
    }
})
//get a user cart
router.get('/:userId', /*verifyTokenAuth,*/ async(req,res)=>{
    try {
        const singleCart = await Cart.findOne({userId: req.params.userId})
        res.status(200).json(singleCart)
    } catch (error) {
        res.status(500).json(error)
    }
})
//get all cart
router.get("/",protect, async(req,res)=>{
    try {
        const allCart = await Cart.find()
        res.status(200).json(allCart)
    } catch (error) {
        res.status(500).json(error)
    }
})
//update a product
router.put('/:id', /*verifyTokenAdmin,*/protect async (req,res)=>{
    try {
     const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
         $set: req.body
     },{new: true});
     res.status(200).json(updatedCart)
    } catch (error) {
     res.status(500).json(error)
    }
 })
// delete a product
 router.delete('/:id', /*verifyTokenAdmin,*/protect, async (req,res)=>{
     try {
         const deletedCart = await Cart.findByIdAndDelete(req.params.id)
         res.json(200).json("Cart has been deleted")
     } catch (error) {
         res.status(500).json(error)
     }
 })
 module.exports = router