import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Footer from '../components/common/Footer';
import { apiConnector } from '../services/apiconnector';
import { categories } from '../services/apis';
import { getCatalog } from '../services/operations/pageAndComponentData';
import { useSelector } from 'react-redux';
import CourseSlider from '../components/core/Catalog/CourseSlider';
import Course_Card from '../components/core/Catalog/CourseCard';
import ReviewSlider from '../components/common/ReviewSlider'

function Catalog() {
  const { loading } = useSelector((state) => state.profile)
  const { catalogName } = useParams();
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState('');

  // get current seelected category whenever the url changes
  useEffect(() => {
    ; (async () => {
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        const category_id = res?.data?.data?.filter(
          (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
        )[0]._id
        setCategoryId(category_id)
      } catch (error) {
        console.log("Could not fetch Categories.", error)
      }
    })()
  }, [catalogName])


  useEffect(() => {
    if (categoryId) {
      ; (async () => {
        try {
          const res = await getCatalog(categoryId)
          setCatalogPageData(res);
          console.log("Printing result", res);
        } catch (error) {
          console.log(error)
        }
      })()
    }
  }, [categoryId])

  if (loading || !catalogPageData) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }
  if (!loading && !catalogPageData.success) {
    return (
      <div>Not Found</div>
    )
  }

  return (
    <div className='w-full flex flex-col gap-8'>
      <div className='w-full bg-richblack-800 py-8 flex flex-col'>
        <div className='w-[90%] mx-auto'>
          <p className='text-richblack-200 text-[16px] font-[500]'>Home / Catalog /
            <span className='text-yellow-50'> {catalogPageData?.data?.selectedCategory?.name}</span>
          </p>

          <p className='text-richblack-5 font-[500] text-[30px] pt-4 pb-6'>{catalogPageData?.data?.selectedCategory?.name}</p>
          <p className='tex-[14px] font-[400] text-richblack-200 pb-8'>{catalogPageData?.data?.selectedCategory?.description}</p>
        </div>
      </div>

      <div className='lg:w-[90%] mx-auto text-richblack-300'>
        <div className='lg:flex flex-col gap-8'>
          {/* section 1 */}
          <div className='space-y-3'>
            <h1 className='text-richblack-5 font-[600] text-[30px]'>Courses to get you started</h1>
            <div className='flex gap-x-3'>
              <div>Most Popular</div>
              <div>New</div>
            </div>
            <CourseSlider Courses={catalogPageData?.data?.selectedCategory?.courses} />
          </div>

          {/* section 2 */}
          <div className='flex flex-col gap-4'>
            <p className='text-richblack-5 font-[600] text-[26px]'>Top Courses in {catalogPageData?.data?.selectedCategory?.name}</p>
            <div>
              <CourseSlider Courses={catalogPageData?.data?.mostSellingCourses} />
            </div>
          </div>

          {/* section 3 */}
          <div className=" mx-auto box-content w-full max-w-maxContentTab py-12 lg:max-w-maxContent">
            <div className='text-richblack-5 font-[600] text-[26px]'>Frequently Bought</div>
            <div className="py-8">
              {
                catalogPageData?.data?.differentCategory?.courses.length === 0 ?
                <div className='text-[24px]'>No Course Found</div> :
        
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  {
                    catalogPageData?.data?.differentCategory?.courses
                    .slice(0, 4)
                    .map((course, i) => (
                      <Course_Card course={course} key={i} Height={"h-[400px]"} />
                    ))
                  }
                </div>

              }
            </div>
          </div>
        </div>
        
        <ReviewSlider />
      </div>

      <Footer />
    </div>
  )
}

export default Catalog