const mongoose = require('mongoose')


const PointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true,
    index: '2dsphere'
  }
});

const MultiSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['MultiPolygon'],
    required: true
  },
  coordinates: {
    type: [[[[Number]]]],
    required: true,
    index: '2dsphere'
  }
});

const PartnerSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  tradingName: String,
  ownerName: String,
  document: { type: String, unique: true },
  covaregeArea: MultiSchema,
  address: PointSchema
})

module.exports = mongoose.model('Partner', PartnerSchema)