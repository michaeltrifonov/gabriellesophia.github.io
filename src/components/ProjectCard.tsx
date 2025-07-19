import React from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  thumbnail: string;
  thumbnailAlt: string;
  tags: string[];
  caseStudyUrl: string;
  isTransparent?: boolean;
  isLast?: boolean;
  index?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  thumbnail,
  thumbnailAlt,
  tags,
  caseStudyUrl,
  isTransparent = true,
  isLast = false,
  index = 0
}) => {
  const isEven = index % 2 === 1; // 0-indexed, so second item (index 1) is "even"
  return (
    <div className="project-card" style={{ 
      paddingBottom: isLast ? '0' : '30px',
      marginBottom: '30px'
    }}>
      <div 
        className="project-thumbnail" 
        style={{
          ...(isTransparent ? { background: 'transparent', boxShadow: 'none' } : {}),
          order: isEven ? 1 : 2
        }}
      >
        <img 
          src={thumbnail} 
          alt={thumbnailAlt} 
          className={isTransparent ? 'transparent-image' : ''}
          loading="lazy"
        />
      </div>
      <div className="project-info" style={{ order: isEven ? 2 : 1 }}>
        <div className="project-tags">
          {tags.map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>
        <h3 className="project-title">{title}</h3>
        <p className="project-description">{description}</p>
        <a href={caseStudyUrl} className="project-link">
          View Case Study →
        </a>
      </div>
      {!isLast && (
        <div style={{
          position: 'absolute',
          bottom: '-30px',
          left: '0',
          right: '0',
          height: '1px',
          backgroundColor: '#E0E0E0'
        }} />
      )}
    </div>
  );
};

export default ProjectCard;
