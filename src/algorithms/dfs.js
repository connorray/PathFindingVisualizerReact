export function dfs(grid, startNode, endNode) {
    let visitedNodes = [];
    let stack = [startNode];
    startNode.seen = true;

    while (stack.length > 0) {
        const node = stack.pop();
        visitedNodes.push(node);

        if (node === endNode) {
            return visitedNodes;
        }
        getNeighbors(node, grid, stack);
    }
    return visitedNodes;
}

function getNeighbors(closestNode, grid, nodesToVisit) {
    let { row, col } = closestNode;
    console.log(row, col);
    if (row > 0) {
        let node = grid[row - 1][col];
        if (!node.seen && !node.isWall) {
            node.seen = true;
            node.previousNode = closestNode;
            nodesToVisit.push(node);
        }
    }

    if (row < grid.length - 1) {
        let node = grid[row + 1][col];
        if (!node.seen && !node.isWall) {
            node.seen = true;
            node.previousNode = closestNode;
            nodesToVisit.push(node);
        }
    }

    if (col > 0) {
        let node = grid[row][col - 1];
        if (!node.seen && !node.isWall) {
            node.seen = true;
            node.previousNode = closestNode;
            nodesToVisit.push(node);
        }
    }

    if (col < grid[row].length - 1) {
        let node = grid[row][col + 1];
        if (!node.seen && !node.isWall) {
            node.seen = true;
            node.previousNode = closestNode;
            nodesToVisit.push(node);
        }
    }
}

export function getNodesInShortestPathOrderDFS(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
}