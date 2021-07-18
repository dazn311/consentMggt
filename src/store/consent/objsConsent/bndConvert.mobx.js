import proj4 from 'proj4';
import WKT from "terraformer-wkt-parser";
import memoize from "lodash/memoize";

const def_msk = '+proj=tmerc +lat_0=55.6666666667 +lon_0=37.5 +x_0=0 +y_0=0 +k_0=1. +a=6377397 +rf=299.15 +towgs84=396,165,557.7,-0.05,0.04,0.01,0 +no_defs';

let geoJson = (poly) => WKT.parse(poly)

export const convertWT = memoize((multiPolGeo) => {
    console.log('convertWT start')
    let regx = /(-?\d+\.\d+\s)(-?\d+\.\d+)/gi;  // LINESTRING (m18.44, m35.22, m44.99)

    let multiPol = multiPolGeo.replace(')(', '),(')
    let newPoly = multiPol.replace(regx, (m, x, y, r) => {
        let [resX, resY] = proj4(def_msk).inverse([parseFloat(x), parseFloat(y)]);
        return  `${resY} ${resX}`
    })
    console.log('convertWT end')
    return geoJson(newPoly)
}) // end memoize
