import React from 'react';
import { Link } from 'react-router-dom';


const CoursesSection = () => {
  return (
    <div className="courses-section">
      <h2 className="courses-heading">Learn from the best</h2>
      <p className="courses-description">
        Discover our top-rated courses across various categories. From coding and design to business and wellness, our courses are crafted to deliver results.
      </p>
      <Link
        to="/course-list"
        onClick={() => scrollTo(0, 0)}
        className="courses-button"
      >
        Show all courses
      </Link>
    </div>
  );
};

export default CoursesSection;
