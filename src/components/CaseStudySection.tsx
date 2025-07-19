import React from 'react';

interface CaseStudySectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  isAlt?: boolean;
}

const CaseStudySection: React.FC<CaseStudySectionProps> = ({ 
  id, 
  title, 
  children, 
  isAlt = false 
}) => {
  return (
    <section id={id} className={`cs-section ${isAlt ? 'cs-section-alt' : ''}`}>
      <div className="cs-section-grid">
        <div className="cs-sidebar">
          <h2 className="cs-sidebar-title">{title}</h2>
        </div>
        <div className="cs-content">
          {children}
        </div>
      </div>
    </section>
  );
};

export default CaseStudySection;