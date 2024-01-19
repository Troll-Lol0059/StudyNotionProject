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
    <div>
        <p>Visualize</p>
        <div>
            <button onClick={ () => setCurrChart("student") }>
                Student
            </button>

            <button onClick={ () => setCurrChart("income") }> 
                Income
            </button>
        </div>

        <Pie
            data={currChart === "student" ? chartDataForStudents : chartDataForIncome}
        />
    </div>
  )
}

export default InstructorChart