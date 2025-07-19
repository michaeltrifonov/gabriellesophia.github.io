import React, { useState, useRef } from 'react';

interface RippleEffect {
  id: number;
  x: number;
  y: number;
}

interface Tooltip {
  id: number;
  x: number;
  y: number;
  text: string;
}

const HistoryPanel: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('All Users');
  const [notification, setNotification] = useState<string | null>(null);
  const [ripples, setRipples] = useState<RippleEffect[]>([]);
  const [tooltips, setTooltips] = useState<Tooltip[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(0);

  const handleFilterApply = () => {
    setNotification(`Filter applied: ${selectedFilter}`);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = nextId.current++;
    
    // Add ripple effect
    setRipples(prev => [...prev, { id, x, y }]);
    
    // Add tooltip
    setTooltips(prev => [...prev, { id, x, y, text: 'View change details' }]);
    
    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== id));
    }, 1200);
    
    // Remove tooltip after 1.5 seconds
    setTimeout(() => {
      setTooltips(prev => prev.filter(t => t.id !== id));
    }, 1500);
  };

  return (
    <div className="history-panel" ref={containerRef}>
      {/* Header */}
      <div className="history-header">
        <h3 className="history-title">History Tracking</h3>
        <p className="history-description">
          Click on any cell in the table below to see its complete change history
        </p>
      </div>
      
      {/* Filter Controls */}
      <div className="history-filters">
        <select 
          className="history-filter-select"
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
        >
          <option value="All Users">All Users</option>
          <option value="My Changes">My Changes</option>
          <option value="Team Changes">Team Changes</option>
          <option value="System Changes">System Changes</option>
        </select>
        <button 
          className="history-apply-btn"
          onClick={handleFilterApply}
        >
          Apply Filter
        </button>
      </div>
      
      {/* History Table Image */}
      <div className="history-image-container">
        <img 
          src={`${import.meta.env.BASE_URL}images/Egret/history-table.svg`} 
          alt="History tracking interface showing cell-level changes" 
          className="history-image"
          onClick={handleImageClick}
        />
        
        {/* Ripple Effects */}
        {ripples.map(ripple => (
          <div
            key={ripple.id}
            className="ripple-effect"
            style={{
              left: `${ripple.x}px`,
              top: `${ripple.y}px`,
            }}
          />
        ))}
        
        {/* Tooltips */}
        {tooltips.map(tooltip => (
          <div
            key={tooltip.id}
            className="history-tooltip"
            style={{
              left: `${tooltip.x}px`,
              top: `${tooltip.y - 30}px`,
            }}
          >
            {tooltip.text}
          </div>
        ))}
      </div>
      
      {/* Notification */}
      {notification && (
        <div className="history-notification">
          {notification}
        </div>
      )}
    </div>
  );
};

export default HistoryPanel;