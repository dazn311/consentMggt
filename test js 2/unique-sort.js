let words = ['banana', 'grepefruit', 'banana', 'orange', 'orange', 'orange', 'orange', 'grepefruit', 'banana', 'banana']
let uniqueItems = [...new Set(words)]

let tmpArr = []

uniqueItems.map((fruit, index) => {
    if (index) {
        let countFruitCurr = words.filter(fr => fr === fruit).length
        let countFruitLast = words.filter(fr => fr === uniqueItems[index - 1]).length
        if (countFruitCurr > countFruitLast) {
            tmpArr = [fruit, ...tmpArr]
        } else {
            tmpArr = [...tmpArr, fruit]
        }

    } else {
        tmpArr.push(fruit)
    }

})

// console.log(uniqueItems);
// console.log(tmpArr);
// console.log([...new Set(words)]);

////////////////////////////////////////////////////////////////
// const test = {
//     a: 45,
//     say: function () {
//         setTimeout(() => {
//            console.log(this.a);
//         }, 500)
//     }
// }

// const test = {
//     a: 45,
//     say: function () {
//         setTimeout( function ()  {
//            console.log(this.a); //undefined
//            console.log(test.a); //45
//         }, 500)
//
//     }
// }
//
// test.say()

///////////////////////////////////////////////////////////////

// function list2(a) {
//     let sum = a
//     return function helper(b) {
//         console.log(b)
//         if (b) {
//             sum = b + sum
//             return helper(sum)
//         }
//         return sum
//
//     }
// }
//
// let list22 = list2(1)(2)(3); // [1, 2, 3]
// console.log(list22);


function sum(num) {
    let result = num;
    console.log(result);

    return function(num2) {
        return sum(result + num2);
    };
}
// let sumValue = 1
sum(1)(2)(4)(4)(4)(74)