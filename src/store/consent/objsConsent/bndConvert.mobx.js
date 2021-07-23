import proj4 from 'proj4';
import WKT from "terraformer-wkt-parser";

const def_msk = '+proj=tmerc +lat_0=55.6666666667 +lon_0=37.5 +x_0=0 +y_0=0 +k_0=1. +a=6377397 +rf=299.15 +towgs84=396,165,557.7,-0.05,0.04,0.01,0 +no_defs';



let wktParse = (poly) => WKT.parse(poly)

const convertBbox = (bBox) => {
    if(bBox[0] && bBox[1]){
        try {
            let [resX5, resY5] = proj4(def_msk).inverse([bBox[0], bBox[1]]);
            let [resX6, resY6] = proj4(def_msk).inverse([bBox[2], bBox[3]]);
            bBox[0] = resY5 !== 0 && resY5 + 0.00004
            bBox[1] = resX5 !== 0 && resX5
            let leftBoxCorner = [bBox[0],bBox[1]]
            bBox[2] = resY6 !== 0 && resY6 + 0.00004
            bBox[3] = resX6 !== 0 && resX6
            let rightBoxCorner = [bBox[2],bBox[3]]
            return [leftBoxCorner, rightBoxCorner]
        } catch (e) { console.log('error bBox', e) }
    }else {return bBox}
}

const convert = (poly) => {

    if (poly.length === 2 && typeof poly[0] === 'number' && poly[0] > 0) {
        try {
            let [resX, resY] = proj4(def_msk).inverse([poly[0], poly[1]]);
            poly[0] = resY !== 0 && resY + 0.00004
            poly[1] = resX !== 0 && resX
            return poly
        } catch (e) { console.log('eee1', e) }

    } else if (poly.length === 1) {

        if (typeof poly[0] === 'number' && poly[0] > 0) {
            try {
                let [resX3, resY3] = proj4(def_msk).inverse([poly[0], poly[1]]);
                poly[0] = resY3 !== 0 && resY3 + 0.00004
                poly[1] = resX3 !== 0 && resX3
                return poly
            } catch (e) {  console.log('eee3', e) }

        } else { return convert(poly[0]) }
    } else if (poly.length > 2) {

        for (let i = 0; i < poly.length; i++) {
            poly[i] = convert(poly[i])
        }
        return poly
    }
    return poly
}

export const convertWT = (multiPolGeo) => {
    let regx2 = /(\))\s?(\()/gi
    let newPoly = multiPolGeo.replace(regx2, () => '),(')
    let copyPoly = newPoly.slice()
    let resWkt = wktParse(copyPoly)

    let bBox = resWkt['bbox']()
    let resBox = convertBbox(bBox)
    // console.log('resBox', resBox);

    let res = convert(resWkt.coordinates)

    return {bnd:[res], bBox: resBox}
}
