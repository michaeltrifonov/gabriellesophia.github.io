import React, { useState, useMemo } from 'react';
import '../styles/history-panel.css';

interface HistoryItem {
  id: number;
  group: string;
  program: string;
  deliverable: string;
  headcountType: 'FF' | 'CT';
  starling: boolean;
  username: string;
  userRole: string;
  date: string;
  previous: string;
  current: string;
}

const HistoryPanel: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data matching the original
  const historyItems: HistoryItem[] = [
    {
      id: 1,
      group: 'SOLARIS',
      program: 'Helios Matrix',
      deliverable: 'Robot Performance characteriza...',
      headcountType: 'FF',
      starling: true,
      username: '@AlexChen',
      userRole: 'STL',
      date: '08/01/2024 00:00',
      previous: '0.50',
      current: '2.00'
    },
    {
      id: 2,
      group: 'SOLARIS',
      program: 'Photon Analysis',
      deliverable: 'Spectrum Engine',
      headcountType: 'FF',
      starling: true,
      username: '@MariaSanchez',
      userRole: 'Resource Manager',
      date: '07/30/2024 14:22',
      previous: '0.50',
      current: '2.00'
    },
    {
      id: 3,
      group: 'PRISM',
      program: 'Refraction System',
      deliverable: 'Light Pattern Framework',
      headcountType: 'CT',
      starling: false,
      username: '@JaneDoe',
      userRole: 'Admin',
      date: '07/29/2024 14:30',
      previous: '1.25',
      current: '3.00'
    },
    {
      id: 4,
      group: 'NEXUS',
      program: 'Central Core',
      deliverable: 'Network Implementation',
      headcountType: 'CT',
      starling: true,
      username: '@JohnSmith',
      userRole: 'Resource Manager',
      date: '07/25/2024 09:15',
      previous: '0.75',
      current: '1.50'
    },
    {
      id: 5,
      group: 'AURORA',
      program: 'Borealis Project',
      deliverable: 'Light System',
      headcountType: 'FF',
      starling: false,
      username: '@SarahJohnson',
      userRole: 'STL',
      date: '07/23/2024 16:45',
      previous: '1.00',
      current: '1.75'
    }
  ];

  // Filter items based on search
  const filteredItems = useMemo(() => {
    if (!searchQuery) return historyItems;
    
    const query = searchQuery.toLowerCase();
    return historyItems.filter(item => 
      item.group.toLowerCase().includes(query) ||
      item.program.toLowerCase().includes(query) ||
      item.deliverable.toLowerCase().includes(query) ||
      item.username.toLowerCase().includes(query) ||
      item.userRole.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const getRoleBadgeClass = (role: string) => {
    switch(role) {
      case 'STL':
        return 'role-badge-stl';
      case 'Admin':
        return 'role-badge-admin';
      case 'Resource Manager':
        return 'role-badge-rm';
      default:
        return 'role-badge-default';
    }
  };

  const getAvatarChar = (username: string) => {
    return username.charAt(1).toUpperCase();
  };

  return (
    <div className="history-panel-container">
      {/* Header */}
      <div className="history-panel-header">
        <h2>History</h2>
        <div className="history-panel-actions">
          <button className="history-action-btn" title="Export History">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </button>
          <button className="history-action-btn" title="Close">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="history-search-container">
        <div className="history-search-wrapper">
          <svg xmlns="http://www.w3.org/2000/svg" className="search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search History..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="history-search-input"
          />
        </div>
      </div>

      {/* History Items */}
      <div className="history-items-container">
        {filteredItems.length === 0 ? (
          <div className="history-empty">No history items found.</div>
        ) : (
          filteredItems.map(item => (
            <div key={item.id} className="history-item">
              {/* Tags Section */}
              <div className="history-item-tags">
                <div className="tag-row">
                  <span className="tag tag-group">{item.group}</span>
                  <span className="tag tag-deliverable" title={item.deliverable}>
                    {item.deliverable}
                  </span>
                </div>
                <div className="tag-row">
                  {item.starling && <span className="tag tag-starling">Starling</span>}
                  <span className={`tag ${item.headcountType === 'FF' ? 'tag-ff' : 'tag-ct'}`}>
                    {item.headcountType}
                  </span>
                  <span className={`tag ${getRoleBadgeClass(item.userRole)}`}>
                    {item.userRole}
                  </span>
                </div>
              </div>

              {/* User Info */}
              <div className="history-user-section">
                <div className="history-user-info">
                  <div className="user-avatar-small">{getAvatarChar(item.username)}</div>
                  <span className="user-name">{item.username}</span>
                </div>
                <span className="change-date">{item.date}</span>
              </div>

              {/* Previous/Current Values */}
              <div className="history-values-grid">
                <div className="value-section">
                  <div className="value-label">Previous</div>
                  <div className="value-amount">{item.previous}</div>
                </div>
                <div className="value-section value-section-right">
                  <div className="value-label">Current</div>
                  <div className="value-amount">{item.current}</div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HistoryPanel;