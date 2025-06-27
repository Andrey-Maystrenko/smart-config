import React, { useState } from 'react';
import TreeNodePBS from './TreeNodePBS';
import TreeNodeDBS from './TreeNodeDBS';
import TreeNodeRBS from './TreeNodeRBS';
import './styles.css';

// const initialData = {
//   id: 1,
//   name: 'Root',
//   children: [
//     {
//       id: 2,
//       name: 'Child 1',
//       children: [
//         {
//           id: 3,
//           name: 'Grandchild 1',
//           children: []
//         }
//       ]
//     },
//     {
//       id: 4,
//       name: 'Child 2',
//       children: []
//     }
//   ]
// };

const initialDataRBS = {
  id: 1,
  name: 'Reqs',
  children: [
    {
      id: 2,
      name: 'Req 1',
      children: [
        {
          id: 3,
          name: 'Req 2',
          children: []
        }
      ]
    },
    {
      id: 4,
      name: 'Req 3',
      children: []
    }
  ]
};

const initialDataPBS = {
  id: 1,
  name: 'Product',
  children: [
    {
      id: 2,
      name: 'Part 1',
      children: [
        {
          id: 3,
          name: 'Part 2',
          children: []
        }
      ]
    },
    {
      id: 4,
      name: 'Part 3',
      children: []
    }
  ]
};

const initialDataDBS = {
  id: 1,
  name: 'Docs',
  children: [
    {
      id: 2,
      name: 'Doc 1',
      children: [
        {
          id: 3,
          name: 'Doc 2',
          children: []
        }
      ]
    },
    {
      id: 4,
      name: 'Doc 3',
      children: []
    }
  ]
};

const App = () => {
  // const [treeData, setTreeData] = useState(initialData);
  const [treeDataRBS, setTreeDataRBS] = useState(initialDataRBS);
  const [treeDataPBS, setTreeDataPBS] = useState(initialDataPBS);
  const [treeDataDBS, setTreeDataDBS] = useState(initialDataDBS);

  const [selectedNode, setSelectedNode] = useState(null);

  const handleNodeSelect = (node) => {
    setSelectedNode(node);
  };

  // const updateTree = (newTree) => {
  //   setTreeData(newTree);
  // };

  const updateTreeRBS = (newTree) => {
    setTreeDataRBS(newTree);
  };

  const updateTreePBS = (newTree) => {
    setTreeDataPBS(newTree);
  };

  const updateTreeDBS = (newTree) => {
    setTreeDataDBS(newTree);
  };

  return (
    <div className="app">
      <h1>Configuration Manager</h1>
      <div className='configuration'>
        <div className="tree-container">
          <h2>Requirements Breakdown Structure</h2>
          <TreeNodeRBS
            node={treeDataRBS}
            nodeRBS={treeDataRBS}
            level={0}
            onSelect={handleNodeSelect}
            // updateTree={updateTree}
            updateTreeRBS={updateTreeRBS}
            selectedNode={selectedNode}
          />
          {/* {selectedNode && (
            <div className="node-info">
              <h3>Selected Node: {selectedNode.name}</h3>
              <p>ID: {selectedNode.id}</p>
            </div>
          )} */}
        </div>
        <div className="tree-container">
          <h2>Product Breakdown Structure</h2>
          <TreeNodePBS
            node={treeDataPBS}
            nodePBS={treeDataPBS}
            level={0}
            onSelect={handleNodeSelect}
            // updateTree={updateTree}
            updateTreePBS={updateTreePBS}
            selectedNode={selectedNode}
          />
          {/* {selectedNode && (
            <div className="node-info">
              <h3>Selected Node: {selectedNode.name}</h3>
              <p>ID: {selectedNode.id}</p>
            </div>
          )} */}
        </div>
        <div className="tree-container">
          <h2>Documents Breakdown Structure</h2>
          <TreeNodeDBS
            node={treeDataDBS}
            nodeDBS={treeDataDBS}
            level={0}
            onSelect={handleNodeSelect}
            // updateTree={updateTree}
            updateTreeDBS={updateTreeDBS}
            selectedNode={selectedNode}
          />
          {/* {selectedNode && (
            <div className="node-info">
              <h3>Selected Node: {selectedNode.name}</h3>
              <p>ID: {selectedNode.id}</p>
            </div>
          )} */}
        </div>
      </div>

    </div>
  );
};

export default App;