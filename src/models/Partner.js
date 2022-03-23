const mongoose = require('mongoose')
const { Schema } = mongoose

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  }
});

const multiSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['MultiPolygon'],
    required: true
  },
  coordinates: {
    type: [[[[Number]]]],
    required: true
  }
});

const partnerSchema = new Schema({
  id: Number,
  tradingName: String,
  ownerName: String,
  document: { type: String, index: true },
  covaregeArea: multiSchema,
  address: pointSchema
})

const Partner = mongoose.model('Partner', partnerSchema)

module.exports = Partner