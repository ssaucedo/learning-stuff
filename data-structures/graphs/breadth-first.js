
function bfs(graph, root) {
  
  var nodesLen = {};
  
  for (var i = 0; i < graph.length; i++) {
    nodesLen[i] = Infinity;
  }
  
  nodesLen[root] = 0
  
  var queue = [root]
  var current;  
  
  while (queue.length != 0){
    current = queue.shift();
    
    var curConnected = graph[current];
    curConnected.map((v,id) => v === 1 ? id : undefined).filter(id => id !== undefined).forEach(idx => {
      if(nodesLen[idx] == Infinity) {
        nodesLen[idx] = nodesLen[current] + 1;
        queue.push(idx);
      }
    })
  }
  return nodesLen;
}

const graph = [
  [0,1,1,0,0,0,1,0],
  [0,0,1,0,1,1,0,1],
  [1,1,0,0,1,0,0,1],
  [0,0,0,1,0,1,1,1],
  [0,1,0,0,1,0,1,1],
  [0,1,0,0,0,0,0,1],
  [0,1,0,0,1,1,0,0],
  [0,1,0,0,0,0,1,1]]
  

console.log(bfs(graph, 1));
