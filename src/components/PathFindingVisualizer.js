import React from 'react';
import Node from './Node';
import {djikstra, getNodesInShortestPathOrder} from '../algorithms/djikstras';
import ControlPanel from './ControlPanel';
import Legend from './Legend';

import './PathFindingVisualizer.css';

// update these to be configurable by the user
const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_COL = 35;
const FINISH_NODE_ROW = 10;

var PREV_VISITED = null;
var PREV_SHORTEST = null;

class PathFindingVisualizer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            grid: [],
            mouseIsPressed: false,
        };
    }

    componentDidMount() {
        const grid = getInitialGrid();
        this.setState({grid});
    }

    handleMouseDown(row, col) {
        const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
        this.setState({grid: newGrid, mouseIsPressed: true});
    }

    handleMouseEnter(row, col) {
        if(!this.state.mouseIsPressed) return;
        const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
        this.setState({grid: newGrid});
    }

    handleMouseUp() {
        this.setState({mouseIsPressed: false});
    }

    animateDjikstra(visitedNodesInOrder, nodesInShortestPathOrder){
        for(let i = 0; i <= visitedNodesInOrder.length; i++){
            if (i === visitedNodesInOrder.length) {
                setTimeout(() => {
                    this.animateShortestPath(nodesInShortestPathOrder);
                }, 10 * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited';
            }, 10 * i);
        }
    }

    animateShortestPath(nodesInShortestPathOrder){
        for(let i = 0; i < nodesInShortestPathOrder.length; i++){
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-shortest-path';
            }, 50 * i);
        }
    }

    visualizeDjikstra = () => {
        const {grid} = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = djikstra(grid, startNode, finishNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        // for clearing the board
        PREV_SHORTEST = nodesInShortestPathOrder;
        PREV_VISITED = visitedNodesInOrder;
        this.animateDjikstra(visitedNodesInOrder, nodesInShortestPathOrder);
    };

    clearBoard = () => {
        const grid = getInitialGrid();
        this.setState({grid});
        if (PREV_SHORTEST == null || PREV_VISITED == null){
            return;
        }
        for(let i = 0; i <= PREV_VISITED.length; i++){
            if (i === PREV_VISITED.length) {
                for(let i = 0; i < PREV_SHORTEST.length; i++){
                    const node = PREV_SHORTEST[i];
                    if (node.row === START_NODE_ROW && node.col === START_NODE_COL){
                        document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-start';
                    }else if (node.row === FINISH_NODE_ROW && node.col === FINISH_NODE_COL){
                        document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-finish';
                    }else{
                        document.getElementById(`node-${node.row}-${node.col}`).className = 'node';
                    }
                }
                return;
            }
            const node = PREV_VISITED[i];
            document.getElementById(`node-${node.row}-${node.col}`).className = 'node';
        }
    }

    render() {
        const {grid, mouseIsPressed} = this.state;
        return(
            <div className="main">
                <ControlPanel
                    runButton={() => this.visualizeDjikstra}
                    clearButton={() => this.clearBoard}
                />
                <Legend />
                <div className="grid ui segment">
                    {grid.map((row, rowIdx) => {
                        return (
                            <div key={rowIdx}>
                                {row.map((node, nodeIdx) => {
                                    const {row, col, isFinish, isStart, isWall} = node;
                                    return (
                                        <Node
                                            key={nodeIdx}
                                            col={col}
                                            isFinish={isFinish}
                                            isStart={isStart}
                                            isWall={isWall}
                                            mouseIsPressed={mouseIsPressed}
                                            onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                                            onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                                            onMouseUp={() => this.handleMouseUp()}
                                            row={row}
                                        />
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

const getInitialGrid = () => {
    const grid = [];
    for(let row = 0; row < 20; row++){
        const currentRow = [];
        for(let col = 0; col < 50; col++){
            currentRow.push(createNode(col, row));
        }
        grid.push(currentRow);
    }
    return grid;
};

const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
        ...node,
        isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
};

const createNode = (col, row) => {
    return {
        col,
        row,
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        previousNode: null,
    };
};

export default PathFindingVisualizer;