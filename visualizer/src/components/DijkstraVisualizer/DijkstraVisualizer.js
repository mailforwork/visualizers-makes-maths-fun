import React, {Component} from 'react';

import {dijkstra, getNodesInShortestPathOrder} from '../algorithm/dijkstra';

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
        this.setState({grid});
    }

    
}


