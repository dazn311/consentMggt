//"use strict";
// let words = ['banana', 'grapefruit', 'banana','orange','plum','orange','plum','orange','plum','orange','plum','orange','orange','grapefruit','plum', 'banana','banana', 'banana','banana', 'banana','banana']
// //   va5
// const moveLeft = (word, idx, wArr,wAmArr) => {
//     let lastWord = wArr[idx -1];
//     let lastAmount = wAmArr[idx -1]
//
//     wArr[idx -1] = word
//     wArr[idx] = lastWord;
//
//     wAmArr[idx -1] = wAmArr[idx] + 1 ;
//     wAmArr[idx] = lastAmount;
//
//     return {wArr, wAmArr}
// }
// const moveRigth = (word, idx, wArr,wAmArr) => {
//     let nextWord = wArr[idx +1];
//     let nextAmount = wAmArr[idx +1];
//
//     wArr[idx +1] = word
//     wArr[idx] = nextWord;
//
//
//     wAmArr[idx +1] = wAmArr[idx] + 1;
//     wAmArr[idx] = nextAmount;
//
//     return {wArr, wAmArr}
// }
// //-------------------------------------
// function unicSort(anyWords) {
//     let wordArr = []
//     let wordAmountArr = []
//     for (const word of anyWords) {
//         let idx = wordArr.indexOf(word);
//         if(idx < 0){
//             wordArr.push(word);
//             wordAmountArr.push(1);
//         }
//         else if(idx === 0){
//             let newAmount = wordAmountArr[idx] + 1 // for one fruit
//             let nextAmount = wordAmountArr[idx +1]
//
//             if(nextAmount > newAmount){
//                 if (idx < wordArr.length -1){
//                     let {wArr, wAmArr} = moveRigth(word,idx,wordArr,wordAmountArr)
//                     wordArr = wArr
//                     wordAmountArr = wAmArr
//                 }
//
//             }else{
//                 wordAmountArr[idx] = wordAmountArr[idx] + 1
//             }
//
//         }else if(idx > 0){
//             let newAmount = wordAmountArr[idx] + 1 // for one fruit
//             let lastAmount = wordAmountArr[idx -1]
//             if(lastAmount < newAmount){
//                 let {wArr, wAmArr} = moveLeft(word,idx,wordArr,wordAmountArr)
//                 wordArr = wArr
//                 wordAmountArr = wAmArr
//             }else{
//                 if (idx < wordArr.length -1){
//                     let {wArr, wAmArr} = moveRigth(word, idx, wordArr, wordAmountArr)
//                     wordArr = wArr
//                     wordAmountArr = wAmArr
//                 }else{
//                     wordAmountArr[idx] = wordAmountArr[idx] + 1
//                 }
//             }
//         }
//     }
//     console.log(wordArr, wordAmountArr) // [ 'banana', 'orange', 'plum', 'grapefruit' ] [ 8, 6, 5, 2 ]
//     return wordArr
//   }
//   unicSort(words)
//[Done] exited with code=0 in 0.07 seconds

/////////////////////////////////
//   let words = ['banana', 'grapefruit', 'banana','orange','plum','orange','plum','orange','plum','orange','plum','orange','orange','grapefruit','plum', 'banana','banana'] 
// //   va4
// function unicSort(anyWords) {   
//     let wordMap = new Map()
//     let maxValue = 0
//     let newValue = 0
//     for (const word of anyWords) {  
//         if(wordMap.has(word)){
//             newValue = wordMap.get(word) + 1;
//             if(maxValue < newValue){
//                 wordMap.delete(word) 
//                 let tmpMap = new Map()
//                 tmpMap.set(word, newValue) 
//                 const merged = new Map([...tmpMap, ...wordMap]); 
//                 wordMap = merged
//                 // wordMap.set(word, newValue) 
//             }else{
//                 wordMap.set(word, newValue) 
//             }
//             maxValue = maxValue < newValue ? newValue : maxValue 
//         }else{ wordMap.set(word,  1)} 
//     }   
//     // console.log(wordMap) //{ 'orange' => 6, 'banana' => 4, 'grapefruit' => 2, 'plum' => 5 }
//     for (const word of wordMap) { 
//         console.log(word[0])
//     }
//     return wordMap 
//   }
//   unicSort(words)
//[Done] exited with code=0 in 0.07 seconds

/////////////////////////////////
//   va3
// function unicSort(anyWords) {   
//     let wordMap = new Map()
//     let maxValue = 0
//     let newValue = 0
//     for (const word of anyWords) {  
//         if(wordMap.has(word)){
//             newValue = wordMap.get(word) + 1;
//             if(maxValue < newValue){
//                 wordMap.delete(word)
//                 wordMap.set(word, newValue) 
//             }else{
//                 wordMap.set(word, newValue) 
//             }
//             maxValue = maxValue < newValue ? newValue : maxValue 
//         }else{ wordMap.set(word,  1)}
//         // console.log(wordMap)
//     }  
//     const inv = [...wordMap].reverse()   
//     for (let key of inv.values()) {
//         console.log(key[0]);
//     } 
//     return wordMap //{ banana: 4, grepefruit: 2, orange: 3 }
//   }
//   unicSort(words)


////////////////////////////
//   va1
// function unicSort(anyWords) {  
//   let wordObj = {} 
//   for (const word of anyWords) { 
//     wordObj[word] = wordObj[word] ? wordObj[word] + 1 : 1
//     console.log(wordObj)
//   } 

//   return wordObj //{ banana: 4, grepefruit: 2, orange: 3 }
// }
// let fruits = Object.entries(unicSort(words))
// .sort((a,b) => b[1] - a[1])
// .map(f => f[0])
// console.log(fruits)
// //[ 'banana', 'orange', 'grepefruit' ]
// // [Done] exited with code=0 in 0.048 seconds

//////////////////
//   va2
// let words = ['banana', 'grepefruit', 'banana','orange','orange','orange','grepefruit', 'banana','banana'] 

// let uniqueItems = words.filter((v,i,a)=>a.indexOf(v)==i).map(fruit => {
//     return {f: fruit, c: words.filter(fr => fr === fruit).length }
// }).sort((a,b) => b.c - a.c).map(f => f.f);
// console.log(uniqueItems);
// [ 'banana', 'orange', 'grepefruit' ]
// [Done] exited with code=0 in 0.437 seconds

// [ 'banana', 'orange', 'grepefruit' ]
// [Done] exited with code=0 in 0.071 seconds

//////////////////////////////////////////////////////////////////////////////////////////////
// const calc = (arr) => {
//     const iter = (acc, [head, ...rest]) => {
//         if (rest.length === 0) { return acc}
//         const max = Math.max(...rest)
//         return  iter(max > head ? acc + (max - head) : acc, rest)
//     }
//     return iter(0, arr)
// }
//
// console.log(calc([1,6,5,10,8,7]));  // 18


//////////////////////////////////////////////////////////////////////////////////////////////
// let pConstructor = function (name, age) {
//     this.name = name
//     this.age = age
//
//     this.printPerson = function () {
//         console.log(this.name, this.age, this.city)
//     }
//
//         pConstructor.prototype.city = 'London'
// }
//
// let person1 = new pConstructor('John', 23)
//
// // person1.city = 'Moscow'
// person1.printPerson()
//
// console.log(person1.hasOwnProperty('city')) // true || false if not person1.city = 'Moscow'
//
// if ('city' in person1) {
//     console.log('city' in person1) // true
// }
// console.log(person1) //object

//////////////////////////////////////////////////////////////////////////////////////////////
// let pConstructorObj =  {
//     name: 'new name',
//     age: '0 age',
//
//     printPerson : function () {
//         console.log(this.name, this.age, this.city)
//     }
//
// }
// pConstructorObj.city = 'city offline'
// pConstructorObj.printPerson()
//
// console.log(pConstructorObj.hasOwnProperty('city')) // true

//////////////////////////////////////////////////////////////////////////////////////////////
// var firstName = 'daz'
//
// let a = {
//     firstName: 'Alex',
//     sayName: function (){
//         console.log(this.firstName)
//     }
// }
// let b = {
//     firstName: 'Vasiliy'
// }
// b.sayName = a.sayName
// b.sayName() //Vasiliy
//
// window.c = a.sayName
// // let c = a.sayName
// window.c() //undefined

//////////////////////////////////////////////////////////////////////////////////////////////
// "use strict"
//
// function LateBloomer() {
//     console.log('LateBloomer start')
//     this.petalCount = Math.ceil(Math.random() * 12) + 1;
// }
//
// LateBloomer.prototype.declare = function (txt) {
//     // this.petalCount = 'test';
//     console.log('Я прекрасный цветок с ' +
//         this.petalCount + ` ${txt} ` + ' лепестками!');
// };
// // Объявляем цветение с задержкой в 1 секунду
// LateBloomer.prototype.bloom = function () {
//     let txt = 'sex'
//     console.log('bloom start', this)
//     // setTimeout(
//     let decBind = this.declare.bind(this, txt);
//     // , 1000);
//     decBind();
// };
//
// // setTimeout( () => { LateBloomer.prototype.bloom()}, 2000);
// let late = new LateBloomer();
// late.bloom();
// LateBloomer.prototype.bloom();
// LateBloomer.prototype.declare();

//////////////////////////////////////////////////////////////////////////////////////////////
//
// var a = 5
//
// function f() {
//     if(a){
//         console.log('f - a2',a) // 5 if not last var a
//         // var a = 10;
//     }
// }
// f()
//
// const f2 = () => {
//     if(a){
//         console.log('f2 - a2',a) // 5 if not last var a
//         // var a = 10;
//     }
// }
// f2()

//////////////////////////////////////////////////////////////////////////////////////////////

// let inc = (function ()  {
//     let counter = 0
//     return function () { return  counter++}
// })()
// console.log(inc()) // 1
// console.log(inc()) // 2
// console.log(inc()) // 3

//-- -- -- -- - - - - -- -- --//
// function Counter()  {
//     let counter = 0
//     return function () {
//         return  ++counter}
// }
// let incN = new Counter()
//
// console.log(incN()) // 1
// console.log(incN()) // 2
// console.log(incN()) // 3

//-- -- -- -- - - - - -- -- --//
// function Counter2()  {
//     let counter = 0
//     return function () {
//         return  ++counter}
// }
// let incN =  Counter2()
//
// console.log(incN()) // 1
// console.log(incN()) // 2
// console.log(incN()) // 3
//-- -- -- -- - - - - -- -- --//
// function Counter2()  {
//     let counter = 0
//     return  () => {  return  ++counter}
// }
// let incN =  Counter2()
// let incN2 =  Counter2()
//
// console.log(incN === incN2) // false
//
// console.log(incN()) // 1
// console.log(incN()) // 2
// console.log(incN()) // 3
//
// console.log(incN2()) // 1
// console.log(incN2()) // 2
// console.log(incN2()) // 3
// console.log(incN2()) // 4
//
// console.log(Counter2()) // Function (anonymous)
// console.log(Counter2()()) // 1
// console.log(Counter2()()) // 1
// console.log(Counter2()()) // 1


//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
