import React, { useState } from 'react';
import { useToast } from './Toast';

interface FormField {
  label: string;
  value?: string;
}

interface FormPreviewTemplateProps {
  title: string;
  description: string;
  fields: FormField[];
  onPreview?: () => void;
  onUseTemplate?: () => void;
  onMore?: () => void;
}

const FormPreviewTemplate: React.FC<FormPreviewTemplateProps> = ({
  title,
  description,
  fields,
  onPreview,
  onUseTemplate,
  onMore
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMoreHovered, setIsMoreHovered] = useState(false);
  const { showToast } = useToast();

  const handlePreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    showToast('Preview functionality would open a modal with full template details.');
    onPreview?.();
  };

  const handleUseTemplate = (e: React.MouseEvent) => {
    e.stopPropagation();
    showToast('Use Template functionality would create a new record with this template.');
    onUseTemplate?.();
  };

  const handleMore = (e: React.MouseEvent) => {
    e.stopPropagation();
    showToast('This would open a menu for additional template options (duplicate, edit, share, etc.)');
    onMore?.();
  };

  return (
    <div 
      id="template-card-interactive"
      style={{
        background: 'white',
        borderRadius: '12px',
        boxShadow: isHovered ? '0 12px 32px rgba(0,0,0,0.12)' : '0 8px 24px rgba(0,0,0,0.08)',
        padding: '20px',
        position: 'relative',
        border: '1px solid #e2e8f0',
        transition: 'all 0.3s ease',
        height: 'auto',
        width: '500px',
        maxWidth: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
        cursor: 'pointer'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-header" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '12px',
        flexShrink: 0
      }}>
        <h3 style={{
          margin: 0,
          fontSize: '20px',
          fontWeight: 600,
          color: '#1a1a1a'
        }}>
          {title}
        </h3>
        <div 
          className="more-menu"
          onClick={handleMore}
          onMouseEnter={() => setIsMoreHovered(true)}
          onMouseLeave={() => setIsMoreHovered(false)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '50%',
            backgroundColor: isHovered && isMoreHovered ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
            position: 'relative',
            zIndex: isHovered ? 20 : 'auto',
            transition: 'background-color 0.3s'
          }}
        >
          <svg width="4" height="16" viewBox="0 0 4 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="2" cy="2" r="2" fill="#555"/>
            <circle cx="2" cy="8" r="2" fill="#555"/>
            <circle cx="2" cy="14" r="2" fill="#555"/>
          </svg>
        </div>
      </div>
      
      <p className="card-description" style={{
        color: '#666',
        marginBottom: '16px',
        fontSize: '14px',
        flexShrink: 0,
        margin: '0 0 16px 0'
      }}>
        {description}
      </p>
      
      <div className="form-preview" style={{
        background: '#f5f7fa',
        padding: '16px',
        borderRadius: '8px',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '4px',
        flex: 1,
        overflowY: 'auto',
        maxHeight: 'calc(300px - 100px)'
      }}>
        {fields.map((field, index) => (
          <div 
            key={index}
            className="form-field"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'stretch'
            }}
          >
            <span style={{
              fontSize: '12px',
              color: '#445',
              marginBottom: '4px'
            }}>
              {field.label}
            </span>
            <div className="field-value" style={{
              background: '#e5e5e5',
              padding: '6px 8px',
              borderRadius: '4px',
              fontSize: '13px',
              color: '#666'
            }}>
              {field.value || 'Value'}
            </div>
          </div>
        ))}
      </div>
      
      <div 
        className="template-card-overlay"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.6)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
          borderRadius: '12px',
          zIndex: 10,
          pointerEvents: isHovered ? 'auto' : 'none'
        }}
      >
        <button 
          className="preview-button"
          onClick={handlePreview}
          style={{
            padding: '10px 20px',
            borderRadius: '24px',
            fontWeight: 500,
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            minWidth: '140px',
            fontSize: '14px',
            background: 'white',
            color: '#0050FF'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#f0f5ff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'white';
          }}
        >
          Preview
        </button>
        <button 
          className="use-template-button"
          onClick={handleUseTemplate}
          style={{
            padding: '10px 20px',
            borderRadius: '24px',
            fontWeight: 500,
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            minWidth: '140px',
            fontSize: '14px',
            background: '#f5a623',
            color: 'white'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#e09612';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#f5a623';
          }}
        >
          Use Template
        </button>
      </div>
    </div>
  );
};

export default FormPreviewTemplate;
