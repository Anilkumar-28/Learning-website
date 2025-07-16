import React, { useEffect, useState } from 'react';
import { dummyStudentEnrolled } from '../../assets/assets';
import Loading from '../../components/student/Loading';

const StudentsEnrolled = () => {
  const [enrolledStudents, setEnrolledStudents] = useState(null);

  const fetchEnrolledStudents = async () => {
    setEnrolledStudents(dummyStudentEnrolled);
  };

  useEffect(() => {
    fetchEnrolledStudents();
  }, []);

  return enrolledStudents ? (
    <div className="eduenrolled-container">
      <div className="eduenrolled-table-wrapper">
        <table className="eduenrolled-table">
          <thead>
            <tr>
              <th className="eduenrolled-th index">#</th>
              <th className="eduenrolled-th">Student Name</th>
              <th className="eduenrolled-th">Course Title</th>
              <th className="eduenrolled-th date">Date</th>
            </tr>
          </thead>
          <tbody>
            {enrolledStudents.map((item, index) => (
              <tr key={index} className="eduenrolled-row">
                <td className="eduenrolled-td index">{index + 1}</td>
                <td className="eduenrolled-td name">
                  <img src={item.student.imageUrl} alt="student"
                    className="eduenrolled-avatar" />
                  <span>{item.student.name}</span>
                </td>
                <td className="eduenrolled-td">{item.courseTitle}</td>
                <td className="eduenrolled-td date">
                  {new Date(item.purchaseDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default StudentsEnrolled;
