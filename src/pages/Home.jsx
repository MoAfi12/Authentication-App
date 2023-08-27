import { Link, json, useNavigate } from "react-router-dom"
import { GrCart } from 'react-icons/gr';
import { FaUserCircle } from 'react-icons/fa';
import { BsMoonStarsFill } from 'react-icons/bs';
import { AiFillUnlock } from 'react-icons/ai';
import { BsFillSunFill } from 'react-icons/bs';
import { GiThink } from 'react-icons/gi';


import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../Usecontent";
import Hero from "../components/Hero";



function Home (){
const [data , setData] = useState(false)
const navigate = useNavigate()
const{state , dispatch} = useContext(GlobalContext)



const checkingTrue = localStorage.getItem("authentication") === "true"
const checkingUser = JSON.parse(localStorage.getItem("currentUser"))



    





  const handleClick = () =>{
   setData(!data)
  }

  const handleRegister = ()=>{
   navigate("/register")
  }
  const handleLogin = ()=>{
   navigate("/login")
  }

  function handleLogout() {
   
      dispatch({
        type: "LOGOUT",
        Authentication: false
      });
      localStorage.removeItem("authentication")
      localStorage.removeItem("currentUser")
      
   
    
  
    navigate("/"); // Redirect to the home page after logout
  }
  
  



    return(
      
            <>
      
                <div className="bg-gray-100 px-2 py-2 shadow-md">
                  <nav className="flex justify-between mx-auto items-center  w-[90%] lg:w-[70%]">
                    <Link className="">
                      <h1 className="text-2xl text-[#31264f] font-bold ">Logo</h1>
                    </Link>
                    {checkingTrue ? (
                      <div className="flex space-x-10 items-center">
                        <div className="relative">
                          <FaUserCircle
                            className="hover:cursor-pointer text-3xl "
                            onClick={handleClick}
                          />
                          {checkingUser && data && (
                            <div className="absolute bg-slate-200 px-10 w-52 rounded -left-32 py-3 mt-4 ">
                              
                              <h4
                                className="flex items-center text-xl gap-2 hover:cursor-pointer"
                                onClick={handleLogout}
                              >
                                <AiFillUnlock className="text-xl" /> Logout
                              </h4>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center" >
                         
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-5 items-center">
                        <h1
                          className="text-[#31264f] text-xl font-medium hover:cursor-pointer"
                          onClick={handleLogin}
                        >
                          Sign in
                        </h1>
                        <h1
                          className="bg-[#31264f] text-white text-lg py-1 px-3 hover:cursor-pointer rounded-md "
                          onClick={handleRegister}
                        >
                          Sign up
                        </h1>
                      </div>
                    )}
                  </nav>
                  
                </div>
              {checkingTrue ? (
                <Hero />
              ):(
                <h1 className=" animate-fade-in flex justify-center items-center gap-2 mt-32 md:text-2xl font-semibold">if you want to see something please login <GiThink className="w-10 h-10" /></h1>
              )}
               

            </>
         
          
    )
}

export default Home