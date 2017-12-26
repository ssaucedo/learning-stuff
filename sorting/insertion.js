// insertion

var data = [1,3,2,4,5,8,7,9,6,100, -1, 0]

function order() {
  for(let i = 1; i < data.length; i++) {
    let tmp = data[i]
    for(var j = i; j > 0 && tmp < data[j-1] ; j--) {
        data[j] = data[j-1]
    }
    data[j] = tmp
  }
  return data
}

console.log(order(data))
