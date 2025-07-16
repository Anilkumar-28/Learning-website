import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import Loading from '../../components/student/Loading';

const MyCourses = () => {
  const { currency, allCourses } = useContext(AppContext);
  const [courses, setCourses] = useState(null);

  const fetchEducatorCourses = async () => {
    setCourses(allCourses);
  };

  useEffect(() => {
    fetchEducatorCourses();
  }, []);

  return courses ? (
    <div className="educourses-container">
      <div className="educourses-wrapper">
        <h2 className="educourses-heading">My Courses</h2>
        <div className="educourses-table-container">
          <table className="educourses-table">
            <thead>
              <tr>
                <th className="educourses-th">All Courses</th>
                <th className="educourses-th">Earnings</th>
                <th className="educourses-th">Students</th>
                <th className="educourses-th">Published</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course._id} className="educourses-row">
                  <td className="educourses-td course">
                    <img src={course.courseThumbnail} alt="Course"
                      className="educourses-thumbnail"/>
                    <span className="educourses-title">{course.courseTitle} </span>
                  </td>
                  <td className="educourses-td">
                    {currency}{' '}
                    {Math.floor(
                      course.enrolledStudents.length *
                        (course.coursePrice -
                          (course.discount * course.coursePrice) / 100)
                    )}
                  </td>
                  <td className="educourses-td">
                    {course.enrolledStudents.length}
                  </td>
                  <td className="educourses-td">
                    {new Date(course.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default MyCourses;
