import React, { useEffect, useRef, useState } from 'react';

interface Task {
  text: string;
}

interface AnimatedTaskListProps {
  tasks: Task[];
}

const AnimatedTaskList: React.FC<AnimatedTaskListProps> = ({ tasks }) => {
  const [visibleTasks, setVisibleTasks] = useState<Set<number>>(new Set());
  const [checkedTasks, setCheckedTasks] = useState<Set<number>>(new Set());
  const taskRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const checkScrollPosition = () => {
      taskRefs.current.forEach((taskElement, index) => {
        if (!taskElement) return;
        
        const rect = taskElement.getBoundingClientRect();
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        
        // Check if element is in viewport
        if (rect.top <= viewportHeight * 0.8 && rect.bottom >= 0 && !visibleTasks.has(index)) {
          // Stagger the visibility animation
          setTimeout(() => {
            setVisibleTasks(prev => new Set(prev).add(index));
            
            // Stagger the checkbox animation
            setTimeout(() => {
              setCheckedTasks(prev => new Set(prev).add(index));
            }, 400 + (index * 200));
          }, index * 200);
        }
      });
    };

    // Run once on mount
    checkScrollPosition();

    // Add scroll listener with passive flag for better performance
    window.addEventListener('scroll', checkScrollPosition, { passive: true });
    
    // Also check on resize
    window.addEventListener('resize', checkScrollPosition);
    
    return () => {
      window.removeEventListener('scroll', checkScrollPosition);
      window.removeEventListener('resize', checkScrollPosition);
    };
  }, [visibleTasks]);

  return (
    <div style={{
      margin: '20px 0',
      padding: 0,
      maxWidth: '1000px'
    }}>
      <div className="scrollable-tasks" style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        padding: 0
      }}>
        {tasks.map((task, index) => (
          <div
            key={index}
            ref={el => taskRefs.current[index] = el}
            className={`task-item${visibleTasks.has(index) ? ' visible' : ''}${checkedTasks.has(index) ? ' checked' : ''}`}
            data-scroll-animation="checkbox"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              opacity: visibleTasks.has(index) ? 1 : 0,
              transform: visibleTasks.has(index) ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease'
            }}
          >
            <div className="task-checkbox" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '10px',
              backgroundColor: 'rgba(0, 80, 255, 0.05)',
              borderRadius: '50%',
              marginRight: '10px'
            }}>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="28" 
                height="28" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="rgba(0, 80, 255, 0.8)" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline 
                  points="7 13 10 16 17 9" 
                  className="checkmark"
                  style={{
                    opacity: checkedTasks.has(index) ? 1 : 0,
                    strokeDasharray: 20,
                    strokeDashoffset: checkedTasks.has(index) ? 0 : 20,
                    transition: 'opacity 0.4s ease, stroke-dashoffset 1s ease'
                  }}
                />
              </svg>
            </div>
            <p className="task-text" style={{
              fontSize: '1.1rem',
              margin: 0,
              color: 'var(--color-text)',
              fontWeight: 500
            }}>
              {task.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedTaskList;