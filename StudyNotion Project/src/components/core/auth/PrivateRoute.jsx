import { FcElectricalSensor } from 'react-icons/fc';
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

function PrivateRoute( {children} ) {
    const {token} = useSelector( (state) => state.auth );

    if(token !== null)
        return children;
    else
        return <Navigate to={"/login"} />

  return (
    <div>PrivateRoute</div>
  )
}

export default PrivateRoute