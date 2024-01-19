import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { getInstructorData } from '../../../../services/operations/profileAPI';
import InstructorChart from './InstructorChart';
import { Link } from 'react-router-dom';
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import { courseEndpoints } from '../../../../services/apis';

export default function Instructor() {
  const [loading, setLoading] = useState(false);
  const [instructorData, setInstructorData] = useState(null);
  const [courses, setCourse] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile)

  useEffect(() => {
    const getCourseDataWithStats = async() => {
      setLoading(true);
      const instructorApiData = await getInstructorData(token);
      const result = await fetchInstructorCourses(token);

      if (instructorApiData.length) {
        setInstructorData(instructorApiData)
      }

      if (result) {
        setCourse(result);
      }
      setLoading(false);
    }
    getCourseDataWithStats()
  }, [])

  const totalAmount = instructorData?.reduce((acc, curr) => acc + curr.totalAmountGenerated, 0);
  const totalStudents = instructorData?.reduce((acc, curr) => curr.totalStudentsEnrolled, 0)

  return (
    // check routes and everything about api call
    // also add route in app.js
    <div>
      <div>Hi {user?.firstName} </div>
      <p>Lets Start Something New</p>

      <div>
        {loading ? (<div className='spinner'></div>) :
          courseEndpoints.length > 0 ?
            (
              <div>
                <div>
                  <InstructorChart courses={instructorData} />

                  <div>
                    <p>Statistics</p>
                    <div>
                      <p>Total Courses</p>
                      <p>{courses.length}</p>
                    </div>
                  </div>

                  <div>
                    <p>Total Students</p>
                    <p>{totalStudents}</p>
                  </div>

                  <div>
                    <p>Total Income</p>
                    <p>{totalAmount}</p>
                  </div>
                </div>

                <div>
                    {/* course cards */}
                    <div>
                      <p>Your Courses</p>
                      <Link to="/dashboard/my-courses">
                        <p>View All</p>
                      </Link>
                    </div>

                    <div>
                      {
                        courses.slice(0,3).map( (course,index) =>(
                          <div key={index}>
                            <img src={course.thumbnail} />

                            <div>
                              <p>{course.courseName}</p>
                              <div>
                                <p>{course.studentsEnrolled.length} Students</p>
                                <p>|</p>
                                <p>Rs. {course.price}</p>
                              </div>
                            </div>
                          </div>
                         ) )
                      }
                    </div>
                </div>
              </div>
            )
            :
            (<div>
                <p>
                  You have not created any course yet
                </p>

                <Link to={"/dashboard/addCourse"}>
                    Create a course
                </Link>
            </div>)
        }
      </div>
    </div>
  )
}
