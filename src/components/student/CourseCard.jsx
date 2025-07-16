import React, { useContext } from 'react';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {

  const { currency, calculateRating } = useContext(AppContext);

  return (
    <Link to={'/course/' + course._id} onClick={() => scrollTo(0, 0)} className="course-card">
      <img className="course-thumbnail" src={course.courseThumbnail} alt="Course Thumbnail" />
      <div className="course-content">
        <h3 className="course-title">{course.courseTitle}</h3>
        <p className="course-educator">Talent Sprint</p>
        <div className="course-rating">
          <p>{calculateRating(course)}</p>
          <div className="course-stars">
            {[...Array(5)].map((_, i) => (
              <img key={i} src={i < Math.floor(calculateRating(course)) ? assets.star : assets.star_blank} alt="star" className="star-icon" /> ))}
          </div>
          <p className="rating-count">{course.courseRatings.length}</p>
        </div>
        <p className="course-price">
          {currency}{(course.coursePrice - (course.discount * course.coursePrice) / 100).toFixed(2)} </p>
      </div>
    </Link>
  );
};

export default CourseCard;
