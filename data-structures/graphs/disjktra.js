import tools from './tools'

class ShortestPath {


  minDistance (dist, sptSet, v) {
    let min = Infinity
    let min_index = -1

    for (let idx = 0; idx < v; idx++) {
      if (sptSet[idx] === false && dist[idx].value <= min) {
        min = dist[idx].value
        min_index = idx
      }
    }
    return min_index
  }

  // A utility function to print the constructed distance array
  printSolution (dist, len, paths) {
    console.log('Vertex  Distance from Source')
    for (let i = 0; i < len; i++) {
      console.log(`${i}: ${dist[i].value} paths: ${dist[i].path}`)
    }
  }

  /**
   *
   * @param matrix
   * @param src
   */
  dijkstra (matrix, src) {
    const totLen = matrix.length
    const dist = [...new Array(totLen)].map(e => ({value: Infinity, path: []}))

    const sptSet = [...new Array(totLen)].map(e => false)

    dist[src] = {value: 0, path: []}

    for (let count = 0; count < totLen - 1; count++) {
      let u = this.minDistance(dist, sptSet, totLen)
      sptSet[u] = true

      for (let v = 0; v < totLen; v++) {
        if (!sptSet[v] && matrix[u][v] != 0 &&
          dist[u].value != Infinity &&
          dist[u].value + matrix[u][v] < dist[v].value) {
          dist[v].value = dist[u].value + matrix[u][v]
          dist[v].path = [dist[u].path, v]
        }
      }
    }
    this.printSolution(dist, totLen, [])
  }
}

const adjacencyMatrix = [
  [0, 4, 0, 0, 0, 0, 0, 8, 0],
  [4, 0, 8, 0, 0, 0, 0, 11, 0],
  [0, 8, 0, 7, 0, 4, 0, 0, 2],
  [0, 0, 7, 0, 9, 14, 0, 0, 0],
  [0, 0, 0, 9, 0, 10, 0, 0, 0],
  [0, 0, 4, 14, 10, 0, 2, 0, 0],
  [0, 0, 0, 0, 0, 2, 0, 1, 6],
  [8, 11, 0, 0, 0, 0, 1, 0, 7],
  [0, 0, 2, 0, 0, 0, 6, 7, 0]]

const sp = new ShortestPath()
sp.dijkstra(adjacencyMatrix, 0)


