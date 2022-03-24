const geolib = require('geolib');
const data = require("./partners.json")


const pointExample = [-46.582608, -23.563300]
let count = 0; //17 48

data.pdvs.map((pdv) => {
  const covarageData = pdv.coverageArea.coordinates[0][0][0]
  const point = pdv.address.coordinates



  if (geolib.isPointInPolygon(point, covarageData)) {
    console.log(pdv.id);
    count++
  };



})

const findPolygons = (multiPolygons) => {
  //return array
}

const isCovarage = (point, covarageArea) => {
  return geolib.isPointInPolygon(point, covarageArea)
}


const getCoveragePdvs = (point, pdvs) => {

  covaragePdvs = pdvs.filter((pdv) => {
    const covarageData = pdv.coverageArea.coordinates[0][0];

    return isCovarage(point, covarageData) ? true : false;

  })

  return covaragePdvs
}

const findNearest = (point, pdvs) => {
  //const covaragepdvs = getCoveragePdvs(point, pdvs);
  let nearestDistance, nearestPdv;


  pdvs.map((pdv => {
    const pdvPoint = pdv.address.coordinates
    const distance = geolib.getDistance(point, pdvPoint)

    if (!nearestDistance) {
      nearestDistance = distance
      nearestPdv = pdv;
    }
    if (distance < nearestDistance) {
      nearestDistance = distance
      nearestPdv = pdv;
    }
  }))

  return nearestPdv;
}

module.exports = {
  isCovarage,
  getCoveragePdvs,
  findNearest
}