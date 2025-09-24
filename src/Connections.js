import React, { useEffect, useState } from 'react';

const Connections = ({ connections, nodePositions }) => {
  const [svgSize, setSvgSize] = useState({ width: 0, height: 0 });

  // Update SVG size to cover the entire app
  useEffect(() => {
    const updateSize = () => {
      const app = document.querySelector('.app');
      if (app) {
        const rect = app.getBoundingClientRect();
        setSvgSize({
          width: rect.width,
          height: rect.height
        });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    
    return () => window.removeEventListener('resize', updateSize);
  }, [nodePositions]);

  // Calculate connection paths
  const getConnectionPath = (connection) => {
    const sourceId = connection.source.id;
    const targetId = connection.target.id;
    
    const sourcePos = nodePositions[sourceId];
    const targetPos = nodePositions[targetId];
    
    if (!sourcePos || !targetPos) return null;
    
    // Calculate center points of nodes
    const sourceX = sourcePos.left + sourcePos.width / 2;
    const sourceY = sourcePos.top + sourcePos.height / 2 + 5;
    const targetX = targetPos.left + targetPos.width / 2;
    const targetY = targetPos.top + targetPos.height / 2 + 5;
    
    // Create a curved path
    const dx = targetX - sourceX;
    const dy = targetY - sourceY;
    const dr = Math.sqrt(dx * dx + dy * dy);
    
    return `M${sourceX},${sourceY}A${dr},${dr} 0 0,1 ${targetX},${targetY}`;
  };

  if (svgSize.width === 0 || svgSize.height === 0) return null;

  return (
    <svg 
      className="connections-overlay" 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1
      }}
      width={svgSize.width}
      height={svgSize.height}
    >
      {connections.map(connection => {
        const path = getConnectionPath(connection);
        if (!path) return null;
        
        return (
          <path
            key={connection.id}
            d={path}
            fill="none"
            stroke="#007bff"
            strokeWidth="2"
            markerEnd="url(#arrowhead)"
          />
        );
      })}
      
      {/* Arrowhead marker definition */}
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill="#007bff" />
        </marker>
      </defs>
    </svg>
  );
};

export default Connections;