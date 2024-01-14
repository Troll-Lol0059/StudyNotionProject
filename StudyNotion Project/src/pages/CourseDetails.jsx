import React from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate,useParams } from 'react-router-dom';
import { buyCourse } from '../services/operations/studentFeaturesApi';

function CourseDetails() {
    const {user} = useSelector((state) => state.profile );
    const {token} = useSelector( (state) => state.auth );
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { courseId } = useParams();

    const handleBuyCourse = () => {
        if(token){
            buyCourse(token, [courseId], user, navigate, dispatch);
            return;
        }
    }

  return (
    <div>
        <button className='bg-yellow-50 p-6'
        onClick={ () => handleBuyCourse() }>
            Buy Now
        </button>
    </div>
  )
}

export default CourseDetails