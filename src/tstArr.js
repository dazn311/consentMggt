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


console.log(polygon.length);

for (let i of polygon ) {
    console.log(i)
}
