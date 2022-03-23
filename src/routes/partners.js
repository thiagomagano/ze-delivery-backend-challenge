const express = require('express');
const { getPartners, createPartner, getPartnerById, SearchNearbyPartner } = require('../controllers/partners')

const router = express.Router();

router.route('/partners').get(getPartners)

router.route('/partner/:id').get(getPartnerById)

router.route('/partner').post(createPartner)

router.route('/partner/search').post(SearchNearbyPartner)

module.exports = router;