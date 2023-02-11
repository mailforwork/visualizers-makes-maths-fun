import React, { Component } from 'react';

import { dijkstra, getNodesInShortestPathOrder } from '../algorithm/dijkstra';

import '.'

const START_THE_NODE_ROW = 5;
const START_THE_NODE_COL = 10;
const FINISH_THE_NODE_ROW = 5;
const FINISH_THE_NODE_COL = 45;

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

    animateDijkstra(visitedNodeInOrder, nodesInShortestPathOrder) {
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
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    }
    // *******************************************************************************
    // FINALLY THE TIME TO RENDER OUR VERY SPECIAL COMPONENT :)
    // *******************************************************************************

    render() {
        const {grid, mouseIsPressed} = this.state;

        return(
            <>
            <button onClick={() => this.visualizeDijkstra()}>
                Let's visualize dijkstra algorithm :/
            </button>
            

            <div className="grid">
                {grid.map((row,rowIdx)=>{
                    return(
                        <div key={rowIdx}>
                            {row.map((node,nodeIdx)=>{
                                const {row,col,isFinish,isStart,isWall} = node;
                                return();
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


    // *******************************************************************************
    // WRITING FUNCTION TO CREATE A NEW NODE
    // *******************************************************************************



    // *******************************************************************************
    // WRITING FUNCTION TO CREATE OBSTACES IN THE PATH OF TWO NODES ALSO CALLED AS -- BOMBS💣 or walls 
    // *******************************************************************************



