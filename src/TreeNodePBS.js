// import React, { useState } from 'react';
import React, { useState, useRef, useEffect } from 'react';


const TreeNodePBS = ({
  node,
  level,
  onSelect,
  updateTreePBS,
  selectedNode,
  isLinkingMode,
  linkSource,
  updateNodePosition
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(node.name);
  const [showAddChild, setShowAddChild] = useState(false);
  const [newChildName, setNewChildName] = useState('');
  const nodeRef = useRef();
  // Update node position when component mounts or updates
  useEffect(() => {
    if (nodeRef.current && updateNodePosition) {
      const rect = nodeRef.current.getBoundingClientRect();
      const appRect = document.querySelector('.app').getBoundingClientRect();

      // Calculate position relative to the app container
      updateNodePosition(node.id, {
        left: rect.left - appRect.left,
        top: rect.top - appRect.top,
        width: rect.width,
        height: rect.height
      });
    }
  }, [node, updateNodePosition]);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSelect = () => {
    onSelect(node);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const updatedNode = { ...node, name: editName };
    // updateTree(prevTree => updateNodeInTree(prevTree, node.id, updatedNode));
    updateTreePBS(prevTree => updateNodeInTree(prevTree, node.id, updatedNode));
    setIsEditing(false);
    onSelect(updatedNode);
  };

  const handleDelete = () => {
    // updateTree(prevTree => deleteNodeFromTree(prevTree, node.id));
    updateTreePBS(prevTree => deleteNodeFromTree(prevTree, node.id));
  };

  const handleAddChild = () => {
    if (!newChildName.trim()) return;

    const newChild = {
      id: Date.now(),
      name: newChildName,
      children: []
    };

    const updatedNode = {
      ...node,
      children: [...node.children, newChild]
    };

    // updateTree(prevTree => updateNodeInTree(prevTree, node.id, updatedNode));
    updateTreePBS(prevTree => updateNodeInTree(prevTree, node.id, updatedNode));
    setNewChildName('');
    setShowAddChild(false);
    setIsExpanded(true);
  };

  const updateNodeInTree = (currentNode, id, updatedNode) => {
    if (currentNode.id === id) {
      return updatedNode;
    }

    return {
      ...currentNode,
      children: currentNode.children.map(child =>
        updateNodeInTree(child, id, updatedNode))
    };
  };

  const deleteNodeFromTree = (currentNode, id) => {
    if (currentNode.id === id) {
      return null;
    }

    return {
      ...currentNode,
      children: currentNode.children
        .map(child => deleteNodeFromTree(child, id))
        .filter(child => child !== null)
    };
  };

  const isSelected = selectedNode && selectedNode.id === node.id;

  return (
    <div
      ref={nodeRef}
      className={`tree-node ${isSelected ? 'selected' : ''} ${isLinkingMode ? 'linking-mode' : ''}`}
      style={{ marginLeft: `${level * 20}px` }}
    >
      <div className="node-header">
        {node.children.length > 0 ? (
          <button onClick={handleToggle} className="toggle-btn">
            {isExpanded ? '−' : '+'}
          </button>
        ) : (
          <span className="toggle-spacer"></span>
        )}

        {isEditing ? (
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            onBlur={handleSave}
            onKeyPress={(e) => e.key === 'Enter' && handleSave()}
            autoFocus
          />
        ) : (
          <span
            onClick={isLinkingMode ? undefined : handleSelect}
            className="node-name"
            style={{
              cursor: isLinkingMode ? 'crosshair' : 'pointer',
              backgroundColor: isLinkingMode ? '#fffacd' : 'transparent',
              border: linkSource && linkSource.node && linkSource.node.id === node.id ? '2px solid #007bff' : 'none'
            }}
          >
            {node.name}
          </span>
        )}

        <div className="node-actions">
          <button onClick={handleEdit} className="edit-btn">✏️</button>
          <button onClick={handleDelete} className="delete-btn">🗑️</button>
          <button
            onClick={() => setShowAddChild(!showAddChild)}
            className="add-child-btn"
          >
            ➕
          </button>
        </div>
      </div>

      {showAddChild && (
        <div className="add-child-form">
          <input
            type="text"
            value={newChildName}
            onChange={(e) => setNewChildName(e.target.value)}
            placeholder="Child node name"
          />
          <button onClick={handleAddChild}>Add</button>
          <button onClick={() => setShowAddChild(false)}>Cancel</button>
        </div>
      )}

      {isExpanded && node.children.length > 0 && (
        <div className="children">
          {node.children.map(child => (
            <TreeNodePBS
              key={child.id}
              node={child}
              level={level + 1}
              onSelect={onSelect}
              // updateTree={updateTree}
              updateTreePBS={updateTreePBS}
              selectedNode={selectedNode}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNodePBS;