import React, { useState, useMemo } from 'react';
import '../styles/commenting-panel.css';

interface Comment {
  id: number;
  tag1: string;
  tag2: string;
  tag3: string;
  username: string;
  date: string;
  comment: string;
}

interface CommentItemProps {
  tag1: string;
  tag2: string;
  tag3: string;
  username: string;
  date: string;
  comment: string;
}

const CommentItem: React.FC<CommentItemProps> = ({ tag1, tag2, tag3, username, date, comment }) => {
  return (
    <div className="comment-item">
      <div className="comment-tags">
        {tag1 && <span className="comment-tag">{tag1}</span>}
        {tag2 && <span className="comment-tag">{tag2}</span>}
        {tag3 && <span className="comment-tag comment-tag-highlight">{tag3}</span>}
      </div>
      <div className="comment-header">
        <div className="comment-author">
          <div className="author-avatar">A</div>
          <span className="author-name">{username}</span>
        </div>
        <div className="comment-meta">
          <span className="comment-date">{date}</span>
          <button className="comment-menu-btn">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon-small" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
          </button>
        </div>
      </div>
      <p className="comment-text">{comment}</p>
    </div>
  );
};

const CommentingPanel: React.FC = () => {
  const [isAddCommentFormVisible, setIsAddCommentFormVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample comments data
  const comments: Comment[] = [
    {
      id: 1,
      tag1: 'Greenfield',
      tag2: 'Resource Planning',
      tag3: 'Plan of Record (POR)',
      username: '@SarahMiller',
      date: '08/01/2024 14:30',
      comment: 'The current headcount allocation for Q3 greenfield deployments needs adjustment. We\'re seeing higher than expected resource requirements for the new fulfillment center launches. Recommending an increase of 2 C&T and 1 FF to support the accelerated timeline.'
    },
    {
      id: 2,
      tag1: 'Brownfield',
      tag2: 'System Upgrades',
      tag3: 'Engineering Support',
      username: '@MarcusWong',
      date: '08/01/2024 11:15',
      comment: 'Based on our experience with the recent brownfield upgrades, we should allocate additional electrical engineering resources. The complexity of retrofitting existing facilities is requiring 30% more time than initially estimated. Can we discuss reallocating from corporate projects?'
    },
    {
      id: 3,
      tag1: 'University Outreach',
      tag2: 'Talent Pipeline',
      tag3: 'Business Program Management',
      username: '@EmilyDavis',
      date: '08/01/2024 09:45',
      comment: 'Great progress on the university partnerships! The recruitment numbers are exceeding expectations. However, we\'ll need to increase our mentorship capacity. Proposing to add 1 senior engineer to support the incoming interns for the fall program.'
    },
    {
      id: 4,
      tag1: 'Resource Management',
      tag2: 'Capacity Planning',
      tag3: 'Business Program Management',
      username: '@JamesPark',
      date: '07/29/2024 13:45',
      comment: 'We need to revisit the resource allocation for this project. Current estimates don\'t account for the additional integration work required with the new robotics systems. Requesting a follow-up meeting to discuss adjustments to both C&T and FF allocations.'
    },
    {
      id: 5,
      tag1: 'System Engineering',
      tag2: 'Technical Architecture',
      tag3: 'Engineering Support',
      username: '@AlexChen',
      date: '07/28/2024 09:22',
      comment: 'The current C&T allocation seems insufficient based on last quarter\'s performance metrics. Can we review the historical data and adjust? I believe we\'ll need at least 0.5 more headcount to meet the upcoming deliverable requirements for the robotics platform integration.'
    }
  ];

  const filteredComments = useMemo(() => {
    if (!searchTerm.trim()) return comments;
    
    const lowerSearchTerm = searchTerm.toLowerCase();
    return comments.filter(comment => {
      return (
        comment.tag1.toLowerCase().includes(lowerSearchTerm) ||
        comment.tag2.toLowerCase().includes(lowerSearchTerm) ||
        comment.tag3.toLowerCase().includes(lowerSearchTerm) ||
        comment.username.toLowerCase().includes(lowerSearchTerm) ||
        comment.comment.toLowerCase().includes(lowerSearchTerm)
      );
    });
  }, [searchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleModalBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsAddCommentFormVisible(false);
    }
  };

  const handleModalContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleAddCommentClick = () => {
    setIsAddCommentFormVisible(true);
  };

  const handleCancelClick = () => {
    setIsAddCommentFormVisible(false);
  };

  const handleSubmitClick = () => {
    // In a real implementation, this would submit to an API
    alert('Comment would be submitted (demo only)');
    setIsAddCommentFormVisible(false);
  };

  return (
    <div className="commenting-panel">
      {/* Header */}
      <div className="panel-header">
        <h2 className="panel-title">Comments</h2>
        <button className="panel-close-btn">
          <svg xmlns="http://www.w3.org/2000/svg" className="icon-small" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      {/* Search and Add Comment */}
      <div className="panel-search-section">
        <div className="search-container">
          <div className="search-icon">
            <svg className="icon-small" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            className="search-input"
            placeholder="Search Comments"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <button className="add-comment-btn" onClick={handleAddCommentClick}>
          Add Comment
        </button>
      </div>
      
      {/* Comments List */}
      <div className="comments-list">
        {filteredComments.map(comment => (
          <CommentItem
            key={comment.id}
            tag1={comment.tag1}
            tag2={comment.tag2}
            tag3={comment.tag3}
            username={comment.username}
            date={comment.date}
            comment={comment.comment}
          />
        ))}
      </div>
      
      {/* Add Comment Modal */}
      {isAddCommentFormVisible && (
        <div className="modal-backdrop" onClick={handleModalBackdropClick}>
          <div className="modal-content" onClick={handleModalContentClick}>
            {/* Modal Header */}
            <div className="modal-header">
              <h3 className="modal-title">Add Comment</h3>
              <button className="modal-close-btn" onClick={handleCancelClick}>
                <svg className="icon-small" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Form Fields */}
            <div className="modal-form">
              {/* Your Role Field */}
              <div className="form-field">
                <label className="form-label">Your Role</label>
                <select className="form-select">
                  <option value="">Select your role...</option>
                  <option value="falcon-stl">Falcon STL</option>
                  <option value="resource-manager">Resource Manager</option>
                  <option value="admin">Admin</option>
                  <option value="program-manager">Program Manager</option>
                </select>
              </div>
              
              {/* Program Field */}
              <div className="form-field">
                <label className="form-label">Program</label>
                <select className="form-select">
                  <option value="">Select program...</option>
                  <option value="greenfield">Greenfield</option>
                  <option value="brownfield">Brownfield</option>
                  <option value="university">University Outreach</option>
                  <option value="robotics">Robotics Platform</option>
                </select>
              </div>
              
              {/* Deliverable Field (Optional) */}
              <div className="form-field">
                <label className="form-label">Deliverable (Optional)</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter deliverable..."
                />
              </div>
              
              {/* Comment Field */}
              <div className="form-field">
                <label className="form-label">Comment</label>
                <textarea
                  className="form-textarea"
                  rows={4}
                  placeholder="Enter your comment..."
                />
              </div>
            </div>
            
            {/* Form Actions */}
            <div className="modal-actions">
              <button className="btn-secondary" onClick={handleCancelClick}>
                Cancel
              </button>
              <button className="btn-primary" onClick={handleSubmitClick}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentingPanel;