const quickSort = (arr, left, right) => {
  
  if(left < right) {
    const pivot = right
    const partitionIndex = partition(arr, left, right, pivot)
    quickSort(arr, left, partitionIndex-1)
    quickSort(arr, partitionIndex + 1, right)
  }
  return arr
}


const partition = (arr, left, right, pivot) => {
    const pivotValue = arr[right]
    let partitionIndex = left
    for (let i = left; i < right; i++) {
      if(arr[i] < pivotValue) {
         swap(arr, i, partitionIndex)
         partitionIndex++
      }
    }
    swap(arr, pivot, partitionIndex)
    return partitionIndex
}

const swap = (arr, i,x) => {
  const tmp = arr[i]
  arr[i] = arr[x]
  arr[x] = arr[i]
}

const res = quickSort([0,-1,-2,3,6,7,11,3,7], 0,8)
console.log(res)

