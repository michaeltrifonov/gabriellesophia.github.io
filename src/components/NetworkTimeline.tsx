import React, { useState } from 'react';

interface TimelineEvent {
  id: number;
  time: string;
  status: 'normal' | 'warning' | 'critical';
  type: string;
  description: string;
  metrics?: {
    bandwidth?: string;
    latency?: string;
    packetLoss?: string;
  };
}

const NetworkTimeline: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('24h');
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  const timelineEvents: TimelineEvent[] = [
    {
      id: 1,
      time: '00:00',
      status: 'normal',
      type: 'System Check',
      description: 'Routine system health check completed',
      metrics: {
        bandwidth: '85%',
        latency: '12ms',
        packetLoss: '0.01%'
      }
    },
    {
      id: 2,
      time: '04:30',
      status: 'warning',
      type: 'High Load',
      description: 'Increased traffic detected on Building C router',
      metrics: {
        bandwidth: '92%',
        latency: '45ms',
        packetLoss: '0.5%'
      }
    },
    {
      id: 3,
      time: '08:15',
      status: 'critical',
      type: 'Connection Lost',
      description: 'Lost connection to East Campus data center',
      metrics: {
        bandwidth: 'N/A',
        latency: 'N/A',
        packetLoss: '100%'
      }
    },
    {
      id: 4,
      time: '08:45',
      status: 'normal',
      type: 'Connection Restored',
      description: 'East Campus connection restored after maintenance',
      metrics: {
        bandwidth: '75%',
        latency: '18ms',
        packetLoss: '0.02%'
      }
    },
    {
      id: 5,
      time: '14:00',
      status: 'warning',
      type: 'Performance Degradation',
      description: 'Slower response times in West Wing network',
      metrics: {
        bandwidth: '88%',
        latency: '65ms',
        packetLoss: '1.2%'
      }
    },
    {
      id: 6,
      time: '18:30',
      status: 'normal',
      type: 'Optimization Complete',
      description: 'Network optimization script executed successfully',
      metrics: {
        bandwidth: '70%',
        latency: '15ms',
        packetLoss: '0.01%'
      }
    }
  ];
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical':
        return '#dc2626';
      case 'warning':
        return '#f59e0b';
      default:
        return '#10b981';
    }
  };
  
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains('timeline-drag-handle')) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  return (
    <div 
      className="network-timeline-container"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        cursor: isDragging ? 'grabbing' : 'auto'
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Drag Handle */}
      <div 
        className="timeline-drag-handle"
        onMouseDown={handleMouseDown}
        title="Drag to reposition"
      >
        <span className="drag-dots">⋮⋮</span>
      </div>
      
      {/* Header */}
      <div className="timeline-header">
        <h3 className="timeline-title">Network Activity Timeline</h3>
        <select 
          className="timeline-period-select"
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
        >
          <option value="1h">Last Hour</option>
          <option value="24h">Last 24 Hours</option>
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
        </select>
      </div>
      
      {/* Timeline */}
      <div className="timeline-content">
        <div className="timeline-track">
          {timelineEvents.map((event, index) => (
            <div 
              key={event.id}
              className="timeline-segment"
              style={{
                flex: 1,
                backgroundColor: getStatusColor(event.status),
                opacity: hoveredEvent === event.id ? 1 : 0.8,
                height: hoveredEvent === event.id ? '40px' : '30px',
                margin: hoveredEvent === event.id ? '0' : '5px 0',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={() => setHoveredEvent(event.id)}
              onMouseLeave={() => setHoveredEvent(null)}
            />
          ))}
        </div>
        
        {/* Time Labels */}
        <div className="timeline-labels">
          <span className="time-label">00:00</span>
          <span className="time-label">06:00</span>
          <span className="time-label">12:00</span>
          <span className="time-label">18:00</span>
          <span className="time-label">24:00</span>
        </div>
      </div>
      
      {/* Event Details */}
      {hoveredEvent && (
        <div className="timeline-tooltip">
          {(() => {
            const event = timelineEvents.find(e => e.id === hoveredEvent);
            if (!event) return null;
            
            return (
              <>
                <div className="tooltip-header">
                  <span className="tooltip-time">{event.time}</span>
                  <span 
                    className="tooltip-status"
                    style={{ color: getStatusColor(event.status) }}
                  >
                    {event.status.toUpperCase()}
                  </span>
                </div>
                <div className="tooltip-type">{event.type}</div>
                <div className="tooltip-description">{event.description}</div>
                {event.metrics && (
                  <div className="tooltip-metrics">
                    <div className="metric">
                      <span className="metric-label">Bandwidth:</span>
                      <span className="metric-value">{event.metrics.bandwidth}</span>
                    </div>
                    <div className="metric">
                      <span className="metric-label">Latency:</span>
                      <span className="metric-value">{event.metrics.latency}</span>
                    </div>
                    <div className="metric">
                      <span className="metric-label">Packet Loss:</span>
                      <span className="metric-value">{event.metrics.packetLoss}</span>
                    </div>
                  </div>
                )}
              </>
            );
          })()}
        </div>
      )}
      
      {/* Legend */}
      <div className="timeline-legend">
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#10b981' }}></span>
          <span className="legend-label">Normal</span>
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#f59e0b' }}></span>
          <span className="legend-label">Warning</span>
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#dc2626' }}></span>
          <span className="legend-label">Critical</span>
        </div>
      </div>
    </div>
  );
};

export default NetworkTimeline;