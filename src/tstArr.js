// import  '../public/libs/wkt-parser'
let arrayD = [1,2,3]

arrayD[1] = 8

// console.log(arrayD)

arrayD[100] = 800

// console.log(arrayD)
// console.log('arrayD.length',arrayD.length)
// console.log('arrayD[4]',arrayD[4])
//====

const polygon = "POLYGON((-49 52,123 52,123 -4,-49 -4,-49 52))"
let polygonWithError = "POLYGON((-49 52,123 52,123 -4,-49 -4,-49 52)(-23 52,123 52,123 -4,-49 -4,-49 22))"
polygonWithError = polygonWithError.replace(')(','),(')
// let newP = polygonWithError.replace(')(','),(')

// polygonWithError = polygonWithError.split('').map(el => {
//return el = '-' ? '*' : el
// })

// polygonWithError = polygonWithError.split('').forEach(el => {
//     return el = '-' ? '*' : el
// })

// [...polygonWithError].map(el => el = '*' ? '-': el)


// console.log(polygonWithError.length);
// console.log(newP.length);
console.log(polygonWithError );
// console.log(newP );

// for (let i of polygon ) {
//     console.log(i)
// }


console.log('Date.now()',Date.now())