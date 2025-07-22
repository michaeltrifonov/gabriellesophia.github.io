import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './UnfoldableTable.css';

interface DeliverableRow {
  id: string;
  name: string;
  priority: string;
  ctHeadcount: number;
  ffHeadcount: number;
  vCtHeadcount: number;
  vFfHeadcount: number;
}

interface ProgramData {
  id: string;
  name: string;
  priority: number;
  hcTotal: number;
  expanded: boolean;
  subRows: DeliverableRow[];
}

const UnfoldableTable: React.FC = () => {
  const [expandedPrograms, setExpandedPrograms] = useState<Set<string>>(new Set());
  const [showFilterTooltip, setShowFilterTooltip] = useState<{ show: boolean; text: string; x: number; y: number }>({
    show: false,
    text: '',
    x: 0,
    y: 0
  });

  const programData: ProgramData[] = [
    {
      id: "p1",
      name: "Plan of Record (POR)",
      priority: 25,
      hcTotal: 42,
      expanded: false,
      subRows: [
        {
          id: "d1",
          name: "Brownfield",
          priority: "P0",
          ctHeadcount: 8,
          ffHeadcount: 6,
          vCtHeadcount: 4,
          vFfHeadcount: 3
        },
        {
          id: "d2",
          name: "Greenfield",
          priority: "P1",
          ctHeadcount: 6,
          ffHeadcount: 5,
          vCtHeadcount: 3,
          vFfHeadcount: 2
        }
      ]
    },
    {
      id: "p2",
      name: "Business Program Management",
      priority: 15,
      hcTotal: 36,
      expanded: false,
      subRows: [
        {
          id: "d4",
          name: "Resource Management",
          priority: "P0",
          ctHeadcount: 7,
          ffHeadcount: 5,
          vCtHeadcount: 4,
          vFfHeadcount: 2
        },
        {
          id: "d5",
          name: "Robotics Experience",
          priority: "P2",
          ctHeadcount: 5,
          ffHeadcount: 4,
          vCtHeadcount: 3,
          vFfHeadcount: 2
        },
        {
          id: "d6",
          name: "University Outreach",
          priority: "P1",
          ctHeadcount: 4,
          ffHeadcount: 3,
          vCtHeadcount: 2,
          vFfHeadcount: 1
        }
      ]
    },
    {
      id: "p3",
      name: "Engineering Support",
      priority: 75,
      hcTotal: 28,
      expanded: false,
      subRows: [
        {
          id: "d7",
          name: "Electrical",
          priority: "P1",
          ctHeadcount: 6,
          ffHeadcount: 4,
          vCtHeadcount: 3,
          vFfHeadcount: 2
        },
        {
          id: "d8",
          name: "System Engineering",
          priority: "P2",
          ctHeadcount: 4,
          ffHeadcount: 3,
          vCtHeadcount: 2,
          vFfHeadcount: 1
        },
        {
          id: "d9",
          name: "Corporate Projects",
          priority: "P4",
          ctHeadcount: 2,
          ffHeadcount: 2,
          vCtHeadcount: 1,
          vFfHeadcount: 1
        }
      ]
    }
  ];

  const toggleProgram = (programId: string) => {
    const newExpanded = new Set(expandedPrograms);
    if (newExpanded.has(programId)) {
      newExpanded.delete(programId);
    } else {
      newExpanded.add(programId);
    }
    setExpandedPrograms(newExpanded);
  };

  const getPriorityClass = (priority: number) => priority <= 50 ? "priority-low" : "priority-high";

  const handleFilterClick = (e: React.MouseEvent<HTMLButtonElement>, filterName: string) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    setShowFilterTooltip({
      show: true,
      text: `Filter by ${filterName} would appear here`,
      x: rect.left - 100,
      y: rect.bottom + 5
    });

    setTimeout(() => {
      setShowFilterTooltip({ show: false, text: '', x: 0, y: 0 });
    }, 2000);
  };

  return (
    <div className="unfoldable-table-container">
        <table className="unfoldable-table">
        <thead>
          <tr>
            <th rowSpan={2}></th>
            <th rowSpan={2}>
              Program Priority
              <button 
                className="filter-btn"
                title="Filter by program priority"
                onClick={(e) => handleFilterClick(e, 'program priority')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                </svg>
              </button>
            </th>
            <th rowSpan={2}>
              Program
              <button 
                className="filter-btn"
                title="Filter programs"
                onClick={(e) => handleFilterClick(e, 'programs')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                </svg>
              </button>
            </th>
            <th rowSpan={2}>
              Deliverable
              <button 
                className="filter-btn" 
                title="Filter by deliverable"
                onClick={(e) => handleFilterClick(e, 'deliverable')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                </svg>
              </button>
            </th>
            <th rowSpan={2}>
              Deliverable Priority
              <button 
                className="filter-btn"
                title="Filter by deliverable priority"
                onClick={(e) => handleFilterClick(e, 'deliverable priority')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                </svg>
              </button>
            </th>
            <th rowSpan={2}>HC Total</th>
            <th colSpan={2} className="group-header">Group A</th>
            <th colSpan={2} className="group-header">Group B</th>
          </tr>
          <tr>
            <th>C&T</th>
            <th>FF</th>
            <th>C&T</th>
            <th>FF</th>
          </tr>
        </thead>
        <tbody>
          {programData.map(program => {
            const isExpanded = expandedPrograms.has(program.id);
            
            // Calculate group totals
            const groupATotalCT = program.subRows.reduce((sum, d) => sum + d.ctHeadcount, 0);
            const groupATotalFF = program.subRows.reduce((sum, d) => sum + d.ffHeadcount, 0);
            const groupVTotalCT = program.subRows.reduce((sum, d) => sum + d.vCtHeadcount, 0);
            const groupVTotalFF = program.subRows.reduce((sum, d) => sum + d.vFfHeadcount, 0);

            return (
              <React.Fragment key={program.id}>
                <tr className="program-row">
                  <td className="expander-cell">
                    <button 
                      className="expander-btn" 
                      aria-expanded={isExpanded}
                      aria-label={`Expand ${program.name}`}
                      onClick={() => toggleProgram(program.id)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </button>
                  </td>
                  <td><span className={`priority-badge ${getPriorityClass(program.priority)}`}>{program.priority}</span></td>
                  <td className="program-name">{program.name}</td>
                  <td></td>
                  <td></td>
                  <td>{program.hcTotal}</td>
                  <td>{groupATotalCT}</td>
                  <td>{groupATotalFF}</td>
                  <td>{groupVTotalCT}</td>
                  <td>{groupVTotalFF}</td>
                </tr>
                {program.subRows.map(deliverable => {
                  const totalHC = deliverable.ctHeadcount + deliverable.ffHeadcount + 
                                deliverable.vCtHeadcount + deliverable.vFfHeadcount;
                  
                  return (
                    <tr 
                      key={deliverable.id} 
                      className={`deliverable-row ${isExpanded ? '' : 'hidden'}`}
                    >
                      <td></td>
                      <td></td>
                      <td></td>
                      <td className="deliverable-name">{deliverable.name}</td>
                      <td><span className={`priority-badge ${getPriorityClass(program.priority)}`}>{deliverable.priority}</span></td>
                      <td>{totalHC}</td>
                      <td>{deliverable.ctHeadcount}</td>
                      <td>{deliverable.ffHeadcount}</td>
                      <td>{deliverable.vCtHeadcount}</td>
                      <td>{deliverable.vFfHeadcount}</td>
                    </tr>
                  );
                })}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
      
      {showFilterTooltip.show && ReactDOM.createPortal(
        <div 
          className="filter-indicator" 
          style={{ 
            display: 'block',
            position: 'fixed',
            left: showFilterTooltip.x,
            top: showFilterTooltip.y
          }}
        >
          {showFilterTooltip.text}
        </div>,
        document.body
      )}
    </div>
  );
};

export default UnfoldableTable;