// returns all nodes in the order in which they were visited.
// also makes nodes point back to their previous node, effectively
// allowing us to compute the shortest path by backtracking from the
// finishNode
export const djikstra = (grid, startNode, finishNode) => {
    const visitedNodesInOrder = [];
    startNode.distance = 0;  // start off djikstra with the start node since others are inf
    const univistedNodes = getAllNodes(grid);
    while (!!univistedNodes.length){
        sortNodesByDistance(univistedNodes);
        const closestNode = univistedNodes.shift();
        // if we encounter a wall, then skip it
        if (closestNode.isWall) continue;
        // if the closest node is at a distance of inf then we are trapped
        if (closestNode.distance === Infinity) return visitedNodesInOrder;
        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);
        if (closestNode === finishNode) return visitedNodesInOrder;
        updateUnvisitedNeighbors(closestNode, grid);
    }
}

const getAllNodes = (grid) => {
    const nodes = [];
    for (const row of grid){
        for (const node of row){
            nodes.push(node);
        }
    }
    return nodes;
}

const sortNodesByDistance = (univistedNodes) => {
    univistedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);  // sort the nodes each time instead of using a min heap
}

const updateUnvisitedNeighbors = (node, grid) => {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for(const neighbor of unvisitedNeighbors){
        neighbor.distance = node.distance + 1;
        neighbor.previousNode = node;
    }
}

const getUnvisitedNeighbors = (node, grid) => {
    const neighbors = [];
    const {col, row} = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row+1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col+1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);  // get all the unvisited with !
}

// backtracks from the finishNode to find the shortest path.
// only works when called after the djikstra method
export const getNodesInShortestPathOrder = (finishNode) => {
    const nodesInShortestOrder = [];
    let currentNode = finishNode;
    while(currentNode !== null){
        nodesInShortestOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestOrder;
}
