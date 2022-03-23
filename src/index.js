const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const Partner = require('./models/Partner')



const app = express();

app.use(express.json())

// Create A Partner
app.post('/partner', async (req, res) => {

  const { id, tradingName, ownerName, document } = req.body
  const covaregeArea = req.body['coverageArea']
  const address = req.body['address']


  const partner = {
    id,
    tradingName,
    ownerName,
    document,
    covaregeArea: covaregeArea,
    address: address
  }


  try {

    await Partner.create(partner)

    res.status(200).json({ message: "new Partner create with sucess" })

  } catch (err) {
    console.log(err)
    res.status(500).send({ error: err })
  }
})


//Conectando Banco de Dados
const DB_URL = process.env.DB_URL
mongoose.connect(DB_URL)
  .then(() => {
    console.log("Connect to the database")
    app.listen(process.env.PORT || 8080, () => console.log('Server runnning in http://localhost:8080'))
  })
  .catch((err) => console.log(err))
