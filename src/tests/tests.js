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

const isPointInPolygon = (point, polygons) => {
  return geolib.isPointInPolygon(point, polygons)
}


const getCoveragePdvs = (point, pdvs) => {
  covaragePdvs = pdvs.filter((pdv) => {
    const covarageData = pdv.coverageArea.coordinates[0][0]

    if (geolib.isPointInPolygon(point, covarageData)) {
      return true
    } else {
      return false
    }
  })

  return covaragePdvs
}

const findNearest = (point, pdvs) => {
  const covaragepdvs = getCoveragePdvs(point, pdvs);
  let nearestDistance = 999999999;
  let nearestPdv;

  covaragepdvs.map((pdv => {
    const pdvPoint = pdv.address.coordinates
    const distance = geolib.getDistance(point, pdvPoint)


    if (distance < nearestDistance) {
      nearestDistance = distance
      nearestPdv = pdv;
    }
    console.log(distance);
  }))

  return nearestPdv;
}

console.log(findNearest(pointExample, data.pdvs));

module.exports = {
  isPointInPolygon,
  getCoveragePdvs,
  findNearest
}