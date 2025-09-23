import React, { useState, useRef } from 'react';
import TreeNodePBS from './TreeNodePBS';
import TreeNodeDBS from './TreeNodeDBS';
import TreeNodeRBS from './TreeNodeRBS';
import Connections from './Connections';
import './styles.css';


type BsType = {
  id: number,
  name: string,
  children: BsType[]
};


const initialDataRBS: BsType = {
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

const initialDataPBS: BsType = {
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

const initialDataDBS: BsType = {
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
  const [treeDataRBS, setTreeDataRBS] = useState(initialDataRBS);
  const [treeDataPBS, setTreeDataPBS] = useState(initialDataPBS);
  const [treeDataDBS, setTreeDataDBS] = useState(initialDataDBS);
  const [selectedNode, setSelectedNode] = useState(null);
  const [connections, setConnections] = useState([]);
  const [isLinkingMode, setIsLinkingMode] = useState(false);
  const [linkSource, setLinkSource] = useState(null);
  const nodePositions = useRef({});

  const handleNodeSelect = (node) => {
    setSelectedNode(node);
  };

  const updateTreeRBS = (newTree) => {
    setTreeDataRBS(newTree);
  };

  const updateTreePBS = (newTree) => {
    setTreeDataPBS(newTree);
  };

  const updateTreeDBS = (newTree) => {
    setTreeDataDBS(newTree);
  };

  // Function to update node positions
  const updateNodePosition = (nodeId, rect) => {
    nodePositions.current[nodeId] = rect;
  };

  // Function to handle node click in linking mode
  const handleNodeClickInLinkingMode = (node, structureType) => {
    if (!linkSource) {
      // First node clicked - set as source
      setLinkSource({ node, structureType });
    } else {
      // Second node clicked - create connection
      if (linkSource.node.id !== node.id && linkSource.structureType !== structureType) {
        const newConnection = {
          id: Date.now(),
          source: { id: linkSource.node.id, type: linkSource.structureType },
          target: { id: node.id, type: structureType }
        };
        
        setConnections([...connections, newConnection]);
      }
      
      // Reset linking mode
      setLinkSource(null);
      setIsLinkingMode(false);
    }
  };

  // Function to remove a connection
  const removeConnection = (connectionId) => {
    setConnections(connections.filter(conn => conn.id !== connectionId));
  };

  // Toggle linking mode
  const toggleLinkingMode = () => {
    setIsLinkingMode(!isLinkingMode);
    setLinkSource(null);
  };

  return (
    <div className="app">
      <h1>Configuration Manager</h1>
      
      <div className="controls">
        <button 
          onClick={toggleLinkingMode} 
          className={isLinkingMode ? 'linking-active' : ''}
        >
          {isLinkingMode ? 'Cancel Linking' : 'Create Links'}
        </button>
        
        {connections.length > 0 && (
          <div className="connections-list">
            <h3>Connections:</h3>
            {connections.map(conn => (
              <div key={conn.id} className="connection-item">
                <span>
                  {conn.source.type} #{conn.source.id} → {conn.target.type} #{conn.target.id}
                </span>
                <button onClick={() => removeConnection(conn.id)}>Remove</button>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className='configuration'>
        <div className="tree-container">
          <h2>Requirements Breakdown Structure</h2>
          <TreeNodeRBS
            node={treeDataRBS}
            level={0}
            onSelect={isLinkingMode ? 
              (node) => handleNodeClickInLinkingMode(node, 'RBS') : 
              handleNodeSelect}
            updateTreeRBS={updateTreeRBS}
            selectedNode={selectedNode}
            isLinkingMode={isLinkingMode}
            linkSource={linkSource}
            updateNodePosition={updateNodePosition}
          />
        </div>
        
        <div className="tree-container">
          <h2>Product Breakdown Structure</h2>
          <TreeNodePBS
            node={treeDataPBS}
            level={0}
            onSelect={isLinkingMode ? 
              (node) => handleNodeClickInLinkingMode(node, 'PBS') : 
              handleNodeSelect}
            updateTreePBS={updateTreePBS}
            selectedNode={selectedNode}
            isLinkingMode={isLinkingMode}
            linkSource={linkSource}
            updateNodePosition={updateNodePosition}
          />
        </div>
        
        <div className="tree-container">
          <h2>Documents Breakdown Structure</h2>
          <TreeNodeDBS
            node={treeDataDBS}
            level={0}
            onSelect={isLinkingMode ? 
              (node) => handleNodeClickInLinkingMode(node, 'DBS') : 
              handleNodeSelect}
            updateTreeDBS={updateTreeDBS}
            selectedNode={selectedNode}
            isLinkingMode={isLinkingMode}
            linkSource={linkSource}
            updateNodePosition={updateNodePosition}
          />
        </div>
      </div>
      
      {/* Connections SVG overlay */}
      <Connections 
        connections={connections} 
        nodePositions={nodePositions.current}
      />
    </div>
  );
};

export default App;