This code contains several functions related to implementing Dijkstra's algorithm for finding the shortest path in a grid.

## dijkstra(grid, startNode, finishNode): 
This function performs Dijkstra's algorithm. It takes in the grid of nodes, the starting node and the finishing node as arguments. It initializes the distance of the starting node to 0 and keeps track of all visited nodes in the order they were visited in the visitedNodesInOrder array. The function then iterates through all unvisited nodes, sorting them by their distance to the starting node, and visiting the closest unvisited node. The function updates the unvisited neighbors of the closest node and repeats the process until all nodes have been visited or a node with an infinite distance is reached, meaning that the finish node is not reachable.

## sortNodesByDistance(unvisitedNodes): 
This function sorts an array of nodes by their distance to the starting node in ascending order.

## updateUnvisitedNeighbors(node, grid): 
This function updates the unvisited neighbors of a node. It calculates the distance to each unvisited neighbor as 1 greater than the current node's distance and sets the current node as the previous node for each unvisited neighbor.

## getUnvisitedNeighbors(node, grid): 
This function returns an array of all unvisited neighbors of a node.

## getAllNodes(grid): 
This function returns an array of all nodes in the grid.

## getNodesInShortestPathOrder(finishNode): 
This function returns an array of nodes in the order of the shortest path from the starting node to the finish node. The function backtracks from the finish node by following the previousNode property of each node, and returns the array in reverse order.