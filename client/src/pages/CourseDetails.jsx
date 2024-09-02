import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './CourseDetails.css'; // Make sure to import your CSS file

const CourseDetails = () => {
  const [course, setCourse] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/courses/${id}`)
      .then((res) => {
        setCourse(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <>
      {
        course && (
          <div className="">
            <div className='row' style={{ margin: '6rem 3rem' }}>
              <div className="col mx-3 d-flex align-items-center" style={{ height: '60vh' }}>
                <img src={course.thumbnail} alt={course.name} style={{ width: '100%', height: 'auto' }} />
              </div>
              <div className="col mx-3 d-flex justify-content-center flex-column">
                <h1 style={{ fontWeight: '600', color: 'white' }}>
                  {course.name}
                </h1>
                <h6 className='text-light d-flex justify-content-between'>
                  <span>By - {course.instructor}</span>
                  <span className='text-light'>
                    {course.duration}
                  </span>
                </h6>
                <hr />
                <h5>
                  <span className='text-light'>
                    {course.description}
                  </span>
                </h5>
                <h5 className=''>
                  <span className="badge bg-success" style={{ marginRight: '1rem' }}>{course.location}</span>
                  <span className="badge bg-info" style={{ marginRight: '1rem' }}>{course.enrollmentStatus}</span>
                </h5>
                <h5 className='text-light'>
                  <span>{course.schedule}</span>
                </h5>
                <hr />
                <h5 className='text-light'>
                  <div>Pre-Requisites:</div>
                  <div className='d-flex flex-wrap mt-2'>
                    {
                      course.prerequisites.map((prerequisite, index) => {
                        return (
                          <span key={index} className='badge bg-light text-dark' style={{ marginRight: '1rem' }}>{prerequisite}</span>
                        );
                      })
                    }
                  </div>
                </h5>
              </div>
            </div>

            {/* Weeks Syllabus Section */}
            <div className='row' style={{ margin: '6rem 4rem' }}>
              <h4 style={{fontWeight: '600', color: 'white', marginBottom: '2rem'}}>Weekly Schedule : </h4>
              <div className="accordion" id="accordionExample">
                {
                  course.syllabus.map((week, index) => (
                    <div className="accordion-item transparent-bg" key={index}>
                      <h2 className="accordion-header" id={`heading${index}`}>
                        <span className='d-flex px-3'><input type="checkbox" name="" id={`checkbox-${index}`} />
                        <button className="accordion-button collapsed text-light transparent-bg" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="false" aria-controls={`collapse${index}`}>
                          Week {week.week}: {week.topic}
                        </button></span>
                      </h2>
                      <div id={`collapse${index}`} className="accordion-collapse collapse" aria-labelledby={`heading${index}`} data-bs-parent="#accordionExample">
                        <div className="accordion-body text-light transparent-bg">
                          {week.content}
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        )
      }
    </>
  );
};

export default CourseDetails;
