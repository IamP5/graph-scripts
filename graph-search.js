const inquirer = require('inquirer')

const adjacencyList = new Map();
let steps = 0;

var questions = [
  {
    type: 'input',
    name: 'nodes',
    message: "Nodes (Separe by space)"
  },
  {
    type: 'input',
    name: 'edges',
    message: "Edges:"
  }
]

async function getInputs() {
  await inquirer.prompt(questions).then(answers => {
    let nodes = answers['nodes'].split(' '); // vértices
    let edges = answers['edges'].split(' '); // arestas

    for(let i = 0; i < edges.length; i++) {
      edges[i] = edges[i].split(',');
    }
    
    console.log(nodes);
    console.log(edges);

    nodes.forEach(addNode);
    edges.forEach(edge => addEdge(...edge));
  });

  function addNode(node) {
    adjacencyList.set(node, []);
  }

  // edge undirected
  function addEdge(origin, destination) {
    adjacencyList.get(origin).push(destination);
    adjacencyList.get(destination).push(origin);
  }

  console.log(adjacencyList);
  bfs('A');
}

function bfs(start) {
  const visited = new Set();
  const queue = [start]

  while(queue.length > 0) {
    steps++
    const node = queue.shift(); // mutates the queue

    const destinations = adjacencyList.get(node);

    for(const destination of destinations) {

      if(destination === 'F') {
        console.log(`F found in ${steps} steps`);
      }

      if(!visited.has(destination)) {
        visited.add(destination);
        queue.push(destination);
        console.log(destination);
      }
    }
  }
}

function dfs(start, visited = new Set()) {
  steps++
  console.log(start);
  visited.add(start);

  const destinations = adjacencyList.get(start);

  for(const destination of destinations) {

    if(destination === 'F') {
      console.log(`F found in ${steps} steps`);
      return;
    }

    if(!visited.has(destination)) {
      dfs(destination, visited);
    }
  }
}

getInputs();







