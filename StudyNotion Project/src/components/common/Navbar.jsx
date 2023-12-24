import React from 'react';
import Logo from "../../assets/Logo/Logo-Full-Light.png";
import { Link } from 'react-router-dom';
import { NavbarLinks } from '../../data/navbar-links';
import { useLocation,matchPath } from 'react-router-dom';

// FUNCTION TO CHECK CURRENT LOCAION OF  WEBSITE AND THE PATH OF NAVLINK
// IF BOTH EQUALS IT WILL RETURN TRUE
function Navbar() {
    const location = useLocation();
    const matchRoute = (route) => {
        return matchPath({path:route},location.pathname);
    }

  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700'>
        <div className='flex w-11/12 max-w-maxContent justify-between items-center'>
            <Link to="/">
                <img src={Logo} width={160} height={42}  loading='lazy'/>
            </Link>

            {/* nav links */}
            <nav>
                <ul className='flex gap-x-6 text-richblack-25'>
                    {
                        NavbarLinks.map( (link,index) => (
                            <li key={index}>
                                {
                                    link.title === "Catalog" ? (<div></div>) : (
                                        <Link to={link?.path}>
                                            {/* IF match path returns true it will be yellow else other color */}
                                            <p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                                {link?.title}
                                            </p>
                                        </Link>
                                    )
                                }
                            </li>
                        ) )
                    }
                </ul>
            </nav>

            {/* login/signup/dashboard */}
            <div className='flex gap-x-4 items-center'>

            </div>

        </div>
    </div>
  )
}

export default Navbar