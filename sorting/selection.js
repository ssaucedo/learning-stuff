const a = [1,-1,9,5,6,7,8]

function selection(data) {
  var i;
  var j;
  var least;
  for (i = 0; i < data.length -1; i++) {
        for (var j = i+1, least = i; j < data.length; j++) {
          if(data[least] > data[j]) {
              least = j
          }
        }
        if (i != least) {
            let tmp = data[i]
            data[i] = data[least]
            data[least] = tmp
        }
  }
  return data
}
console.log(selection(a))
