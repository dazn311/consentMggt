let words = ['banana', 'grepefruit', 'banana','orange','orange','orange','orange','grepefruit', 'banana','banana']
let uniqueItems = [...new Set(words)]

let tmpArr = []

uniqueItems.map((fruit,index) => { 
    if(index){
        let countFruitCurr = words.filter(fr => fr === fruit).length
        let countFruitLast = words.filter(fr => fr === uniqueItems[index -1]).length
        if (countFruitCurr > countFruitLast) {
            tmpArr = [fruit, ...tmpArr]
        }else {
            tmpArr = [ ...tmpArr,fruit]
        }

    }else {
        tmpArr.push(fruit)
    }
     
})

console.log(tmpArr);
// console.log([...new Set(words)]);