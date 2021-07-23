import WKT from "terraformer-wkt-parser";
// import {isArray} from "lodash/lang";
import proj4 from "proj4";

const def_msk = '+proj=tmerc +lat_0=55.6666666667 +lon_0=37.5 +x_0=0 +y_0=0 +k_0=1. +a=6377397 +rf=299.15 +towgs84=396,165,557.7,-0.05,0.04,0.01,0 +no_defs';

const ddd = 'MULTIPOLYGON(((20148.3063 9402.6931,20148.0492 9402.7595,20141.5495 9404.4322,20139.8445 9404.8982,20136.1537 9389.5778,20134.5032 9382.727,20133.8304 9380.6173,20129.8603 9363.7365,20128.1383 9356.8525,20106.9182 9267.9565,20086.9091 9185.9148,20089.5448 9185.3559,20094.6233 9184.279,20094.6602 9184.4312,20100.3652 9183.0062,20104.733 9182.1174,20107.0619 9181.6434,20121.8047 9244.6153,20124.3741 9248.5513,20128.6321 9266.2775,20127.6686 9267.7681,20134.4079 9297.9892,20147.0861 9350.4644,20149.0006 9355.2148,20148.2133 9357.8786,20150.5247 9367.7173,20151.6983 9369.8688,20154.249 9383.5593,20155.1396 9387.4528,20158.9757 9399.9476,20154.8143 9401.0185,20150.7282 9384.687,20150.2431 9384.8084,20152.5033 9393.8461,20154.3646 9401.1342,20148.3063 9402.6931),(20139.2387 9391.2843,20141.193 9390.7777,20140.6239 9388.7286,20138.7142 9389.2148,20139.2387 9391.2843),(20128.7922 9347.1672,20133.4336 9346.3563,20130.9116 9335.6331,20126.0299 9335.9465,20128.7922 9347.1672),(20136.5422 9330.0583,20139.7754 9329.1871,20139.2765 9327.3472,20135.9332 9327.9303,20136.5422 9330.0583),(20116.7605 9290.1578,20115.3443 9290.7038,20122.4357 9321.92,20123.896 9321.241,20116.7605 9290.1578),(20131.4098 9308.7543,20134.6481 9307.8817,20133.6145 9303.5286,20130.197 9304.3496,20131.4098 9308.7543),(20114.2946 9278.966,20114.7789 9278.8418,20114.6547 9278.3575,20114.1704 9278.4817,20114.2946 9278.966),(20106.258 9247.8231,20104.7657 9248.1503,20108.8532 9265.1124,20110.1546 9264.3831,20106.258 9247.8231),(20120.3847 9263.8708,20123.8038 9263.0561,20120.6326 9249.3615,20117.0311 9250.1706,20120.3847 9263.8708),(20100.2369 9222.7266,20098.7219 9222.9007,20102.7822 9238.6871,20103.8773 9238.3368,20100.2369 9222.7266),(20096.9473 9215.34,20101.1265 9213.6809,20099.479 9206.9799,20095.2027 9207.4349,20096.9473 9215.34),(20112.8443 9233.0881,20116.2757 9232.2265,20114.7894 9223.9874,20110.9218 9225.1399,20112.8443 9233.0881),(20108.4943 9215.0575,20112.7096 9214.5952,20108.0034 9194.9219,20103.9921 9196.3965,20108.4943 9215.0575)(20033.1451 8951.2262,20033.9166 8954.2909,20041.0134 8952.5289,20040.3959 8949.4549,20046.6483 8947.735,20049.5782 8946.954,20050.7314 8952.8176,20065.3079 9015.5002,20065.6 9016.7058,20072.1929 9043.8647,20076.3149 9060.8446,20076.6786 9061.9402,20095.2762 9137.9264,20096.6727 9142.09,20104.518 9172.9286,20104.9685 9175.0075,20098.8227 9176.4729,20092.6114 9178.0627,20091.4106 9173.9748,20088.4597 9174.4665,20086.8149 9167.4323,20085.0244 9167.8781,20086.2452 9172.9735,20087.6877 9174.5961,20083.4483 9175.2926,20084.0254 9173.2647,20080.8368 9160.4679,20072.5744 9126.3351,20068.1582 9108.0866,20064.9835 9096.6299,20062.2842 9084.1511,20058.4309 9070.0517,20057.6093 9066.3547,20055.6321 9057.772,20054.1873 9051.8374,20053.3445 9048.0573,20047.2178 9020.6888,20043.6574 9005.7937,20040.0725 8992.012,20039.0232 8987.2014,20037.9321 8981.5467,20031.1438 8955.164,20029.494 8952.0934,20033.1451 8951.2262),(20086.1107 9164.4206,20079.5939 9136.5516,20077.8219 9137.0448,20081.4154 9152.5101,20081.9893 9154.5294,20084.3726 9164.8777,20086.1107 9164.4206),(20057.3041 9049.06,20057.7902 9048.9427,20057.6728 9048.4567,20057.1868 9048.574,20057.3041 9049.06),(20055.2906 9040.572,20055.7766 9040.4547,20055.6593 9039.9686,20055.1732 9040.086,20055.2906 9040.572)(20005.6483 8741.1232,20009.5873 8758.5421,20008.868 8758.7131,20007.9533 8758.9182,20009.7124 8766.1229,20011.9876 8775.4544,20012.5796 8777.8568,20013.33 8780.8587,20013.9975 8783.5285,20014.6721 8786.2855,20015.3845 8789.2571,20015.7154 8791.2402,20016.0545 8793.7609,20016.2262 8795.2713,20016.3646 8796.6538,20016.3863 8796.6597,20016.793 8796.5014,20017.0626 8796.5192,20016.3587 8807.1812,20015.91 8807.18,20016.1011 8810.5515,20016.4974 8818.2263,20017.5895 8825.2149,20020.0876 8835.5371,20022.972 8847.5471,20023.3284 8848.918,20045.5001 8940.9823,20038.8533 8942.5395,20038.0477 8939.413,20037.5351 8936.7778,20019.308 8861.3719,20013.1843 8862.8522,20031.5548 8938.6044,20028.616 8939.2359,20010.2692 8863.561,20006.0655 8864.5837,20000.9371 8843.5068,19987.4218 8787.6743,19985.2615 8782.5837,19988.3129 8781.8514,19988.9804 8779.1553,19987.731 8772.9821,19975.4476 8758.9302,19951.8642 8744.9759,19951.3801 8745.1275,19945.561 8740.6531,19945.2559 8740.2755,19945.6159 8740.0866,19940.9851 8734.1603,19939.1525 8727.3718,19938.287 8712.3034,19939.8957 8707.7584,19940.6698 8707.7795,19941.0925 8705.2472,19941.6806 8702.8037,19942.3705 8700.6435,19943.1357 8698.7383,19943.9493 8697.0599,19944.7842 8695.5799,19945.6128 8694.2701,19946.4082 8693.1018,19947.1527 8692.047,19947.8603 8691.0893,19948.5451 8690.2265,19949.2301 8689.4446,19949.9317 8688.7387,19950.6675 8688.102,19951.4546 8687.528,19952.3094 8687.0102,19953.2421 8686.5427,19954.2412 8686.1242,19955.2904 8685.754,19956.3738 8685.4316,19957.4755 8685.1566,19958.5792 8684.9289,19959.6691 8684.7483,19960.7288 8684.6147,19961.7458 8684.5273,19962.7213 8684.4818,19963.6606 8684.473,19964.5689 8684.4956,19965.4513 8684.5442,19966.3131 8684.6137,19967.1596 8684.6987,19967.9964 8684.794,19968.8299 8684.8965,19969.2014 8684.9476,19971.2846 8686.0099,19973.029 8686.5634,19974.1783 8686.9241,19975.8966 8687.8318,19977.4418 8688.6318,19978.3603 8689.1187,19979.8028 8690.2275,19980.5291 8690.791,19981.3336 8691.4306,19982.1516 8692.2396,19983.5565 8693.8048,19984.5079 8695.0196,19985.4835 8696.431,19986.3846 8698.2615,19987.0364 8699.7425,19987.7969 8701.6975,19988.2981 8703.1692,19989.2947 8707.4603,19988.6253 8707.6157,19988.9773 8708.9979,19989.7051 8711.3209,19990.3782 8713.0868,19990.6545 8713.7828,19991.008 8714.5079,19991.4749 8715.4655,19992.5984 8717.7698,19993.4821 8719.5823,19995.8221 8723.6539,19997.7349 8726.9542,19998.9836 8729.1564,20000.3568 8731.9552,20001.1197 8733.7253,20003.6509 8741.4488,20005.2798 8741.1833,20005.6483 8741.1232),(20012.0069 8857.9928,20018.127 8856.5134,20014.9152 8843.1846,20008.8208 8844.8589,20012.0069 8857.9928),(20007.9114 8841.1029,20013.8894 8839.3917,20008.781 8818.2113,20004.0228 8824.6775,20007.9114 8841.1029),(20003.3334 8821.8503,20008.0517 8815.5152,20001.1797 8787.2007,19994.9129 8787.5051,20003.3334 8821.8503),(20010.2157 8792.2429,20010.6943 8792.0981,20010.5495 8791.6195,20010.0709 8791.7643,20010.2157 8792.2429),(20005.3015 8770.7001,20005.7801 8770.5553,20005.6353 8770.0767,20005.1567 8770.2215,20005.3015 8770.7001),(20000.5292 8752.2877,20001.0078 8752.1429,20000.8629 8751.6643,20000.3844 8751.8091,20000.5292 8752.2877),(19989.6161 8749.9097,19992.5731 8751.9456,19991.6322 8748.9099,19990.9436 8749.9329,19990.215 8749.3863,19989.8585 8749.6897,19989.6161 8749.9097),(19986.083 8712.5815,19984.9283 8709.3272,19984.3245 8709.4887,19983.9397 8707.8582,19984.5547 8707.6842,19984.3778 8707.0633,19983.5934 8707.2971,19983.1787 8705.7019,19983.9191 8705.5184,19983.019 8702.5888,19981.1728 8698.4315,19980.9893 8698.5659,19979.9602 8697.4092,19980.1569 8697.2569,19977.5425 8694.6004,19972.6718 8691.4919,19972.5679 8691.858,19970.722 8691.2519,19970.8183 8690.7964,19968.1774 8690.1842,19965.1994 8689.914,19963.3246 8689.9977,19963.3718 8690.3899,19961.5858 8690.8245,19961.4554 8690.3408,19958.657 8691.0971,19956.8836 8691.6795,19955.1051 8692.5765,19953.1013 8694.034,19951.3829 8695.445,19950.6505 8696.5698,19949.8824 8696.0979,19948.1144 8698.6442,19945.9254 8703.5015,19945.4777 8708.0959,19946.0954 8708.1289,19945.9931 8710.3221,19945.3112 8710.2987,19945.1576 8712.1643,19945.5181 8715.9978,19946.5286 8719.1356,19947.1151 8718.7664,19948.3587 8720.4423,19947.6962 8721.016,19956.1901 8729.9167,19962.6869 8733.7248,19969.7342 8737.8554,19977.2415 8732.8513,19979.4803 8736.2752,19984.9289 8732.7125,19983.38 8730.119,19983.9544 8729.7792,19983.5129 8728.9122,19985.8053 8727.3806,19986.9033 8728.6613,19987.0969 8728.5265,19983.7561 8713.525,19986.083 8712.5815)))'

// let regx = /(-?\d+\.\d+\s)(-?\d+\.\d+)/gi;  // LINESTRING (m18.44, m35.22, m44.99)
// let regx2 = /(-?\d+\.\d+\s)(-?\d+\.\d+)/gi  // LINESTRING (m18.44, m35.22, m44.99)
let regx2 = /(\))\s?(\()/gi  // LINESTRING (m18.44, m35.22, m44.99)

let geoJson = (poly) => WKT.parse(poly)


let newPoly = ddd.replace(regx2, () =>  '),(' )

let geo = geoJson(newPoly)

const convert = (poly) => {
    // console.log(typeof poly )
    if(typeof poly !== 'object') return
    // console.log(typeof poly )
    if(poly.length === 2 && typeof poly[0] === 'number' ){
        let [resX, resY] = proj4(def_msk).inverse([poly[0], poly[1]]);
        poly[0] = resY
        poly[1] = resX
        // console.log('poly[0]',poly[0])

    }else if(poly.length === 2){
        console.log('polylength',poly[0])
        convert(poly[0])
        convert(poly[1])
    }else {
        for (let i = 0; i < poly.length; i++) {
        convert(poly[i])
        }
    }

    return poly
}

let res = convert(geo.coordinates[0])

// console.log('convertWT end', JSON.stringify(geo)) // {"type":"MultiPolygon","coordinates":[[[[20148.3063,9402.6931],[20148.0492,9402.7595],[20141.5495,9404.4322],[20139.8445,9404.8982],[2

let arr2 = [3,3]
console.log('arr2 type', typeof arr2[0])
console.log('arr2 length', arr2.length)

let arr3 = [[3,3],[3,3]]
console.log('arr3 type', typeof arr3[0])
console.log('arr3 length', arr3.length)