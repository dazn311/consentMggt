//"use strict";

// const { color } = require("d3");

 
// let words = ['banana', 'grepefruit', 'banana','orange','orange','orange','grepefruit', 'banana','banana']
// // let uniqueItems = [...new Set(words)]

// let uniqueItems = words.filter((v,i,a)=>a.indexOf(v)==i).map(fruit => {
//     return {f: fruit, c: words.filter(fr => fr === fruit).length }
// }).sort((a,b) => b.c - a.c).map(f => f.f);

// let uniqueItems2 = words.filter((v,i,a)=>a.indexOf(v)==i).map(fruit => {
//     return {f: fruit, c: words.filter(fr => fr === fruit).length }
// })

// console.log(Object.getOwnPropertyNames(uniqueItems2).sort((a,b) => b.c - a.c));
  
// console.log(uniqueItems); //[ 'banana', 'orange', 'grepefruit' ] 

////////////////////////////////////////////////////////////////
// let a = 5

// function f () {  
//     // var a = 10
//     if(a){
//         console.log('a',a);
//         var a = 10
//     }else{
//         console.log('a - undefined');
//     }
//     return a
// }

// console.log(f());

// const ff  = () => { 
//     if(a){
//         console.log('a',a);
//         // var a = 10
//     }else{
//         console.log('a - undefined');
//     }
// }

// ff();

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
//            console.log(test.a); 
//         }, 500)
        
//     }
// }

// test.say()

////////////////////////////////////////////////////////////////
// function list() {
//     // return Array.slice.call([1,3,5])
//     // console.log(arguments);
//     // console.log(arguments[1]);
//     return Array.prototype.slice.call(arguments);
//   }
  
//   var list1 = list('1', '2', '3'); // [1, 2, 3]
// console.log(list1);

////////////////////////////////////////////////////////////////
// let obj = {0: 3, 1:5, 2:25, 3:5}
// console.log('obj[2]',obj[2]);

// function list2(a) {
//     let sum = 0  
//     return function helper (a,b) {
//         if (b){
//             sum = a + b
//             return helper(sum)
//         }
//         return sum
       
//     } 
//   }
  
//   var list22 = list2(1)(2)(3); // [1, 2, 3]
// console.log(list22);

////////////////////////////////////////////////////////////////
// var obj = { a: 20, b: 30 };
// var propname = getPropName();  // возвращает "a" или "b"
// var result = obj[ propname ];  //  obj[ "a" ] то же, что и obj.a

// console.log(result);
// console.log(Object.getOwnPropertyNames(obj));

////////////////////////////////////////////////////////////////

// Не перечисляемое свойство
// var my_obj = Object.create({}, {
//     getFoo: {
//       value: function() { return this.foo; },
//       enumerable: false
//     },
//     myFunc: function() {  console.log('daz') },
//   });
//   my_obj.foo = 1;
//   my_obj.dazfoo = 1;
  
//   console.log(Object.getOwnPropertyNames(my_obj).sort()); // напечатает 'foo,getFoo'

////////////////////////////////////////////////////////////////

// var target = my_obj;
// var enum_and_nonenum = Object.getOwnPropertyNames(target);
// var enum_only = Object.keys(target);
// var nonenum_only = enum_and_nonenum.filter(function(key) {
//   var indexInEnum = enum_only.indexOf(key);
//   if (indexInEnum == -1) {
//     // если ключ не найден в массиве enum_only, значит ключ является не перечисляемым
//     // и нужно вернуть true, чтобы он попал в результирующий массив
//     return true;
//   } else {
//     return false;
//   }
// });

// console.log(enum_only);
// console.log(nonenum_only);

////////////////////////////////////////////////////////////////

// var dict = { "a": 1, "b": 2, "c": 3 };
// // Then you can update it like so

// dict.a = 23;
// // console.log(dict);
// // or

// dict["a"] = 27;
// // console.log(dict);
// // If you wan't to delete2 a particular key, it's as simple as:

// delete dict.a;
// console.log(dict);

////////////////////////////////////////////////////////////////

// var blah = ['Jan', 'Fed', 'Apr'];



// function reassign(array, index, newValue) {
//     array[index] = newValue;
//     return array;
// }

// reassign(blah, blah.length, 'Apr');
// reassign(blah, [2], 'Mar');

// console.log(blah);

////////////////////////////////////////////////////////////////

// let newObj = {32:'data32'}
// newObj[42] = 'data42'
// console.log(newObj);
// console.log(newObj[32]);
// console.log(newObj[33]);

// const original = [10,12,1,33];
// const copy = Object.assign([], original, { 2: 42 }); // [0,1,42,3]

// console.log(original);
// // [ 0, 1, 2, 3 ]

// console.log(copy);
// // [ 0, 1, 42, 3 ]

////////////////////////////////////////////////////////////////

// function makeIterator(array) {
//     var nextIndex = 0;  
//     return {
//       next: function() {
//         console.log("nextIndex", nextIndex);
//         return nextIndex < array.length
//           ? { value: array[nextIndex++], done: false }
//           : { done: true };
//       }
//     };
//   }
  
//   var it = makeIterator(["simple", "iterator"]);
  
//   console.log(it.next()); // {value: 'simple, done: false}
//   console.log(it.next()); // {value: 'iterator, done: false}
//   console.log(it.next()); // {done: true}

/////////////////////////////////////////////////////////////////

  // function* sample() {
  //   yield "simple";
  //   yield "generator";
  // }
  
  // var it = sample();
  
//   console.log(it.next()); // {value: 'simple, done: false}
//   console.log(it.next()); // {value: 'generator, done: false}
//   console.log(it.next()); // {value: undefined, done: true}

  ////////////////////////////////////////////////////////////////

//   var obj = { a: 20, b: 30 };
// var propname = Object.getOwnPropertyNames(obj);  // возвращает "a" или "b"

// eval( "var result = obj." + propname );

// console.log(result); ///ReferenceError: result is not defined

  ////////////////////////////////////////////////////////////////

  // let abs = 5
  // function logd (arg) {
  //     eval(`console.log("${arg}",${arg})`)
  // }
//   logd('abs')

  ////////////////////////////////////////////////////////////////
//   let x = 5;
// eval("x = 10");
// alert(x); // 10, значение изменено

  ////////////////////////////////////////////////////////////////

// напоминание: режим 'use strict' включён по умолчанию во всех исполняемых примерах

// eval("let x = 5; function f() {}");

// alert(typeof x); // undefined (нет такой переменной)
// функция f тоже невидима

//Без use strict у eval не будет отдельного лексического окружения, поэтому x и f будут видны из внешнего кода.

  ////////////////////////////////////////////////////////////////

//   let x = 1;
// {
//   let x = 5;
//   //eval(`console.log("${arg}",${arg})`)
//    window.eval('console.log(x)'); // 1 (глобальная переменная)
//    //ReferenceError: window is not defined
// }

  ////////////////////////////////////////////////////////////////

  //Если коду внутри eval нужны локальные переменные, 
  //поменяйте eval на new Function и передавайте необходимые данные как аргументы:

    // let x2 = 5;
    // let f = new Function('a', 'console.log(a)');

    // f(x2); // 5
    // logd('x2')

  ////////////////////////////////////////////////////////////////

//   let expr = prompt("Введите арифметическое выражение:", '2*3+2');

//     alert( eval(expr) );

  ////////////////////////////////////////////////////////////////

//   let tag = prompt("Какой тег вы хотите найти?", "h2");

// let regexp = new RegExp(`<${tag}>`); // то же, что /<h2>/  при ответе "h2" на prompt выше


  ////////////////////////////////////////////////////////////////
    // let str = "Любо, братцы, любо!";

    // let res = str.match(/любо/i)
    // console.log( res.index ); 
    // console.log( res.input ); 
    // console.log( res.length ); 
  ////////////////////////////////////////////////////////////////

  // const scopedEval = (scope, script) => Function(`"use strict"; ${script}`).bind(scope)();

  // let tmp = scopedEval({a:1,b:2},"return this.a+this.b")
  // console.log( tmp ); 

  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////

//   function* favBeer() {
//     const reply = yield "What is your favorite type of beer?";
//     console.log('reply',reply);
//     if (reply !== "ipa") return "No soup for you!";
//     return "OK, soup.";
//   }
  
//   {
//     const it = favBeer();
//     const q = it.next().value; // Итератор задаёт вопрос
//     console.log(q);
//     const a = it.next("ipa").value; // Получен ответ на вопрос
//     console.log(a);
//   }




////////////// test ////////////////////////////////////////
// (function(){
//   // logd('typeof arguments')
//   return typeof arguments;
// })();

// "object" -v
// - "array"
// "arguments"
// "undefined"

////////////// test ////////////////////////////////////////
// var f = function g(){ return 23; };
// typeof g(); 

  // - "number"
//  "undefined" 
//  "function"
//  Error -v
////////////// test ////////////////////////////////////////

// console.log((function(x){
//   delete x;
//   return x;
// })(1));

//  1 -v
//  null
// - undefined
//  Error
////////////// test ////////////////////////////////////////
// var y = 1, x = y = typeof x;
//   logd('x');

//   1
//  "number"
//  undefined
// - "undefined" -v

////////////// test ////////////////////////////////////////
// (function f(f){
//   console.log(typeof f()); 
//   return typeof f();
// })(function(){ return 1; });

// - "number" -v
//  "undefined"
//  "function"
//  Error

////////////// test ////////////////////////////////////////
// "use strict";
// var foo = {
//   bar: function() { return this.baz; },
//   baz: 1
// };
// (function(){
//   console.log(typeof arguments[0]());
//   return typeof arguments[0]();
// })(foo.bar);

// "undefined" -v
//  "object"
//  "number"
//  - "function"


////////////// test ////////////////////////////////////////

// var foo = {
//   bar: function(){ return this.baz; },
//   baz: 1
// }
// typeof (f = foo.bar)();

// "undefined" -v
// "object"
// "number"
// "function"
////////////// test ////////////////////////////////////////
// var f = (function f(){ return "1"; }, function g(){ return 2; })();
//   typeof f;
//   console.log(typeof f);
//   console.log( f);
////////////// test ////////////////////////////////////////

  // var x = 1;
  // if (function f(){}) {
  //   x += typeof f;
  // }
  // x;
  // console.log( x);
  //   1
//  - "1function" -(good if using node.js v0.6.6)
//  "1undefined" -v
//  NaN

  // var x = 1;
  
  // if (a = function f(){}) {
  //   x += typeof a;
  // }
  // x;
  // console.log( x); //1function

  // var x = 1;
  // function f(){}
  // if (true) {
  //   x += typeof f;
  // }
  // x;
  // console.log( x); //1function



////////////// test ////////////////////////////////////////

// var x = [typeof x, typeof y][1];
// var y;
//   typeof typeof x; 
//   console.log( typeof typeof x);
//   console.log( typeof typeof y);

////////////// test ////////////////////////////////////////

// (function(foo){
//   console.log(typeof foo.bar);
//   return typeof foo.bar;
// })({ foo: { bar: 1 } });

// "undefined" -v
//  "object"
//  - "number"
//  Error


////////////// test ////////////////////////////////////////

// (function f(){
//   function f(){ return 1; } 
//   return f();
//   function f(){ return 2; }
// })();
 

//  - 1
//  2 -v
//  Error (e.g. "Too much recursion")
//  undefined

////////////// test ////////////////////////////////////////

// function f(){ return f; }
//   console.log(new f() instanceof f);

//true
//  false

////////////// test ////////////////////////////////////////
// with (function(x, undefined){}) length 

//  1
//  2 -v
// - undefined
//  Error
////////////// test ////////////////////////////////////////
// var obj = {
//   weight: 10
// };

// with(obj) {
//   weight = 20; // (1)
//   size = 35; // (2)
// }

// console.log( obj.weight );
// console.log( obj );

// console.log( obj.size );
// console.log( window.size ); 
// console.log( window.size );

////////////// test ////////////////////////////////////////

// You've got 8 answers wrong (#1, #2, #3, #6, #9, #11, #12, #14).
// That's more than a half :(

////////////// test //////////////////////////////////////// 
//////////////  //////////////////////////////////////// 

// let obj77 = {name: 'rrr', age: 24, varDate: 33}
// console.log(obj77); // { name: 'rrr', age: 24, varDate: 33 }
// delete obj77.varDate
// console.log(obj77); // { name: 'rrr', age: 24 }

//////////////  //////////////////////////////////////// 

  // var x = 1;
  // delete x; // false
  // x; // 1

  // function x(){}
  // delete x; // false
  // typeof x; // "function"

  // let aTest = 33;
  // var bTest = 31;
  // console.log(this);
  // this.newData = 25;
  // console.log(this);

  // "use strict";
// var GLOBAL_OBJECT = this;

// var foo = 1;
// eval('var foo = 1;');

// GLOBAL_OBJECT.foo;  
// console.log(foo === GLOBAL_OBJECT.foo)  // false
// console.log( GLOBAL_OBJECT.foo)  // undefined 
// console.log( GLOBAL_OBJECT)  // {} 

////////////////////////////////////////////////////////////////
// var foo = 1;

// delete foo; // false
// typeof foo; // "number"

// console.log( typeof foo)  // number
// console.log( foo)  // 1

//////////////  //////////////////////////////////////// 

// let newObj345 = {color: 'red', heigth: 100, '23': {data: 30}}
// newObj345.width = 144;
// delete newObj345.heigth
// console.log(newObj345); // { color: 'red', width: 144 }
// console.log(newObj345.width); //144
// console.log(newObj345['color']); //red
// let idObj = 23;
// idObj = idObj.toString()
// console.log(newObj345[idObj]); //red


//////////////  //////////////////////////////////////// 
// const newF = () => {
//   // let w = 13;
//   // var h = 44;
//   console.log('path',arguments[2].path); //newFF /Users/daz/Documents/GitHub/modulSoglasovania
//   console.log('filename',arguments[2].filename); //filename '/Users/daz/Documents/GitHub/modulSoglasovania/testJs2.js'
//   console.log('filename',arguments); //filename '/Users/daz/Documents/GitHub/modulSoglasovania/testJs2.js'

// }
// newF(2,5)
// console.log(newF.length);//0

//////////////  //////////////////////////////////////// 

// function newF2() {
//   // let w = 13;
//   // var h = 44;
//   arguments[1] = 'new value'
//   const args = [...arguments];
//   const args2 = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
//   console.log( 'args',args); // [ 2, 'new value' ]
//   console.log( 'args2',args2); // [ 2, 'new value' ]
//   console.log( arguments.length); // 2
//   console.log( arguments[0]); // 2
//   console.log( arguments[1]); //'new value'

// }

// newF2(2,5)
// console.log(newF2.length); //0

/////////////////////////////////////////////////////////////

// function bar(a=1) {
//   arguments[0] = 100;
//   return a;
// }
// bar(10); // 10

// //////////////////////

// function zoo(a) {
//   arguments[0] = 100;
//   return a;
// }
// zoo(10); // 100

///////////////////////////////////////////////////////////////////////

// function func(a, b) {
//   arguments[0] = 90;
//   arguments[1] = 99;
//   console.log(a + " " + b);
// }

// func(1, 2); //90, 99

///////////////////////////////////////////////////////////////////////

// let newArr73737 = [2,3,5,6,7]

// let arr = newArr73737.map(ar => ar = 5)

// console.log(arr);
// console.log(newArr73737);
///////////////////////////////////////////////////////////////////////

// for (let i =0; i < 5; i++){
//   setTimeout(() => {
//    console.log(i); // let - 0,1,2,3,4 // var - 5,5,5,5,5
//   });
// }
///////////////////////////////////////////////////////////////////////

// function sum(num) {

//   return function sum2(num2 ) {
//       num += num2

//       console.log(num)
//       return sum2
//   }
// }
//-----
// function sum(number) {
//   const old_number = this.sum || 0
//   this.sum = number + old_number

//   console.log(this.sum)

//   return sum
// }
//-----
// function sum(n) {
//   console.log(n)
//   return b => sum(n + b);
// }

// sum(1)(2)(4)(4)(4)(74)


///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

// function calc(arr) {
//   let items = arr.splice(0, arr.indexOf(Math.max(...arr)) + 1);
//   return (
//     items.reduce(
//       (acc, item, i) =>
//         i < items.length - 1
//           ? { count: acc.count + 1, total: acc.total - item }
//           : { count: 0, total: acc.total + acc.count * item },
//       {
//         count: 0,
//         total: 0
//       }
//     ).total + (arr.length > 0 ? calc(arr) : 0)
//   );
// }

// console.log(calc([1, 2, 3, 4, 5, 6])); //15
// console.log(calc([6, 5, 4, 3, 2, 1])); //0
// console.log(calc([1, 6, 5, 10, 8, 7])); //18
// console.log(calc([1, 2, 10, 2, 4, 6])); //23

///////////////////////////////////////////////////////////////////////


let words = ['banana', 'grepefruit', 'banana','orange','orange','orange','grepefruit', 'banana','banana']
// let uniqueItems = [...new Set(words)]

let uniqueItems = words.filter((v,i,a)=>a.indexOf(v)==i).map(fruit => {
    return {f: fruit, c: words.filter(fr => fr === fruit).length }
}).sort((a,b) => b.c - a.c).map(f => f.f);

let uniqueItems2 = words.filter((v,i,a)=>a.indexOf(v)==i).map(fruit => {
    return {f: fruit, c: words.filter(fr => fr === fruit).length }
})

// console.log(Object.getOwnPropertyNames(uniqueItems2).sort((a,b) => b.c - a.c));
  
console.log(uniqueItems); //[ 'banana', 'orange', 'grepefruit' ] 

function unicSort(anyWords) { 
  if(anyWords.length < 1){ return null  }
  let wordObj = {} // {'banana': 0++}  

  for (const word of anyWords) { 
    if(wordObj[word]) {
      wordObj[word] = wordObj[word] + 1 
    }else { 
      wordObj[word] = 1 
    } 
  } 
  return wordObj
}

Object.entries(unicSort(words))
.sort((a,b) => b[1] - a[1])
.map(f => console.log(f[0]))

///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////