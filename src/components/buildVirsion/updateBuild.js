const fs = require('fs')
const path = require('path'),
      fileConfig = path.join(__dirname, 'buildVersion.js');


const formatDateISO = (data) => {
    let newDate = data || '2021-01-01T07:07:28.296Z';
    newDate = newDate.split('T');
    const dateArr = newDate[0].split('-');
    const timeArr = newDate[1].slice(0,5);

    return dateArr[2] + '.' + dateArr[1] + '.' + dateArr[0] + ' (' + timeArr + ')'
}
const formatDateISOLocale = (data) => {
    let newDate = data || '2021-01-01T07:07:28.296Z';

    let tzOffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    let localISOTime = (new Date(Date.now() - tzOffset)).toISOString();//.slice(0, -1);
    // => '2015-01-26T06:40:36.181'

    // console.log('tzOffset',tzOffset)
    // console.log('localISOTime',localISOTime)

    newDate = localISOTime.split('T');
    const dateArr = newDate[0].split('-');
    const timeArr = newDate[1].slice(0,5);

    return dateArr[2] + '.' + dateArr[1] + '.' + dateArr[0] + ' (' + timeArr + ')'
}


// WebPack.config File
// const fileConfig = './buildVersion.js'
// const fileConfig = 'node_modules/react-scripts/config/webpack.config.js'

    const sayHelloInEnglish = function () {
        return new Promise((resolve) => {
            fs.readFile(fileConfig, 'utf8', function (err, data) {
                if (err) {
                    return console.log(err)
                }
                resolve(data)
            })
        }).then((file) => {
            console.log('read file then')

            let CodeAsString = "Code as String to save"
            let newDate = formatDateISOLocale(new Date().toISOString());
            const contextBuild = `export const buildVersion = "${newDate}";`

            // let regexCode = /YourCodeRegex}/g

            // let result = file.replace(regexCode, CodeAsString)

            fs.writeFile(fileConfig, contextBuild, function (err) {
                if (err) return console.log(err)
                console.log('The buildVersion.js file was modifed!')
                return true
            })
        })
    }
    sayHelloInEnglish();


// export default sayHelloInEnglish
exports.seyH = sayHelloInEnglish