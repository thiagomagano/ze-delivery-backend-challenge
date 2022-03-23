const Partner = require('../models/Partner');
const geolib = require('geolib');





// @desc GET all partners
// @route GET /api/v1/partners
// @access Public

exports.getPartners = async (req, res, next) => {
  try {
    const partners = await Partner.find();

    return res.status(200).json({
      sucess: true,
      count: partners.length,
      data: partners
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server Error' })
  }
}

// @desc GET partner by id
// @route GET /api/v1/partner/:id
// @access Public

exports.getPartnerById = async (req, res, next) => {
  const id = req.params.id

  try {
    const partner = await Partner.find({ id: id })

    return res.status(200).json(partner);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server Error' })
  }
}

//@desc Create a Partner
//@route POST /api/v1/stores
//@acess Public

exports.createPartner = async (req, res, next) => {
  const { id, tradingName, ownerName, document } = req.body
  const covaregeArea = req.body['coverageArea']
  const address = req.body['address']

  //Cria um objeto para armazenar esses parametros
  const partner = {
    id,
    tradingName,
    ownerName,
    document,
    covaregeArea,
    address
  }

  try {
    // utiliza o metodo de insersação no banco de dados do mongoose
    await Partner.create(partner)
    //retorn uma resposta ao client
    res.status(200).json({ message: "new Partner create with sucess" })
  } catch (err) {
    // Em caso de erro, mostra o erro no console e para o client
    console.log(err)
    res.status(500).send({ error: err })
  }
}

//@desc Search a nearest Partner of location
//@route POST /api/v1/partner/search
//@acess Public

exports.SearchNearbyPartner = async (req, res, next) => {
  const { location } = req.body
  const partners = await Partner.find()

  partners.map((partner) => {
    const covarageArea = partner.covaregeArea.coordinates;

    console.log(geolib.isPointInPolygon(location, covarageArea));
  })



  res.status(200).json({ message: "Partner Found with sucess", data: partners })

  // try {
  //   // utiliza o metodo de insersação no banco de dados do mongoose
  //   await Partner.create(partner)
  //   //retorn uma resposta ao client
  //   res.status(200).json({ message: "Partner Found with sucess" })
  // } catch (err) {
  //   // Em caso de erro, mostra o erro no console e para o client
  //   console.log(err)
  //   res.status(500).send({ error: err })
  // }
}