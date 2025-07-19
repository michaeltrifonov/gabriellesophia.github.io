import React, { useState } from 'react';
import { useToast } from './Toast';

interface CardViewTemplateProps {
  title: string;
  description: string;
  onPreview?: () => void;
  onSelect?: () => void;
  onMore?: () => void;
}

const CardViewTemplate: React.FC<CardViewTemplateProps> = ({
  title,
  description,
  onPreview,
  onSelect,
  onMore
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { showToast } = useToast();

  const handlePreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    showToast('Preview functionality would open a modal with full template details.');
    onPreview?.();
  };

  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    showToast('Select functionality would use this template for a new record.');
    onSelect?.();
  };

  const handleMore = (e: React.MouseEvent) => {
    e.stopPropagation();
    showToast('This would open a menu for additional template options (duplicate, edit, share, etc.)');
    onMore?.();
  };

  return (
    <div 
      className="card-craft horizontal-card" 
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '24px',
        background: 'white',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        boxShadow: isHovered ? '0 12px 32px rgba(0,0,0,0.12)' : '0 8px 24px rgba(0,0,0,0.08)',
        margin: '20px 0',
        height: 'auto',
        width: '500px',
        maxWidth: '100%',
        position: 'relative',
        transition: 'all 0.3s ease',
        transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
        cursor: 'pointer'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-craft-content" style={{ 
        flex: 3,
        paddingRight: '30px'
      }}>
        <h3 className="card-craft-title" style={{
          fontSize: '20px',
          fontWeight: 700,
          color: '#1a202c',
          margin: '0 0 4px 0'
        }}>
          {title}
        </h3>
        <p className="card-craft-description" style={{
          fontSize: '14px',
          color: '#4a5568',
          margin: 0,
          maxWidth: '90%'
        }}>
          {description}
        </p>
      </div>
      <div className="card-craft-actions" style={{
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        flex: 1
      }}>
        <button 
          className="card-preview-btn"
          onClick={handlePreview}
          style={{
            background: 'transparent',
            color: '#3182ce',
            minWidth: '90px',
            border: '1px solid #3182ce',
            fontWeight: 500,
            padding: '8px 16px',
            borderRadius: '24px',
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#ebf8ff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}
        >
          Preview
        </button>
        <button 
          className="card-select-btn"
          onClick={handleSelect}
          style={{
            background: '#f6ad55',
            color: 'white',
            minWidth: '90px',
            border: 'none',
            fontWeight: 500,
            padding: '8px 16px',
            borderRadius: '24px',
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#ed8936';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#f6ad55';
          }}
        >
          Select
        </button>
        <button 
          className="card-more-btn"
          onClick={handleMore}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            padding: '8px',
            width: '34px',
            height: '34px',
            cursor: 'pointer',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f7fafc';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CardViewTemplate;