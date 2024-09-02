import React, {useRef} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from'react-redux';

const CourseCard = ( course ) => {
  const student = useSelector((state)=>state.student.student)
  const ref = useRef();
  
  const handleLikes = async (e) => {
    
    console.log("like clicked", course.id, course.likes)
    if(!course.likes){
      await axios.post(`http://localhost:5000/api/like/${course.id}`, { studentId: student.id }).then((res => {
        console.log("like added", res.data)
        ref.current.className = "badge bg-primary"
      })).catch(err => {
        console.log(err, "error aaya")
      })
    } else {

    }
  }

  const handleRemoveLikes = async (e) => {
    console.log("like clicked", course.id, course.likes)
    if(course.likes){
      await axios.post(`http://localhost:5000/api/removeLike/${course.id}`, { studentId: student.id }).then((res => {
        console.log("like added", res.data)
        ref.current.className = "badge bg-danger"
      })).catch(err => {
        console.log(err, "error aaya")
      })
    } else {}
  }

  return (
    <>
      <div className="course">
        <div className="course-preview">
          <h6>CURRENTLY ON</h6>
          <h2 style={{marginRight: '10px'}}>{ course.syllabus[0].topic.length > 24 ? course.syllabus[0].topic.substr(0,20) + "..." : course.syllabus[0].topic }</h2>
          <Link to={`/course/${course.id}`}>
            View all chapters <i className="fas fa-chevron-right"></i>
          </Link>
        </div>
        <div className="course-info">
          <div className="progress-container">
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${course.completedChapters / course.totalChapters}%` }}
                ></div>
            </div>
            <span className="progress-text">
              {course.completedChapters}/{course.totalChapters} Challenges
            </span>
          </div>
          <h6 className='instructor-name'>By- {course.instructor}</h6>
          <h2>{ course.namee }</h2>
          {
            course.likes ? <button ref={ref} className='badge bg-primary' onClick={handleRemoveLikes}>like</button> : <button ref={ref} className='badge bg-danger' onClick={handleLikes}>like</button>
          }
        </div>
      </div>
    </>
  );
};

export default CourseCard;
