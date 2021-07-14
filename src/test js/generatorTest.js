//
// function fakeFetch (url, params='-') {
//     // этот вывод в консоль покажет порядок вызовов с их входящими параметрами
//     console.log(`fakeFetch to: ${url} with params: ${params}`);
//     return new Promise(resolve => {
//         setTimeout(() => resolve(`${url} is DONE`), 1000);
//     })
// };
//
// const urls = ['url1', 'url2', 'url3'];
//
//
//
// function generatorWay(callback) {
//     function* generateSequence() {
//         let results;
//         for (let i = 0; i < urls.length; i++) {
//             results = yield fakeFetch(urls[i], results);
//         }
//         return results;
//     }
//     function execute(generator, yieldValue) {
//         let next = generator.next(yieldValue);
//         if (!next.done) {
//             return next.value
//                 .then(result => execute(generator, result));
//         } else {
//             callback(next.value);
//         }
//     }
//     execute(generateSequence())
// }


function* generateSequence(start, end) {
    for (let i = start; i <= end; i++) yield i;
}

function* generateAlphaNum() {

    // 0..9
    yield* generateSequence(48, 57);

    // A..Z
    yield* generateSequence(65, 90);

    // a..z
    yield* generateSequence(97, 122);

}

let str = '';

for(let code of generateAlphaNum()) {
    str += String.fromCharCode(code);
}

console.log(str); // 0..9A..Za..z