import proj4 from 'proj4';
import WKT from "terraformer-wkt-parser";

const def_msk = '+proj=tmerc +lat_0=55.6666666667 +lon_0=37.5 +x_0=0 +y_0=0 +k_0=1. +a=6377397 +rf=299.15 +towgs84=396,165,557.7,-0.05,0.04,0.01,0 +no_defs';

let geoJson = (poly) => WKT.parse(poly)
 
export const convertWT = (multPolGeo) => {

    let lastChar = ''
    let amCommaErr = 0
    let strX = ''
    let strY = ''
    let keyX = true

    let multiPol = multPolGeo.replace(')(','),(')

    const brackets = [].map.call(multiPol, (char, index) => {
        switch (char) {
            case '(':
                strX = ''
                strY = ''
                keyX = true


                // Error: Unable to parse: Error: Parse error on line 1:
                // ...5 37.81583687820472)(55.74557433595146 3
                // -----------------------^
                // Expecting 'COMMA', ')', got '('
                if(index > 5) {
                    if(lastChar === ')' ){
                        lastChar = char
                        ++amCommaErr

                        return ',('
                    }else {
                        lastChar = char
                        return char
                    }
                }
                lastChar = char
                return char
            case ')':
                keyX = true
                if (strX === '') {
                    return ')'
                }
                let resXtmp1 = 0, resYtmp1 = 0
                try {
                    if (strX !== '') {
                        let [resX, resY] = proj4(def_msk).inverse([parseFloat(strX), parseFloat(strY)]);
                        resXtmp1 = resY
                        resYtmp1 = resX
                    }

                } catch (e) {
                    console.log('ошибка парсинга координат')
                }
                strX = ''
                strY = ''
                lastChar = char
                return resXtmp1 ? `${resXtmp1} ${resYtmp1})` : ')'
            case ',':
                keyX = true
                if (strX === '') {
                    lastChar = char
                    return ','
                }

                let resXtmp = 0, resYtmp = 0
                try {
                    if (strX !== '') {
                        let [resX, resY] = proj4(def_msk).inverse([parseFloat(strX), parseFloat(strY)]);
                        resXtmp = resY + 0.0001
                        resYtmp = resX
                    }

                } catch (e) {
                    console.log('ошибка парсинга координат2', strX, strY)
                }
                strX = ''
                strY = ''
                lastChar = char
                return resXtmp ? `${resXtmp} ${resYtmp},` : ','
            case ' ':
                keyX = false
                lastChar = char
                // console.log('1717 case lastChar', lastChar)
                return ' '
            default:
                if ('-0123456789.'.includes(char)) {
                    // x += 1
                    lastChar = char
                    if (keyX) {
                        strX += char
                    } else {
                        strY += char
                    }
                } else {
                    lastChar = char
                    return char
                }
                break
        }
    }).join('')
    // console.log('brackets.length', brackets.length)
    if(amCommaErr){
        console.log('error Expecting COMMA, ), got (', amCommaErr)
    }

    return geoJson(brackets)
}
