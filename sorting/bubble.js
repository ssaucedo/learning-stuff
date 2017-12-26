const c = a => console.log(a)
const bubbleSort = (arr) => {
  const l = arr.length
  for (let i = 0; i < (l - 1); i++) {
    for(let j = 0; j < l-i-1; j++) {
      if(arr[j] > arr[j+1]){
        let temp = arr[j + 1]
        arr[j + 1] = arr[j]
        arr[j] = temp
      }
    }    
  }
  return arr
}


c(bubbleSort(a))

