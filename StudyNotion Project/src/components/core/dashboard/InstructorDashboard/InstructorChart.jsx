import React, { useState } from 'react'
import { Chart,registerables } from 'chart.js'
import { Pie } from 'react-chartjs-2';

Chart.register(...registerables)

function InstructorChart( {courses} ) {

    const [currChart,setCurrChart] = useState();
    const randomColors = (numColors) => {
        const colors = [];

        for(let i=0;i<numColors;i++){
            const color = `rgb(${Math.floor(Math.random() * 256 )}, ${Math.floor(Math.random() * 256 )}, ${Math.floor(Math.random() * 256 )} )`
            colors.push(color);
        }
        return colors;
    }

    // create data for chart displaying student info
    const chartDataForStudents = {
        labels:courses.map( (course) => course.courseName ),
        datasets:[
            {
                data:courses.map( (course) => course.totalStudentsEnrolled ),
                backgroundColor: randomColors(courses.length),
            }
        ]
    }

    // create data for chart displaying income info
    const chartDataForIncome = {
        labels:courses.map( (course) => course.courseName ),
        datasets:[
            {
                data:courses.map( (course) => course.totalAmountGenerated ),
                backgroundColor: randomColors(courses.length),
            }
        ]
    }

    // create options
    const options = {

    }

  return (
    <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6">
        <p className="text-lg font-bold text-richblack-5">Visualize</p>
        <div className="space-x-4 font-semibold">
            <button onClick={ () => setCurrChart("student") }
                className={`rounded-sm p-1 px-3 transition-all duration-200 ${
                    currChart === "student"
                    ? "bg-richblack-700 text-yellow-50"
                        : "text-yellow-400"
                }`} 
            >
                Student
            </button>

            <button onClick={ () => setCurrChart("income") }
                className={`rounded-sm p-1 px-3 transition-all duration-200 ${
                    currChart === "income"
                      ? "bg-richblack-700 text-yellow-50"
                      : "text-yellow-400"
            }`}> 
                Income
            </button>
        </div>
        
        <div className="relative mx-auto aspect-square h-[50%] w-[50%]">
            <Pie
                data={currChart === "student" ? chartDataForStudents : chartDataForIncome}
            />
        </div>
        
    </div>
  )
}

export default InstructorChart