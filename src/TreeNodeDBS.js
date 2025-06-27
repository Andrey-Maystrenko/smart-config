import React, { useState } from 'react';

const TreeNodeDBS = ({
  node,
  level,
  onSelect,
  // updateTree,
  updateTreeDBS,
  selectedNode }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(node.name);
  const [showAddChild, setShowAddChild] = useState(false);
  const [newChildName, setNewChildName] = useState('');

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
    updateTreeDBS(prevTree => updateNodeInTree(prevTree, node.id, updatedNode));
    setIsEditing(false);
    onSelect(updatedNode);
  };

  const handleDelete = () => {
    // updateTree(prevTree => deleteNodeFromTree(prevTree, node.id));
    updateTreeDBS(prevTree => deleteNodeFromTree(prevTree, node.id));
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
    updateTreeDBS(prevTree => updateNodeInTree(prevTree, node.id, updatedNode));
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
      className={`tree-node ${isSelected ? 'selected' : ''}`}
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
            onClick={handleSelect}
            className="node-name"
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
            <TreeNodeDBS
              key={child.id}
              node={child}
              level={level + 1}
              onSelect={onSelect}
              // updateTree={updateTree}
              updateTreeDBS={updateTreeDBS}
              selectedNode={selectedNode}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNodeDBS;