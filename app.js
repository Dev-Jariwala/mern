require('dotenv').config();
const express = require('express')
const cors = require('cors')
const router = require('./routes/router')
const app = express();
const port = 8006;

app.use(express.json())
app.use(cors())
app.use(router)

app.listen(port, () => {
    console.log(`Listining on port ${port}`)
})
