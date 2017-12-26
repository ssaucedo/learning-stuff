const mergeSort = (arr) => {
  const l = arr.length
  if(l === 1) {
    return arr
  } else {
    let m = Math.floor(l/2)
    return merge(mergeSort(arr.slice(0, m)),
                 mergeSort(arr.slice(m))
                )
  }
}

const merge = (left, rigth) => {
  let result = []
  let llen = left.length
  let rlen = rigth.length
  let l = 0
  let r = 0
  while(l < llen && r < rlen) {
    if(left[l] < rigth[r]) {
      result.push(left[l++])
    } else {
      result.push(rigth[r++])
    }
  }
  return result.concat(left.slice(l)).concat(rigth.slice(r))
}

const res = mergeSort([2,1,-10,11,-2.1, -2])
console.log(res)
