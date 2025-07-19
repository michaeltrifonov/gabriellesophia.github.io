import React from 'react';
import Icon, { IconName } from './icons/Icon';

interface PhilosophyCardProps {
  iconName: IconName;
  title: string;
  description: string;
}

const PhilosophyCard: React.FC<PhilosophyCardProps> = ({ 
  iconName, 
  title, 
  description 
}) => {
  return (
    <div className="philosophy-item">
      <div className="philosophy-icon">
        <Icon name={iconName} size={40} />
      </div>
      <h3 className="philosophy-title">{title}</h3>
      <p className="philosophy-description">
        {description}
      </p>
    </div>
  );
};

export default PhilosophyCard;