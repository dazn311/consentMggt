import proj4 from "proj4";

const def_msk = '+proj=tmerc +lat_0=55.6666666667 +lon_0=37.5 +x_0=0 +y_0=0 +k_0=1. +a=6377397 +rf=299.15 +towgs84=396,165,557.7,-0.05,0.04,0.01,0 +no_defs';
// const def_msk_50_2 = '+proj=tmerc +lat_0=55.66666666667 +lon_0=37.5 +k=1 +x_0=11.86143 +y_0=12.1761150 +ellps=bessel +towgs84=316.151,78.924,589.65,-1.57273,2.69209,2.34693,8.4507 +units=m +no_defs';
// 55.701476, 37.150170
// defs
// 23781.5108029271;-4987.34157225713/23783.2038999908;-4986.98543998535|23781.4645021949;-4987.40951105233/23781.7474999847;-4989.23129999695 -- event id 10110
// const point83 = [463310.99, 2166286.56]
// const point1 = [463355.99, 2166300.82]
// const point83 = [463329.97, 2166270.36] // 53.23532148843648 74.54367302696485

const point83 = [23781.5108029271, -4987.34157225713] // -- event id 10110 // 55.62158372332134 37.875739388170174
// const point83 = [-4987.34157225713, 23783.2038999908] // -- event id 10110  //Молодёжная улица, 7к1
// const point83 = [23783.2038999908, -4986.98543998535] // -- event id 10110 // 55.62158683968994 37.8757662923043 // Дзержинский

// let [resX, resY] = proj4(def_msk).defs([point83[0], point83[1]]);
// let [resX, resY] = proj4(def_msk).inverse([point83[0], point83[1]]);
let [resX, resY] = proj4(def_msk).inverse([point83[0], point83[1]]);
// 53.23484989776102 74.54385718041388 -- Михаил
console.log(' resY, resX ', resY,resX)
// console.log('resX, resY',resX, resY)
