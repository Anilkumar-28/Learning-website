import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import CourseCard from './CourseCard';

const CoursesSection = () => {

  const {allCourses} = useContext(AppContext)

  return (
    <div className="courses-section">
      <h2 className="courses-heading">Learn from the best</h2>
      <p className="courses-description">Discover our top-rated courses across various categories. From coding and design to <br/> business and wellness, our courses are crafted to deliver results. </p>
      <div className="courses-grid">
      {allCourses.slice(0, 4).map((course, index) => (<CourseCard key={index} course={course} />))} </div>
      <Link to="/course-list" onClick={() => scrollTo(0, 0)} className="courses-button">
        Show all courses
      </Link>
    </div>
  );
};

export default CoursesSection;
