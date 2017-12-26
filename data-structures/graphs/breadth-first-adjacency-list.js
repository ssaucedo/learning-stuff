class Graph {
  constructor(N) {
    this.number = N
    this.adj = [...new Array(5)].map(x => []);
  }

  addEdge (from, to) {
     this.adj[from].push(to)
  }

  bfs(root) {
    let visited = [...new Array(this.number)].map(x => false);
    let queue = [root]
    while(queue.length !== 0) {
      const tmp = this.adj[queue.pop()]
      for(let v of tmp) {
        if (!visited[v]) {
          console.log(v)
          visited[v] = true
          queue.push(v)
        }
      }
    }
  }


  DFSUtil (v,visited) {
        visited[v] = true;
        console.log(v)
        let current = this.adj[v]
        for(let a of current) {
            if (!visited[a])
              this.DFSUtil(a, visited);
        }
    }
 
    DFS(v) {
        this.DFSUtil(v,
			[...new Array(this.number)].map(x => false))
    }
}

const g = new Graph(4)

 
g.addEdge(0, 1)
g.addEdge(0, 2)
g.addEdge(1, 2)
g.addEdge(2, 0)
g.addEdge(2, 3)
g.addEdge(3, 3)
g.bfs(1)

