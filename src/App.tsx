import React, { useState, useRef } from 'react';
import TreeNodePBS from './TreeNodePBS';
import TreeNodeDBS from './TreeNodeDBS';
import TreeNodeRBS from './TreeNodeRBS';
import Connections from './Connections';
import './styles.css';


type BsType = {
  id: any,
  name: string,
  children: BsType[]
};

enum StructureType {
  RBS = "RBS",
  PBS = "PBS",
  DBS = "DBS"
}

type LinkedSourceType = {
  node: BsType,
  structureType: StructureType
}

type ConnectionType = {
  id: any,
  source: {id: any, type: StructureType},
  target: {id: any, type: StructureType}
}


const initialDataRBS: BsType = {
  id: "rbs",
  name: 'Reqs',
  children: [
    {
      id: "rbs-2",
      name: 'Req 1',
      children: [
        {
          id: "rbs-3",
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
  id: "pbs",
  name: 'Product',
  children: [
    {
      id: "pbs-1",
      name: 'Part 1',
      children: [
        {
          id: "pbs-2",
          name: 'Part 2',
          children: []
        }
      ]
    },
    {
      id: "pbs-3",
      name: 'Part 3',
      children: []
    }
  ]
};

const initialDataDBS: BsType = {
  id: "dbs",
  name: 'Docs',
  children: [
    {
      id: "dbs-1",
      name: 'Doc 1',
      children: [
        {
          id: "dbs-2",
          name: 'Doc 2',
          children: []
        }
      ]
    },
    {
      id: "dbs-3",
      name: 'Doc 3',
      children: []
    }
  ]
};

const App = () => {
  const [treeDataRBS, setTreeDataRBS] = useState<BsType>(initialDataRBS);
  const [treeDataPBS, setTreeDataPBS] = useState(initialDataPBS);
  const [treeDataDBS, setTreeDataDBS] = useState(initialDataDBS);
  const [selectedNode, setSelectedNode] = useState<BsType>(null);
  const [connections, setConnections] = useState<ConnectionType[]>([]);
  const [isLinkingMode, setIsLinkingMode] = useState<boolean>(false);
  const [linkSource, setLinkSource] = useState<LinkedSourceType | null>(null);
  const nodePositions = useRef({});

  const handleNodeSelect = (node: BsType) => {
    setSelectedNode(node);
  };

  const updateTreeRBS = (newTree: BsType) => {
    setTreeDataRBS(newTree);
  };

  const updateTreePBS = (newTree) => {
    setTreeDataPBS(newTree);
  };

  const updateTreeDBS = (newTree) => {
    setTreeDataDBS(newTree);
  };

  // Function to update node positions
  const updateNodePosition = (nodeId: number, rect) => {
    nodePositions.current[nodeId] = rect;
  };

  // Function to handle node click in linking mode
  const handleNodeClickInLinkingMode = (node: BsType, structureType: StructureType) => {
    if (!linkSource) {
      // First node clicked - set as source
      setLinkSource({ node, structureType });
    } else {
      // Second node clicked - create connection
      if (linkSource.node.id !== node.id && linkSource.structureType !== structureType) {
        const newConnection: ConnectionType = {
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
    setIsLinkingMode((currLinkingMode) => !currLinkingMode);
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
            prevTree={treeDataRBS}
            level={0}
            onSelect={isLinkingMode ? 
              (node) => handleNodeClickInLinkingMode(node, StructureType.RBS) :
              handleNodeSelect}
            updateTreeXBS={updateTreeRBS}
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
            prevTree={treeDataPBS}
            level={0}
            onSelect={isLinkingMode ? 
              (node) => handleNodeClickInLinkingMode(node, StructureType.PBS) :
              handleNodeSelect}
            updateTreeXBS={updateTreePBS}
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
            prevTree={treeDataDBS}
            level={0}
            onSelect={isLinkingMode ? 
              (node) => handleNodeClickInLinkingMode(node, StructureType.DBS) :
              handleNodeSelect}
            updateTreeXBS={updateTreeDBS}
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
export {BsType, LinkedSourceType};
