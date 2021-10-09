const csv = 
"0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0\n" +
"0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0\n" +
"1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0\n" +
"0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0\n" +
"0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0\n" +
"0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0\n" +
"0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,1,0\n" +
"0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,0,0,0,0,0,0\n" +
"0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,1\n" +
"0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,1,0,0,0\n" +
"0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,1,0,0,0,0,0\n" +
"0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,0,0,0\n" +
"0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1\n" +
"0,0,0,0,0,0,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0\n" +
"0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0\n" +
"0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0\n" +
"0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0\n" +
"0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1\n" +
"0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0\n" +
"0,0,0,0,0,1,0,0,0,1,0,0,1,0,1,0,1,0,0,0,0,0,0,0\n" +
"0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,1,0\n" +
"0,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0\n" +
"0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0\n" +
"0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0"

const AdjancencyMatrix = csvToArray(csv);
const adjacencyList = new Map();

const graphProps = {
  ordem: AdjancencyMatrix.length,
  tamanho: 34,
  diametro: null,
  componentesConexas: null,
  grauMedio: null,
  euleriano: null,

}

grauMedio = () => {
  let degrees = 0
  adjacencyList.forEach(item => degrees += item.length);

  graphProps.grauMedio = degrees/graphProps.ordem
}

function csvToArray(csv) {
  rows = csv.split("\n");

  return rows.map(row => {
    return row.split(",");
  });
}

function matrixToList(matrix) {
  for(let i = 0; i < matrix.length; i++) {
    adjacencyList.set(i+1, []);
    for(let j = 0; j < matrix[i].length; j++) {
      if(matrix[i][j] == '1') {
        adjacencyList.get(i+1).push(j+1);
      }
    }
  }
}

function bfs(start, end) {
  const visited = new Set();
  const queue = [start]
  console.log(start);
  visited.add(start);

  while(queue.length > 0) {
    const node = queue.shift(); // mutates the queue

    const destinations = adjacencyList.get(node);

    for(const destination of destinations) {

      if(destination === end) {
        console.log(`${end} found`);
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
  console.log(start);
  visited.add(start);

  const destinations = adjacencyList.get(start);
  let steps = 0;

  for(const destination of destinations) {

    //if(destination === 'BKK') {
    //  console.log('DFS found BKK in steps');
    //  return;
    //}

    if(!visited.has(destination)) {
      dfs(destination, visited);
      steps++
    }
  }
}

matrixToList(AdjancencyMatrix);
console.log(adjacencyList);
grauMedio();
bfs(1, 0);
//dfs(1);


console.log(graphProps);
