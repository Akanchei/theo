const Order = require('../models/Orders')
const router = require('express').Router()
const { protect } = require("../middleware/auth.middleware");
router.post("/", /*verifyTokenAdmin,*/protect, async (req,res)=>{
    const newOrder = Order(req.body)
    try {
        const savedOrder = await newOrder.save()
        res.status(200).json(savedOrder)
    } catch (error) {
        res.status(500).json(error)
    }
})
//get a user order
router.get('/:orderId', /*verifyTokenAuth,*/protect, async(req,res)=>{
    try {
        const singleOrder = await Order.find({userId: req.params.userId})
        res.status(200).json(singleOrder)
    } catch (error) {
        res.status(500).json(error)
    }
})
//get all orders
router.get("/",protect, async(req,res)=>{
    try {
        const allOrder = await Order.find()
        res.status(200).json(allOrder)
    } catch (error) {
        res.status(500).json(error)
    }
})
//update a order
router.put('/:id', /*verifyTokenAdmin,*/protect, async (req,res)=>{
    try {
     const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
         $set: req.body
     },{new: true});
     res.status(200).json(updatedOrder)
    } catch (error) {
     res.status(500).json(error)
    }
 })
// delete a order
 router.delete('/:id', /*verifyTokenAdmin,*/protect, async (req,res)=>{
     try {
         const deletedOrder = await Order.findByIdAndDelete(req.params.id)
         res.json(200).json("Cart has been deleted")
     } catch (error) {
         res.status(500).json(error)
     }
 })
 //monthly income
 router.get("/imcome", async(req,re)=>{
    const date = new Date()
    const lastMonth = new Date(date.setMonth(date.getMonth()-1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth()-1));
    try {
        const income = Order.aggregate([
            {$match:{createdAt: {$gte:previousMonth}}},
            {
                $project: {
                month: {$month: "$createdAt"},
                sales: "$amount"
            }
        },
            {
                $group:{
                    _id: "$month",
                    total: {$sum: "$sales"}
                }
            }
        ])
    } catch (error) {
        res.status(500).json(error)
    }
 })
 module.exports = router