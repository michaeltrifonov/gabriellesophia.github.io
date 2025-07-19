import React from 'react';

interface TimelineEntryProps {
  period: string;
  role: string;
  company: string;
  industry: string;
  responsibilities?: string[];
  isEducation?: boolean;
  educationDetails?: string;
}

const TimelineEntry: React.FC<TimelineEntryProps> = ({
  period,
  role,
  company,
  industry,
  responsibilities = [],
  isEducation = false,
  educationDetails
}) => {
  return (
    <div className="timeline-entry">
      <div className="timeline-entry-content">
        <div className="timeline-left">
          <h3 className="timeline-period">{period}</h3>
          <p className="timeline-role">{role}</p>
        </div>
        <div className="timeline-right">
          <h3 className="timeline-company">{company}</h3>
          <p className="timeline-industry" data-industry={industry}>{industry}</p>
        </div>
      </div>
      <div className="timeline-details">
        {isEducation && educationDetails && (
          <p className="education-details">{educationDetails}</p>
        )}
        {responsibilities.length > 0 && (
          <ul className="job-responsibilities">
            {responsibilities.map((resp, index) => (
              <li key={index}>{resp}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TimelineEntry;