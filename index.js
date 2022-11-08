
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv/config')
const authRoute = require('./routes/auth')
const productsRoutes = require('./routes/product')
const usersRoutes = require('./routes/userRoute')
const orderRoute = require('./routes/order')
const cartRoute = require('./routes/cart')
const app = express()
const port = 5500
app.use(cors())
app.use(express.json())

//database connection
mongoose.connect(process.env.db_url).then(()=>{
    console.log("db connected")
})
.catch((err)=>{
    console.log(err)
})

//middleware to create a user
app.use("/philuz/auth", authRoute)
app.use("/philuz/products", productsRoutes)
app.use("/philuz/users", usersRoutes)
app.use("/philuz/orders", orderRoute)
app.use("/philuz/cart", cartRoute)

app.listen(process.env.PORT || port,()=>{
    console.log(`app running on port ${port}`)
})

