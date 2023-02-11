import React, { Component } from 'react';

import { dijkstra, getNodesInShortestPathOrder } from '../../algorithms/dijkstra';
import Node from '../Node/Node';
import './Visualizer.css'

const START_THE_NODE_ROW = 10;
const START_THE_NODE_COL = 5;
const FINISH_THE_NODE_ROW = 10;
const FINISH_THE_NODE_COL = 20;

class DijkstraVisualizer extends Component {
    constructor() {
        super()

        this.state = {
            grid: [],
            mouseIsPressed: false,
        }
    };

    componentDidMount() {
        const grid = getInitialGrid();
        this.setState({ grid });
    }
    // *******************************************************************************
    // HANDLING FUNCTIONS RELATED TO MOUSE POINTERS
    // *******************************************************************************

    handleMouseDown(row, col) {
        const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
        this.setState({ grid: newGrid, mouseIsPressed: true });
    }

    handleMouseEnter(row, col) {
        if (!this.state.mouseIsPressed) return;
        const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
        this.setState({ grid: newGrid });
    }

    handleMouseUp() {
        this.setState({ mouseIsPressed: false });
    }

    // outcome of the dijkstra algorithm which is the shortest path finding algorithm
    // *******************************************************************************
    // ANIMATION OF VISITED NODES
    // *******************************************************************************

    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            if (i === visitedNodesInOrder.length) {
                setTimeout(() => {
                    this.animateShortestPath(nodesInShortestPathOrder);
                }, 10 * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    'node node-visited';
            }, 10 * i);
        }
    }
    // *******************************************************************************
    // ANIMATION OF THE SHORTEST PATH
    // *******************************************************************************

    animateShortestPath(nodesInShortestPathOrder) {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    'node node-shortest-path';
            }, 50 * i);
        }
    }
    // *******************************************************************************
    // DEFINING DIJKSTRA FUNCTION WHICH WILL CALL MOUSE EVENTS, ANIMATIONS, DEFINE GRID, DEFINE START AND THE END
    // *******************************************************************************

    visualizeDijkstra() {
        const { grid } = this.state;
        const startNode = grid[START_THE_NODE_ROW][START_THE_NODE_COL];
        const finishNode = grid[FINISH_THE_NODE_ROW][FINISH_THE_NODE_COL];
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    }
    // *******************************************************************************
    // FINALLY THE TIME TO RENDER OUR VERY SPECIAL COMPONENT :)
    // *******************************************************************************

    render() {
        const { grid, mouseIsPressed } = this.state;

        return (
            <>
                <button onClick={() => this.visualizeDijkstra()} id ='button-main'>
                    Let's visualize dijkstra algorithm :/
                </button>


                <div className="grid">
                    {grid.map((row, rowIdx) => {
                        return (
                            <div key={rowIdx}>
                                {row.map((node, nodeIdx) => {
                                    const { row, col, isFinish, isStart, isWall } = node;
                                    return (
                                        <Node
                                            key={nodeIdx}
                                            col={col}
                                            isFinish={isFinish}
                                            isStart={isStart}
                                            isWall={isWall}
                                            mouseIsPressed={mouseIsPressed}
                                            onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                                            onMouseEnter={(row, col) =>
                                                this.handleMouseEnter(row, col)
                                            }
                                            onMouseUp={() => this.handleMouseUp()}
                                            row={row}>
                                        </Node>
                                    );
                                })}
                            </div>
                        )
                    })}
                </div>
            </>
        )

    }
}

// *******************************************************************************
// WRITING FUNCTION TO ACCESS THE INITIAL GRID
// *******************************************************************************

const getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < 20; row++) {
        const currentRow = [];
        for (let col = 0; col < 50; col++) {
            currentRow.push(createNode(col, row));
        }
        grid.push(currentRow);
    }

    return grid;
}

// *******************************************************************************
// WRITING FUNCTION TO CREATE A NEW NODE
// *******************************************************************************

const createNode = (col, row) => {
    return {
        col,
        row,
        isStart: row === START_THE_NODE_ROW && col === START_THE_NODE_COL,
        isFinite: row === FINISH_THE_NODE_ROW && col === FINISH_THE_NODE_COL,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        previousNode: null,
    }
}


// *******************************************************************************
// WRITING FUNCTION TO CREATE OBSTACES IN THE PATH OF TWO NODES ALSO CALLED AS -- BOMBS💣 or walls 
// *******************************************************************************

const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
        ...node,
        isWall: !node.isWall,
    }

    newGrid[row][col] = newNode;
    return newGrid;
}

export default DijkstraVisualizer;