import React from 'react';
import '../styles/skills.css';

interface SkillItemProps {
  skill: string;
  icon: 'user-experience' | 'user-research' | 'prototyping' | 'wireframing' | 'visual-design' | 'project-management';
}

const SkillItem: React.FC<SkillItemProps> = ({ skill, icon }) => {
  return (
    <li className="skill-item">
      <span className={`skill-icon ${icon}`}></span>
      {skill}
    </li>
  );
};

export default SkillItem;
