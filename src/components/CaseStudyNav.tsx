import React from 'react';

interface CaseStudyNavProps {
  prevStudy?: {
    title: string;
    slug: string;
  };
  nextStudy?: {
    title: string;
    slug: string;
  };
}

const CaseStudyNav: React.FC<CaseStudyNavProps> = ({ prevStudy, nextStudy }) => {
  return (
    <>
      {prevStudy && (
        <a href={`/case-studies/${prevStudy.slug}`} className="cs-nav-prev">
          <span className="cs-nav-label">Previous</span>
          <span className="cs-nav-title">{prevStudy.title}</span>
        </a>
      )}
      {nextStudy && (
        <a href={`/case-studies/${nextStudy.slug}`} className="cs-nav-next">
          <span className="cs-nav-label">Next</span>
          <span className="cs-nav-title">{nextStudy.title}</span>
        </a>
      )}
    </>
  );
};

export default CaseStudyNav;