import proj4 from "proj4";

const def_msk = '+proj=tmerc +lat_0=55.6666666667 +lon_0=37.5 +x_0=0 +y_0=0 +k_0=1. +a=6377397 +rf=299.15 +towgs84=396,165,557.7,-0.05,0.04,0.01,0 +no_defs';
// 55.701476, 37.150170
// defs
const point83 = [463310.99, 2166286.56]
let [resX, resY] = proj4(def_msk).defs([point83[0], point83[1]]);
// let [resX, resY] = proj4(def_msk).inverse([point83[0], point83[1]]);
// 53.23484989776102 74.54385718041388 -- Михаил
console.log('resX, resY',resX, resY)
