import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import CourseCards from '../components/CourseCard'
import { addStudent, removeStudent } from '../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import '../components/CourseCard.css'

const CourseList = () => {

    const [filteredCourses, setFilteredCourses] = useState([])
    const [allCourses, setCourses] = useState([])

    const { id } = useParams();
    const dispatch = useDispatch()
    const student = useSelector((state)=>state.student.student)

    useEffect(() => {

        if(id){
            if(!student){
                axios.get(`http://alameno-task.onrender.com/api/students/${id}`).then(res => {
                    console.log(res.data)
                    dispatch(addStudent(res.data))
                })
            } else {
                dispatch(removeStudent())
                axios.get(`http://alameno-task.onrender.com/api/students/${id}`).then(res => {
                    console.log(res.data)
                    dispatch(addStudent(res.data))
                })
            }
        }

        axios.get('http://alameno-task.onrender.com/api/courses')
        .then(res => {
            console.log(res.data)
            setCourses(res.data)
            setFilteredCourses(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    const handleSearch = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filtered = allCourses.filter(course => 
            course.name.toLowerCase().includes(searchTerm) || 
            course.instructor.toLowerCase().includes(searchTerm)
        );
        setFilteredCourses(filtered);
    }

  return (
    <div className='bg-transparent' style={{background: 'none'}}>
        {/* making a search bar */}
        <div className="search-container form d-flex justify-content-center" style={{marginTop: "2rem", marginBottom: '2rem'}} >
            <input onChange={handleSearch} type="text" placeholder="Search courses by name" className="search-input form-control" style={{width: '50vw'}} />
        </div>
        <h3 className='mx-5' style={{fontWeight: '600', color:'white'}}>Courses</h3>
        <hr />
        <div className="courses-container">
            {
                filteredCourses.map((course, index) => {
                    if(course.likes.includes(student.id)){
                        return (
                            <CourseCards likes = {true} key={index} id={course.id} syllabus={course.syllabus} instructor={course.instructor} progress={0} completedChapters={0} totalChapters={course.syllabus.length} namee={course.name} />
                        )
                    }
                    return (
                        <CourseCards key={index} id={course.id} syllabus={course.syllabus} instructor={course.instructor} progress={0} completedChapters={0} totalChapters={course.syllabus.length} namee={course.name} />
                    )
                })
            }
        </div>
    </div>
  )
}

export default CourseList