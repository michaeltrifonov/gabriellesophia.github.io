import React, { useState, useRef, useEffect } from 'react';

interface DataPoint {
  motorType: string;
  voltage: string;
  torque: string;
  efficiency: string;
  cost: string;
  selected: boolean;
}

const ParallelCategoriesChart: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredPath, setHoveredPath] = useState<number | null>(null);
  const [selectedPaths, setSelectedPaths] = useState<Set<number>>(new Set());
  const [isDragging, setIsDragging] = useState(false);
  const [dragAxis, setDragAxis] = useState<string | null>(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  // Sample data representing different motor configurations
  const dataPoints: DataPoint[] = [
    { motorType: 'DC Brushed', voltage: '12V', torque: 'Low', efficiency: 'Medium', cost: 'Low', selected: false },
    { motorType: 'DC Brushless', voltage: '24V', torque: 'Medium', efficiency: 'High', cost: 'Medium', selected: false },
    { motorType: 'AC Induction', voltage: '48V', torque: 'High', efficiency: 'High', cost: 'High', selected: false },
    { motorType: 'Stepper', voltage: '12V', torque: 'Medium', efficiency: 'Low', cost: 'Medium', selected: false },
    { motorType: 'Servo', voltage: '24V', torque: 'High', efficiency: 'Medium', cost: 'High', selected: false },
    { motorType: 'DC Brushed', voltage: '24V', torque: 'Medium', efficiency: 'Low', cost: 'Low', selected: false },
    { motorType: 'DC Brushless', voltage: '48V', torque: 'High', efficiency: 'Very High', cost: 'High', selected: false },
    { motorType: 'AC Induction', voltage: '110V', torque: 'Very High', efficiency: 'Medium', cost: 'Very High', selected: false },
  ];
  
  const categories = {
    motorType: ['DC Brushed', 'DC Brushless', 'AC Induction', 'Stepper', 'Servo'],
    voltage: ['12V', '24V', '48V', '110V'],
    torque: ['Low', 'Medium', 'High', 'Very High'],
    efficiency: ['Low', 'Medium', 'High', 'Very High'],
    cost: ['Low', 'Medium', 'High', 'Very High']
  };
  
  const axisLabels = ['Motor Type', 'Voltage', 'Torque', 'Efficiency', 'Cost'];
  
  useEffect(() => {
    drawChart();
  }, [hoveredPath, selectedPaths]);
  
  const getPosition = (category: string, value: string, axisIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const width = canvas.width;
    const height = canvas.height;
    const padding = 60;
    const axisSpacing = (width - 2 * padding) / (axisLabels.length - 1);
    
    const x = padding + axisIndex * axisSpacing;
    const categoryKey = Object.keys(categories)[axisIndex];
    const values = categories[categoryKey as keyof typeof categories];
    const index = values.indexOf(value);
    const spacing = (height - 2 * padding) / (values.length - 1);
    const y = padding + index * spacing;
    
    return { x, y };
  };
  
  const drawChart = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const width = canvas.width;
    const height = canvas.height;
    const padding = 60;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw axes
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 2;
    
    axisLabels.forEach((label, i) => {
      const x = padding + i * ((width - 2 * padding) / (axisLabels.length - 1));
      
      // Draw axis line
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, height - padding);
      ctx.stroke();
      
      // Draw axis label
      ctx.fillStyle = '#374151';
      ctx.font = 'bold 14px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(label, x, 30);
      
      // Draw category labels
      const categoryKey = Object.keys(categories)[i];
      const values = categories[categoryKey as keyof typeof categories];
      
      ctx.font = '12px Inter, sans-serif';
      ctx.fillStyle = '#6b7280';
      
      values.forEach((value, j) => {
        const y = padding + j * ((height - 2 * padding) / (values.length - 1));
        ctx.textAlign = i === 0 ? 'right' : i === axisLabels.length - 1 ? 'left' : 'center';
        const offsetX = i === 0 ? -10 : i === axisLabels.length - 1 ? 10 : 0;
        ctx.fillText(value, x + offsetX, y + 4);
        
        // Draw tick marks
        ctx.beginPath();
        ctx.moveTo(x - 5, y);
        ctx.lineTo(x + 5, y);
        ctx.stroke();
      });
    });
    
    // Draw data paths
    dataPoints.forEach((point, index) => {
      const isHovered = hoveredPath === index;
      const isSelected = selectedPaths.has(index);
      
      ctx.beginPath();
      ctx.strokeStyle = isSelected ? '#054DA7' : isHovered ? '#3b82f6' : 'rgba(59, 130, 246, 0.3)';
      ctx.lineWidth = isSelected ? 3 : isHovered ? 2 : 1;
      
      // Draw path through each axis
      axisLabels.forEach((_, i) => {
        const categoryKey = Object.keys(categories)[i];
        const value = point[categoryKey as keyof DataPoint] as string;
        const pos = getPosition(categoryKey, value, i);
        
        if (i === 0) {
          ctx.moveTo(pos.x, pos.y);
        } else {
          ctx.lineTo(pos.x, pos.y);
        }
      });
      
      ctx.stroke();
      
      // Draw points on axes
      if (isHovered || isSelected) {
        axisLabels.forEach((_, i) => {
          const categoryKey = Object.keys(categories)[i];
          const value = point[categoryKey as keyof DataPoint] as string;
          const pos = getPosition(categoryKey, value, i);
          
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, 4, 0, 2 * Math.PI);
          ctx.fillStyle = isSelected ? '#054DA7' : '#3b82f6';
          ctx.fill();
        });
      }
    });
  };
  
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Check if hovering over a path
    let foundPath = false;
    dataPoints.forEach((_, index) => {
      // Simplified hit detection - in real implementation would be more precise
      const tolerance = 5;
      // This is a simplified version - actual implementation would check distance to path
      if (!foundPath && Math.random() > 0.8) { // Simulated hit detection
        setHoveredPath(index);
        foundPath = true;
      }
    });
    
    if (!foundPath) {
      setHoveredPath(null);
    }
  };
  
  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (hoveredPath !== null) {
      const newSelected = new Set(selectedPaths);
      if (newSelected.has(hoveredPath)) {
        newSelected.delete(hoveredPath);
      } else {
        newSelected.add(hoveredPath);
      }
      setSelectedPaths(newSelected);
    }
  };
  
  return (
    <div className="parallel-categories-container">
      <div className="chart-header">
        <h3 className="chart-title">Motor Selection Analysis</h3>
        <p className="chart-description">
          Interactive parallel categories visualization showing relationships between motor characteristics.
          Click on paths to select them, hover to highlight.
        </p>
      </div>
      
      <div className="chart-canvas-container">
        <canvas
          ref={canvasRef}
          width={800}
          height={400}
          className="parallel-categories-canvas"
          onMouseMove={handleMouseMove}
          onClick={handleClick}
          style={{ cursor: hoveredPath !== null ? 'pointer' : 'default' }}
        />
      </div>
      
      <div className="chart-controls">
        <div className="control-group">
          <button 
            className="control-btn"
            onClick={() => setSelectedPaths(new Set())}
            disabled={selectedPaths.size === 0}
          >
            Clear Selection
          </button>
          <span className="selection-count">
            {selectedPaths.size} path{selectedPaths.size !== 1 ? 's' : ''} selected
          </span>
        </div>
        
        <div className="chart-legend">
          <div className="legend-item">
            <div className="legend-color" style={{ background: 'rgba(59, 130, 246, 0.3)' }}></div>
            <span>Unselected</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ background: '#3b82f6' }}></div>
            <span>Hovered</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ background: '#054DA7' }}></div>
            <span>Selected</span>
          </div>
        </div>
      </div>
      
      <div className="chart-note">
        <p><strong>Note:</strong> This is a simplified visualization. In the actual Cookie.io application, 
        this chart would show real engineering parameters with advanced filtering and analysis capabilities.</p>
      </div>
    </div>
  );
};

export default ParallelCategoriesChart;