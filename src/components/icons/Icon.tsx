import React from 'react';
import { 
  HumanCenteredIcon,
  SystemsMindedIcon,
  VisionDrivenIcon,
  CollaborationFocusedIcon,
  CuriosityLedIcon,
  SolutionScrappyIcon
} from './PhilosophyIcons';

export type IconName = 
  | 'human-centered'
  | 'systems-minded'
  | 'vision-driven'
  | 'collaboration-focused'
  | 'curiosity-led'
  | 'solution-scrappy';

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  className?: string;
}

const iconMap = {
  'human-centered': HumanCenteredIcon,
  'systems-minded': SystemsMindedIcon,
  'vision-driven': VisionDrivenIcon,
  'collaboration-focused': CollaborationFocusedIcon,
  'curiosity-led': CuriosityLedIcon,
  'solution-scrappy': SolutionScrappyIcon
};

const Icon: React.FC<IconProps> = ({ 
  name, 
  size = 40, 
  color = 'currentColor',
  className = ''
}) => {
  const IconComponent = iconMap[name];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }
  
  return (
    <IconComponent 
      size={size} 
      color={color} 
      className={className}
    />
  );
};

export default Icon;