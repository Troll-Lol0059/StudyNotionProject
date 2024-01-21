import React, { useEffect } from 'react'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { Link, matchPath } from 'react-router-dom'
import {NavbarLinks} from "../../data/navbar-links"
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProfileDropDown from '../core/auth/ProfileDropDown';
import { apiConnector } from '../../services/apiconnector';
import { categories } from '../../services/apis';
import { useState } from 'react'
import {IoIosArrowDropdownCircle} from "react-icons/io"
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"


const Navbar = () => {
    console.log("Printing base url: ",process.env.REACT_APP_BASE_URL);
    const {token} = useSelector( (state) => state.auth );
    const {user} = useSelector( (state) => state.profile );
    const {totalItems} = useSelector( (state) => state.cart )
    const location = useLocation();

    const [subLinks, setSubLinks]  = useState([]);
    const [isNavOpen,setIsNavOpen] = useState(false);

    const fetchSublinks = async() => {
        try{
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            // console.log("Printing Sublinks result:" , result?.data?.data);
            setSubLinks(result?.data?.data);
        }
        catch(error) {
            console.log("Could not fetch the category list");
        }
    }

    useEffect( () => {
        fetchSublinks();
    },[] )


    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname);
    }

  return (
    <div className='relative flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700'>
      <div className={`${isNavOpen ? 'relative flex flex-col gap-6 px-8 bg-richblack-800 h-fit w-[70%] mx-auto py-8 top-[150px] rounded-md transition-all ease-in duration-[2000ms] delay-1000 z-10000' : 
        'hidden lg:flex w-11/12 max-w-maxContent items-center justify-between' }`}>
        {/* Image */}
      <Link to="/">
        <img src={logo} width={160} height={42} loading='lazy'/>
      </Link>

      {/* Nav Links */}
      {/* <nav className="hidden md:block"> */}
      <nav className='md:block'>
        <ul className='lg:flex gap-x-6 gap-y-6 text-richblack-25'>
        {
            NavbarLinks.map( (link, index) => (
                 <li key={index}>
                    {
                        link.title === "Catalog" ? (
                            <div
                            className={`group relative flex cursor-pointer items-center gap-1 ${
                              matchRoute("/catalog/:catalogName")
                                ? "text-yellow-25"
                                : "text-richblack-25"
                            }`} >
                                <p>{link.title}</p>
                                <IoIosArrowDropdownCircle/>

                                <div className='invisible absolute left-[50%]
                                    translate-x-[-50%] translate-y-[65%]
                                    flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900
                                opacity-0 transition-all duration-200 group-hover:visible
                                group-hover:opacity-100 lg:w-[300px] z-[1000]'>

                                <div className='absolute left-[50%] top-0
                                translate-x-[80%]
                                translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-5 z-[1000]'>
                                </div>

                                {
                                    subLinks?.length >= 0 ? 
                                    (
                                            subLinks.map( (subLink, index) => (
                                                <Link to={`catalog/${subLink.name.split(' ').join('-').toLowerCase()}`} 
                                                    key={index}
                                                    className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50" >
                                                    <p>{subLink.name}</p>
                                                </Link>
                                            ) )
                                    ) : (<div></div>)
                                }

                                </div>


                            </div>

                        ) : (
                            <Link to={link?.path}>
                                <p className={`${ matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                    {link.title}
                                </p>
                                
                            </Link>
                        )
                    }
                </li>
             ) )
        }

        </ul>
      </nav>


        {/* Login/SignUp/Dashboard */}
        <div className={'md:flex items-center gap-x-4 space-x-4'}>
            {
                user && user?.accountType != "Instructor" && (
                    <Link to="/dashboard/cart" className='relative text-[24px] text-richblack-5'>
                        <AiOutlineShoppingCart />
                        {
                            totalItems > 0 && (
                                <span className='text-[16px] text-richblack-100 absolute -top-4 left-2'>
                                    {totalItems}
                                </span>
                            )
                        }
                    </Link>
                )
            }
            {
                token === null && (
                    <Link to="/login" className=''>
                        <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md hover:text-yellow-50'>
                            Log in
                        </button>
                    </Link>
                )
            }
            {
                token === null && (
                    <Link to="/signup">
                        <button  className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md hover:text-yellow-50'>
                            Sign Up
                        </button>
                    </Link>
                )
            }
            {
                token !== null && <ProfileDropDown />
            }
            
        </div>
        
      </div>

        {/* large case logo */}
        <div className="flex !justify-center md:hidden">
            <Link to="/" className={`${isNavOpen ? 'hidden':'block'}`}>
                <img src={logo} width={160} height={42} loading='lazy'/>
             </Link>
        </div>

        <button className="absolute !left-5 md:hidden" onClick={ () => setIsNavOpen(!isNavOpen) }>
            <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
        </button>
    </div>
  )
}

export default Navbar
