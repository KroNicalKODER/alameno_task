import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const student = useSelector((state) => state.student.student);
  return (
    student && (
      <div className="container-fluid">
        <header className=" text-white text-center p-4">
          <h1 style={{fontWeight: '600'}}>User Dashboard</h1>
          <div className="" style={{ borderRadius: "50%" }}>
            <img src="https://avatar.iran.liara.run/public" alt="avatar" style={{ width: "100px" }} />
          </div>
          <h2>
            {student.name} (@{student.username})
          </h2>
        </header>

        <div className="row mt-4">
          <div className="col">
            <h3 className="text-white">Enrolled Courses</h3>
            <div className="card" style={{ backgroundColor: 'transparent' }}>
              <div className="card-body" style={{ backgroundColor: 'transparent' }}>
                <ul className="list-group" style={{ backgroundColor: 'transparent' }}>
                  {student.enrolled_courses.map((course) => (
                    <Link to={`/course/${course.course_id}`}>
                      <li
                        key={course.course_id}
                        style={{ backgroundColor: 'transparent' }}
                        className="list-group-item text-white d-flex justify-content-between"
                      >
                        <span>Course ID: {course.course_id}</span>
                        <span>
                          {course.completed_weeks}/{course.total_weeks} weeks
                          completed
                        </span>
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
