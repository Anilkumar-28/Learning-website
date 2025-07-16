import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { assets, dummyDashboardData } from '../../assets/assets';
import Loading from '../../components/student/Loading';

const Dashboard = () => {
  const { currency } = useContext(AppContext);
  const [dashboardData, setDashboardData] = useState(null);

  const fetchDashboardData = async () => {
    setDashboardData(dummyDashboardData);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return dashboardData ? (
    <div className="edudashboard-container">
      <div className="edudashboard-metrics">
        <div className="edudashboard-card">
          <img src={assets.patients_icon} alt="Total Enrollments" />
          <div>
            <p className="edudashboard-metric-value">{dashboardData.enrolledStudentsData.length} </p>
            <p className="edudashboard-metric-label">Total Enrollments</p>
          </div>
        </div>

        <div className="edudashboard-card">
          <img src={assets.appointments_icon} alt="Total Courses" />
          <div>
            <p className="edudashboard-metric-value">{dashboardData.totalCourses} </p>
            <p className="edudashboard-metric-label">Total Courses</p>
          </div>
        </div>

        <div className="edudashboard-card">
          <img src={assets.earning_icon} alt="Total Earnings" />
          <div>
            <p className="edudashboard-metric-value">{currency}
              {dashboardData.totalEarnings} </p>
            <p className="edudashboard-metric-label">Total Earnings</p>
          </div>
        </div>
      </div>

      <div className="edudashboard-enrollments">
        <h2 className="edudashboard-section-title">Latest Enrollments</h2>
        <div className="edudashboard-table-container">
          <table className="edudashboard-table">
            <thead>
              <tr>
                <th className="edudashboard-th index">#</th>
                <th className="edudashboard-th">Student Name</th>
                <th className="edudashboard-th">Course Title</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.enrolledStudentsData.map((item, index) => (
                <tr key={index} className="edudashboard-row">
                  <td className="edudashboard-td index">{index + 1}</td>
                  <td className="edudashboard-td name">
                    <img src={item.student.imageUrl} alt="Student"
                      className="edudashboard-avatar" />
                    <span>{item.student.name}</span>
                  </td>
                  <td className="edudashboard-td">{item.courseTitle}</td>
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

export default Dashboard;
