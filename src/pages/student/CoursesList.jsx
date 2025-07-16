import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import SearchBar from '../../components/student/SearchBar';
import { useParams } from 'react-router-dom';
import CourseCard from '../../components/student/CourseCard';
import { assets } from '../../assets/assets';
import Footer from '../../components/student/Footer';

const CoursesList = () => {
  const { navigate, allCourses } = useContext(AppContext);
  const { input } = useParams();
  const [filteredCourse, setFilteredCourse] = useState([]);

  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      const tempCourses = allCourses.slice();

      if (input) {
        setFilteredCourse(
          tempCourses.filter((item) =>
            item.courseTitle.toLowerCase().includes(input.toLowerCase())
          )
        );
      } else {
        setFilteredCourse(tempCourses);
      }
    }
  }, [allCourses, input]);

  return (
    <>
      <div className="courses-list-container">
        <div className="courses-list-header">
          <div className="courses-list-title">
            <h1>Course List</h1>
            <p>
              <span className="link-text" onClick={() => navigate('/')}>Home</span> / <span>Course List</span>
            </p>
          </div>
          <SearchBar data={input} />
        </div>

        {input && (
          <div className="filter-tag">
            <p>{input}</p>
            <img src={assets.cross_icon} alt="Clear" onClick={() => navigate('/course-list')}
              className="clear-icon"/>
          </div>
        )}

        <div className="courses-grid">
          {filteredCourse.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CoursesList;
