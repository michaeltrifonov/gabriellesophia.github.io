import React from 'react';

interface TrainingItem {
  title: string;
  provider: string;
}

interface TrainingListProps {
  items: TrainingItem[];
}

const TrainingList: React.FC<TrainingListProps> = ({ items }) => {
  return (
    <ul className="training-list">
      {items.map((item, index) => (
        <li key={index}>
          <div className="training-item">{item.title}</div>
          <div className="training-provider">{item.provider}</div>
        </li>
      ))}
    </ul>
  );
};

export default TrainingList;