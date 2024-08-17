const PriorityQueue = require('priority-queue-js');

class Graph {  // Corrected class name to match the export and convention
  constructor() {
    this.nodes = new Map();
  }

  addNode(node) {
    this.nodes.set(node, []);
  }

  addEdge(start, end, weight) {
    this.nodes.get(start).push({ node: end, weight: weight });
    this.nodes.get(end).push({ node: start, weight: weight }); // Assuming undirected graph
  }

  getNodes() {
    return this.nodes;
  }

  dijkstra(startNode, endNode) {
    let distances = {};
    let prev = {};
    let pq = new PriorityQueue((a, b) => a.priority - b.priority);

    // Initialize distances and priority queue
    this.nodes.forEach((_, node) => {
      distances[node] = Infinity;
      prev[node] = null;
      pq.push({ node: node, priority: distances[node] });
    });
    distances[startNode] = 0;
    pq.push({ node: startNode, priority: 0 });

    while (!pq.isEmpty()) {
      let minNode = pq.pop().node;
      let neighbors = this.nodes.get(minNode);

      neighbors.forEach(neighbor => {
        let alt = distances[minNode] + neighbor.weight;
        if (alt < distances[neighbor.node]) {
          distances[neighbor.node] = alt;
          prev[neighbor.node] = minNode;
          pq.push({ node: neighbor.node, priority: alt });
        }
      });
    }

    let path = [];
    let current = endNode;
    while (current) {
      path.unshift(current);
      current = prev[current];
    }

    return path.length > 1 ? path : null;  // Return null if no path found
  }
}

module.exports = Graph;  // Corrected export statement
