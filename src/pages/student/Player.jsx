import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { useParams } from 'react-router-dom';
import { assets } from '../../assets/assets';
import humanizeDuration from 'humanize-duration';
import YouTube from 'react-youtube';
import Footer from '../../components/student/Footer';
import Rating from '../../components/student/Rating';

const Player = () => {
  const { enrolledCourses, calculateChapterTime } = useContext(AppContext);
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [playerData, setPlayerData] = useState(null);

  useEffect(() => {
    const course = enrolledCourses.find(course => course._id === courseId);
    setCourseData(course);
  }, [enrolledCourses, courseId]);

  const toggleSection = (index) => {
    setOpenSections(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <>
      <div className="player-container">
        <div className="player-left">
          <h2 className="section-title">Course Structure</h2>
          <div className="player-chapters">
            {courseData && courseData.courseContent.map((chapter, index) => (
              <div className="player-card" key={index}>
                <div className="player-card-header" onClick={() => toggleSection(index)}>
                  <div className="player-card-title">
                    <img src={assets.down_arrow_icon} alt="arrow" className={`player-arrow-icon ${openSections[index] ? 'rotate' : ''}`} />
                    <p>{chapter.chapterTitle}</p>
                  </div>
                  <p>{chapter.chapterContent.length} lectures - {calculateChapterTime(chapter)}</p>
                </div>
                <div className={`player-content-section ${openSections[index] ? 'open' : ''}`}>
                  <ul>
                    {chapter.chapterContent.map((lecture, i) => (
                      <li key={i}>
                        <img src={false ? assets.blue_tick_icon : assets.play_icon} alt="play" />
                        <div className="player-lecture-info">
                          <p>{lecture.lectureTitle}</p>
                          <div>
                            {lecture.lectureUrl && (
                              <p className="player-watch-btn" onClick={() => setPlayerData({ ...lecture, chapter: index + 1, lecture: i + 1 })}>
                                Watch</p> )}
                            <p className="player-duration">{humanizeDuration(lecture.lectureDuration * 60000, { units: ['h', 'm'] })}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <div className="rating-bar">
            <h1>Rate this Course:</h1>
            <Rating initialRating={0} />
          </div>
        </div>

        <div className="player-right">
          {playerData ? (
            <div className="video-wrapper">
              <YouTube videoId={playerData.lectureUrl.split('/').pop()}
                iframeClassName="custom-youtube-iframe" />
              <div className="video-footer">
                <p>{playerData.chapter}.{playerData.lecture} {playerData.lectureTitle}</p>
                <button className="mark-btn">{false ? 'Completed' : 'Mark Complete'}</button>
              </div>
            </div>
          ) : (
            <img src={courseData ? courseData.courseThumbnail : ''} alt="course thumbnail" className="thumbnail-preview" />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Player;
