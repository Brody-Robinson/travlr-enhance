var express = require('express');
var router = express.Router();
var Graph = require('../../graph');

const graph = new Graph();
// Add nodes and edges to the graph (example)
graph.addNode('A');
graph.addNode('B');
graph.addNode('C');
graph.addEdge('A', 'B', 1);
graph.addEdge('B', 'C', 2);
graph.addEdge('A', 'C', 4);

router.get('/shortest-path', function(req, res, next) {
  const { start, end } = req.query;
  const path = graph.dijkstra(start, end);
  res.json({ path });
});

module.exports = router;
