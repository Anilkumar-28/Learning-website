import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import Loading from '../../components/student/Loading';
import { assets } from '../../assets/assets';
import humanizeDuration from 'humanize-duration';
import Footer from '../../components/student/Footer';
import Youtube from 'react-youtube'

const CourseDetails = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);
  const [playerData, setplayerData] = useState(null);

  const {
    allCourses,
    calculateRating,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoOfLectures,
    currency,
  } = useContext(AppContext);

  const fetchCourseData = async () => {
    const findCourse = allCourses.find((course) => course._id === id);
    setCourseData(findCourse);
  };

  useEffect(() => {
    fetchCourseData();
  }, [allCourses]);

  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return courseData ? (
    <>
      <div className="course-details-container">
        <div className="course-info">
          <h1 className="course-title">{courseData.courseTitle}</h1>
          <p className="course-short-desc"
            dangerouslySetInnerHTML={{ __html: courseData.courseDescription.slice(0, 200) }}
          ></p>

          <div className="course-rating-bar">
            <p>{calculateRating(courseData)}</p>
            <div className="rating-stars">
              {[...Array(5)].map((_, i) => (
                <img key={i}
                  src={i < Math.floor(calculateRating(courseData)) ? assets.star : assets.star_blank} alt="star" />
              ))}
            </div>
            <p>({courseData.courseRatings.length} ratings)</p>
            <p>{courseData.enrolledStudents.length} students</p>
          </div>

          <p className="course-by">Course by <span className="course-by-name">TalentSprint</span></p>

          <div className="course-structure">
            <h2>Course Structure</h2>
            <div className="chapters">
              {courseData.courseContent.map((chapter, index) => (
                <div className="chapter-card" key={index}>
                  <div className="chapter-header" onClick={() => toggleSection(index)}>
                    <div className="chapter-title">
                      <img src={assets.down_arrow_icon} alt="arrow"
                        className={`arrow-icon ${openSections[index] ? 'rotate' : ''}`}
                      />
                      <p>{chapter.chapterTitle}</p>
                    </div>
                    <p>{chapter.chapterContent.length} lectures - {calculateChapterTime(chapter)}</p>
                  </div>
                  <div className={`chapter-content ${openSections[index] ? 'open' : ''}`}>
                    <ul>
                      {chapter.chapterContent.map((lecture, i) => (
                        <li key={i}>
                          <img src={assets.play_icon} alt="play" />
                          <div className="lecture-details">
                            <p>{lecture.lectureTitle}</p>
                            <div>
                              {lecture.isPreviewFree && <p onClick={() => setplayerData({
                                videoId: lecture.lectureUrl.split('/').pop()
                              })} className="preview-btn">Preview</p>}
                              <p className="duration">
                                {humanizeDuration(lecture.lectureDuration * 60 * 1000, { units: ['h', 'm'] })}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="course-description-full">
            <h3>Course Description</h3>
            <p dangerouslySetInnerHTML={{ __html: courseData.courseDescription }}></p>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="course-sidebar">

          {playerData ? 
                <Youtube videoId={playerData.videoId} opts={{playerVars: { autoplay: 1 },}}
                iframeClassName="custom-youtube-iframe"/> :
                <img src={courseData.courseThumbnail} alt="course thumbnail" />}
          <div className="course-price-box">
            <div className="price-alert">
                <img src={assets.time_left_clock_icon} alt="time left clock icon" />
                <p><strong>5 days</strong> left at this price!</p>
            </div>

            <div className="course-pricing">
              <h2>{currency}{(courseData.coursePrice - courseData.discount * courseData.coursePrice / 100).toFixed(2)}</h2>
              <span className="original">{currency}{courseData.coursePrice}</span>
              <span className="discount">{courseData.discount}% off</span>
            </div>

            <div className="course-summary">
              <div><img src={assets.star} alt="" /><p>{calculateRating(courseData)}</p></div>
              <div><img src={assets.time_clock_icon} alt="" /><p>{calculateCourseDuration(courseData)}</p></div>
              <div><img src={assets.lesson_icon} alt="" /><p>{calculateNoOfLectures(courseData)} lessons</p></div>
            </div>

            <button className="enroll-btn">{isAlreadyEnrolled ? 'Already Enrolled' : 'Enroll Now'}</button>

            <div className="course-includes">
              <h3>What's in the course?</h3>
              <ul>
                <li>Lifetime access with free updates.</li>
                <li>Step-by-step, hands-on project guidance.</li>
                <li>Downloadable resources and source code.</li>
                <li>Quizzes to test your knowledge.</li>
                <li>Certificate of completion.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <Loading />
  );
};

export default CourseDetails;
