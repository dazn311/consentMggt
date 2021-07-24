let words = ['banana', 'grepefruit', 'banana', 'orange', 'orange', 'orange', 'grepefruit', 'banana', 'banana']

function mergeSort(array) {
    if (array.length > 1) {
        let mid = Math.floor(array.length / 2),
            leftHalf = array.slice(0, mid),
            rightHalf = array.slice(mid);

        mergeSort(leftHalf)
        mergeSort(rightHalf)

        let i = 0, j = 0, k = 0
        while (i < leftHalf.length && j < rightHalf.length) {
            if (leftHalf[i] < rightHalf[j]) {
                array[k] = leftHalf[i]
                i++;
            } else {
                array[k] = rightHalf[j]
                j++
            }
            k++
        }
        while (i < leftHalf.length) {
            array[k] = leftHalf[i]
            i++
            k++
        }
        while (j < rightHalf.length) {
            array[k] = rightHalf[j]
            j++
            k++
        }
    }
    return array
}

let resSort = mergeSort(words)
console.log(resSort)