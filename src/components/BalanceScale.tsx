import React, { useState } from 'react';

interface ScaleItem {
  label: string;
  weight: number;
}

const BalanceScale: React.FC = () => {
  const [leftWeight, setLeftWeight] = useState(50);
  const rightWeight = 100 - leftWeight;
  
  const leftItems: ScaleItem[] = [
    { label: '5-month timeline', weight: 20 },
    { label: 'Feature parity requirement', weight: 15 },
    { label: 'Existing tech stack', weight: 10 },
    { label: 'Limited resources', weight: 5 },
  ];
  
  const rightItems: ScaleItem[] = [
    { label: 'Cross-org consolidation', weight: 20 },
    { label: 'Scalable architecture', weight: 15 },
    { label: 'Future integrations', weight: 10 },
    { label: 'Extensible design', weight: 5 },
  ];
  
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLeftWeight(parseInt(e.target.value));
  };
  
  // Calculate tilt angle based on weight difference
  const tiltAngle = (leftWeight - rightWeight) * 0.3; // Max 15 degrees tilt
  
  return (
    <div className="balance-scale-container">
      <div className="balance-scale">
        {/* Central Pillar */}
        <div className="scale-pillar"></div>
        
        {/* Beam */}
        <div 
          className="scale-beam"
          style={{
            transform: `rotate(${tiltAngle}deg)`,
            transition: 'transform 0.5s ease-out'
          }}
        >
          {/* Left Side */}
          <div className="scale-side scale-left">
            <div className="scale-plate">
              <h4 className="scale-title">MVP Constraints</h4>
              <div className="scale-items">
                {leftItems.map((item, index) => (
                  <div 
                    key={index} 
                    className="scale-item"
                    style={{
                      opacity: leftWeight > index * 25 ? 1 : 0.4,
                      transition: 'opacity 0.3s ease'
                    }}
                  >
                    {item.label}
                  </div>
                ))}
              </div>
              <div className="scale-weight">{leftWeight}%</div>
            </div>
            <div className="scale-chain"></div>
          </div>
          
          {/* Right Side */}
          <div className="scale-side scale-right">
            <div className="scale-plate">
              <h4 className="scale-title">Future Vision</h4>
              <div className="scale-items">
                {rightItems.map((item, index) => (
                  <div 
                    key={index} 
                    className="scale-item"
                    style={{
                      opacity: rightWeight > index * 25 ? 1 : 0.4,
                      transition: 'opacity 0.3s ease'
                    }}
                  >
                    {item.label}
                  </div>
                ))}
              </div>
              <div className="scale-weight">{rightWeight}%</div>
            </div>
            <div className="scale-chain"></div>
          </div>
        </div>
      </div>
      
      {/* Control Slider */}
      <div className="scale-controls">
        <label className="scale-slider-label">
          <span className="slider-label-left">Focus on MVP</span>
          <input
            type="range"
            min="0"
            max="100"
            value={leftWeight}
            onChange={handleSliderChange}
            className="scale-slider"
          />
          <span className="slider-label-right">Focus on Future</span>
        </label>
        <p className="scale-description">
          Drag the slider to see how different priorities affect the balance between immediate needs and long-term vision
        </p>
      </div>
    </div>
  );
};

export default BalanceScale;