
export const refPhoneNumber = (tel) => {
    if (tel){
        let newTel = [];
        let newPhone = '';
        if ( tel.length > 13 && tel[0] === '8'){
            for(let t in tel){
                if( tel[t] === '0' || tel[t] === '1' || tel[t] === '2' || tel[t] === '3' || tel[t] === '4' || tel[t] === '5' || tel[t] === '6' || tel[t] === '7' || tel[t] === '8' || tel[t] === '9') {
                    newTel.push(tel[t])
                }
            }

            if(newTel.length === 11){
                newTel.shift()
                newPhone = '7 (' + newTel[0] + newTel[1] +newTel[2] + ') ' +newTel[3] +newTel[4] +newTel[5] + '-'+newTel[6] +newTel[7] + '-' +newTel[8] +newTel[9];
                return newPhone

            }

        }
    }
    return tel
}
