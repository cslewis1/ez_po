 require('dotenv').config()
const express = require('express')

const app = express()
const cors = require('cors')

const {SERVER_PORT} = process.env
const {seed} = require('./seed.js')

const{getAllMeters, getAllOrders, getAllConfigs,} = require('./controller.js')

app.use(express.json())
app.use(cors())

app.post('/seed', seed)
app.get('/meter', getAllMeters)
app.get('/order', getAllOrders)
app.get('/configuration', getAllConfigs)




app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))