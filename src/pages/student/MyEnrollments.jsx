import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import Footer from '../../components/student/Footer';

const MyEnrollments = () => {
  const { enrolledCourses, calculateCourseDuration, navigate } = useContext(AppContext);

  const [progressArray] = useState([
    { lectureCompleted: 2, totalLectures: 4 },
    { lectureCompleted: 1, totalLectures: 5 },
    { lectureCompleted: 3, totalLectures: 6 },
    { lectureCompleted: 4, totalLectures: 4 },
    { lectureCompleted: 0, totalLectures: 3 },
    { lectureCompleted: 5, totalLectures: 7 },
    { lectureCompleted: 6, totalLectures: 8 },
    { lectureCompleted: 2, totalLectures: 6 },
    { lectureCompleted: 4, totalLectures: 10 },
    { lectureCompleted: 3, totalLectures: 5 },
    { lectureCompleted: 7, totalLectures: 7 },
    { lectureCompleted: 1, totalLectures: 4 },
    { lectureCompleted: 0, totalLectures: 2 },
    { lectureCompleted: 5, totalLectures: 5 },
  ]);

  return (
    <>
      <div className="enrollments-container">
        <h1 className="enrollments-heading">My Enrollments</h1>

        <table className="enrollments-table">
          <thead>
            <tr>
              <th>Course</th>
              <th>Duration</th>
              <th>Completed</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {enrolledCourses.map((course, index) => {
              const progress = progressArray[index];
              const percent =
                progress && progress.totalLectures
                  ? (progress.lectureCompleted * 100) / progress.totalLectures: 0;

              return (
                <tr key={index}>
                  <td>
                    <div className="mycourse-info">
                      <img src={course.courseThumbnail} alt={course.courseTitle}
                        className="mycourse-thumbnail" />
                      <div>
                        <p className="mycourse-title">{course.courseTitle}</p>
                        <div className="progress-bar-container">
                          <div className="progress-bar" style={{ width: `${percent}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{calculateCourseDuration(course)}</td>
                  <td>
                    {progress
                      ? `${progress.lectureCompleted} / ${progress.totalLectures}`
                      : '0 / 0'}{' '}
                    Lectures
                  </td>
                  <td>
                    <button className="status-button"
                      onClick={() => navigate('/player/' + course._id)}>
                      {progress &&
                      progress.lectureCompleted / progress.totalLectures === 1
                        ? 'Completed'
                        : 'On Going'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default MyEnrollments;
