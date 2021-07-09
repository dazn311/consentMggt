import proj4 from 'proj4';
import WKT from "terraformer-wkt-parser";
import memoize from "lodash/memoize";

const def_msk = '+proj=tmerc +lat_0=55.6666666667 +lon_0=37.5 +x_0=0 +y_0=0 +k_0=1. +a=6377397 +rf=299.15 +towgs84=396,165,557.7,-0.05,0.04,0.01,0 +no_defs';

let geoJson = (poly) => WKT.parse(poly)

function convertToProj4 (strX, strY) {
    try {
            let [resX, resY] = proj4(def_msk).inverse([parseFloat(strX), parseFloat(strY)]);
            return {resX, resY}
    } catch (e) {
        console.log('ошибка парсинга координат')
        return null

    }
}

export const convertWT = memoize((multiPolGeo) => {
    console.log('convertWT memoize')
    let lastChar = ''
        , strX = ''
        , strY = ''
        , keyX = true

        , multiPol = multiPolGeo.replace(')(', '),(')


    const bracket = [].map.call(multiPol, (charElement, index) => {
        switch (charElement) {
            case '(':
                strX = '';
                strY = '';
                keyX = true;

                if (index > 5) {
                    if (lastChar === ')') {
                        lastChar = charElement
                        return ',('
                    } else {
                        lastChar = charElement
                        return charElement
                    }
                }
                lastChar = charElement
                return charElement
            case ')':
                keyX = true
                if (strX === '') {
                    return ')'
                }
                let resXtmp1 = 0, resYtmp1 = 0

                    if (strX !== '') {
                        let resConvert = convertToProj4( parseFloat(strX), parseFloat(strY) );
                        if(resConvert){
                            resXtmp1 = resConvert.resY
                            resYtmp1 = resConvert.resX

                            strX = ''
                            strY = ''
                            lastChar = charElement
                            return   `${resXtmp1} ${resYtmp1})`
                        }else {
                            strX = ''
                            strY = ''
                            lastChar = charElement
                            return ')'
                        }
                    }
                return ''
            case ',':
                keyX = true
                if (strX === '') {
                    lastChar = charElement
                    return ','
                }

                let resXtmp = 0, resYtmp = 0

                    if (strX !== '') {
                        let resConvert2 = convertToProj4( parseFloat(strX), parseFloat(strY) );
                        if(resConvert2){
                            resXtmp = resConvert2.resY + 0.0001
                            resYtmp = resConvert2.resX

                            strX = ''
                            strY = ''
                            lastChar = charElement
                            return  `${resXtmp} ${resYtmp},`
                        }else {
                            strX = ''
                            strY = ''
                            lastChar = charElement
                            return  ','
                        }
                    }
                return ''
            case ' ':
                keyX = false;
                lastChar = charElement;
                return ' '
            default:
                if ('-0123456789.'.includes(charElement)) {
                    lastChar = charElement

                    if (keyX) {
                        strX += charElement
                    } else {
                        strY += charElement
                    }
                } else {
                    lastChar = charElement
                    return charElement
                }
                break
        }
    }).join('')

    return geoJson(bracket)
}) // end memoize
