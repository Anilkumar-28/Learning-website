import React, { useEffect, useRef, useState } from 'react';
import uniqid from 'uniqid';
import Quill from 'quill';
import { assets } from '../../assets/assets';

const AddCourse = () => {
  const quillRef = useRef(null);
  const editorRef = useRef(null);

  const [courseTitle, setCourseTitle] = useState('');
  const [coursePrice, setCoursePrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentChapterId, setCurrentChapterId] = useState(null);

  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: '',
    lectureDuration: '',
    lectureUrl: '',
    isPreviewFree: false,
  });

  const handleChapter = (action, chapterId) => {
    if (action === 'add') {
      const title = prompt('Enter Chapter Name:');
      if (title) {
        const newChapter = {
          chapterId: uniqid(),
          chapterTitle: title,
          chapterContent: [],
          collapsed: false,
          chapterOrder: chapters.length > 0 ? chapters.slice(-1)[0].chapterOrder + 1 : 1,
        };
        setChapters([...chapters, newChapter]);
      }
    } else if (action === 'remove') {
      setChapters(chapters.filter((c) => c.chapterId !== chapterId));
    } else if (action === 'toggle') {
      setChapters(
        chapters.map((chapter) =>
          chapter.chapterId === chapterId ? { ...chapter, collapsed: !chapter.collapsed } : chapter
        )
      );
    }
  };

  const handleLecture = (action, chapterId, lectureIndex) => {
    if (action === 'add') {
      setCurrentChapterId(chapterId);
      setShowPopup(true);
    } else if (action === 'remove') {
      setChapters(
        chapters.map((chapter) => {
          if (chapter.chapterId === chapterId) {
            chapter.chapterContent.splice(lectureIndex, 1);
          }
          return chapter;
        })
      );
    }
  };

  const addLecture = () => {
    setChapters(
      chapters.map((chapter) => {
        if (chapter.chapterId === currentChapterId) {
          const newLecture = {
            ...lectureDetails,
            lectureOrder:
              chapter.chapterContent.length > 0
                ? chapter.chapterContent.slice(-1)[0].lectureOrder + 1
                : 1,
            lectureId: uniqid(),
          };
          chapter.chapterContent.push(newLecture);
        }
        return chapter;
      })
    );
    setShowPopup(false);
    setLectureDetails({
      lectureTitle: '',
      lectureDuration: '',
      lectureUrl: '',
      isPreviewFree: false,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
      });
    }
  }, []);

  return (
    <div className="educourse-editor-container">
      <form onSubmit={handleSubmit} className="educourse-editor-form">
        {/* Course Title */}
        <div className="educourse-editor-field">
          <label>Course Title</label>
          <input type="text" value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} required />
        </div>

        {/* Course Description */}
        <div className="educourse-editor-field">
          <label>Course Description</label>
          <div ref={editorRef} className="educourse-editor-editor" />
        </div>

        {/* Price and Thumbnail */}
        <div className="educourse-editor-flex-row">
          <div className="educourse-editor-field inline">
            <label>Course Price</label>
            <input type="number" value={coursePrice}
              onChange={(e) => setCoursePrice(e.target.value)} required />
          </div>

          <div className="educourse-editor-thumbnail">
            <label>Course Thumbnail</label>
            <label htmlFor="thumbnailImage" className="educourse-editor-upload">
              <img src={assets.file_upload_icon} alt="upload" className='file-upload-icon'/>
              <input type="file" id="thumbnailImage"
                onChange={(e) => setImage(e.target.files[0])} accept="image/*"
                hidden />
              {image && (
                <img src={URL.createObjectURL(image)}
                  className="educourse-editor-thumbnail-preview" alt="preview" />
              )}
            </label>
          </div>
        </div>

        {/* Discount */}
        <div className="educourse-editor-field">
          <label>Discount %</label>
          <input type="number" value={discount}
            onChange={(e) => setDiscount(e.target.value)} min={0} max={100} required />
        </div>

        {/* Chapters */}
        <div>
          {chapters.map((chapter, chapterIndex) => (
            <div key={chapterIndex} className="educourse-editor-chapter">
              <div className="educourse-editor-chapter-header">
                <div>
                  <img src={assets.dropdown_icon}
                    className={`educourse-editor-dropdown ${chapter.collapsed ? 'collapsed' : ''}`}
                    onClick={() => handleChapter('toggle', chapter.chapterId)} alt="toggle" />
                  <span> {chapterIndex + 1}. {chapter.chapterTitle} </span>
                </div>
                <span>{chapter.chapterContent.length} Lectures</span>
                <img src={assets.cross_icon}
                  className="educourse-editor-remove-icon"
                  onClick={() => handleChapter('remove', chapter.chapterId)} alt="remove" />
              </div>
              {!chapter.collapsed && (
                <div className="educourse-editor-lectures">
                  {chapter.chapterContent.map((lecture, lectureIndex) => (
                    <div key={lectureIndex} className="educourse-editor-lecture-item">
                      <span>
                        {lectureIndex + 1}. {lecture.lectureTitle} - {lecture.lectureDuration} mins -{' '}
                        <a href={lecture.lectureUrl} target="_blank" rel="noreferrer">Link</a> -{' '}
                        {lecture.isPreviewFree ? 'Free Preview' : 'Paid'}
                      </span>
                      <img src={assets.cross_icon}
                        onClick={() => handleLecture('remove', chapter.chapterId, lectureIndex)} alt="remove" />
                    </div>
                  ))}
                  <div className="educourse-editor-add-lecture" onClick={() => handleLecture('add', chapter.chapterId)}>+ Add Lecture
                  </div>
                </div>
              )}
            </div>
          ))}
          <div className="educourse-editor-add-chapter" onClick={() => handleChapter('add')}>
            + Add Chapter
          </div>
        </div>

        {/* Popup */}
        {showPopup && (
          <div className="educourse-editor-popup-overlay">
            <div className="educourse-editor-popup">
              <h2>Add Lecture</h2>
              <div className="educourse-editor-popup-field">
                <label>Lecture Title</label>
                <input type="text" value={lectureDetails.lectureTitle}
                  onChange={(e) => setLectureDetails({ ...lectureDetails, lectureTitle: e.target.value })} />
              </div>
              <div className="educourse-editor-popup-field">
                <label>Duration (minutes)</label>
                <input type="number" value={lectureDetails.lectureDuration}
                  onChange={(e) => setLectureDetails({ ...lectureDetails, lectureDuration: e.target.value })} />
              </div>
              <div className="educourse-editor-popup-field">
                <label>Lecture URL</label>
                <input type="text" value={lectureDetails.lectureUrl}
                  onChange={(e) => setLectureDetails({ ...lectureDetails, lectureUrl: e.target.value })} />
              </div>
              <div className="educourse-editor-checkbox">
                <label>Is Preview Free?</label>
                <input type="checkbox" checked={lectureDetails.isPreviewFree}
                  onChange={(e) => setLectureDetails({ ...lectureDetails, isPreviewFree: e.target.checked })} />
              </div>
              <button type="button" onClick={addLecture}>Add</button>
              <img src={assets.cross_icon} onClick={() => setShowPopup(false)} alt="close"
                className="educourse-editor-close-popup" />
            </div>
          </div>
        )}

        <button type="submit" className="course-editor-submit">ADD</button>
      </form>
    </div>
  );
};

export default AddCourse;
