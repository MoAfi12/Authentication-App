import { useContext, useState } from "react"
import { GlobalContext } from "../Usecontent"
import { stringify } from "postcss"
import { Link, useNavigate } from "react-router-dom"
import Register from "./Register"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () =>{

   const {state , dispatch}= useContext(GlobalContext)

   const[email , setEmail] = useState('')
   const[password , setPassword] = useState('')
   const[error , setError] = useState(false)
  const navigate = useNavigate()

   function handleClick(){
    if( email.trim() === '' || password.trim() === ''){
        return;
    }
    
    const existAccount = localStorage.getItem("data")
    if(!existAccount){
        toast.error('this Account is not exists!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
    }
    else if(existAccount){

        const accounts = JSON.parse(existAccount)
        const accountExists = accounts.some((account)=> account.email === email && account.password === password )
        if(accountExists){
            const account = {email , password}
            localStorage.setItem('currentUser', JSON.stringify([account]))

          dispatch({
            type: "LOGIN",
            payload: {email , password},
          })
            
              localStorage.setItem("authentication" , "true")
            
              toast.success('Welcome back 🥰', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: 0,
                theme: "light",
                });
               
                setTimeout(()=>{
                    setEmail('')
                setPassword('')
                navigate("/")
                } , 3000)
           
        } else{
            toast.error('this Account is not exists!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
            return;
        }
    }
      
      }
      
      const handleRegister = ()=>{
        navigate("/register")
       }
 
    
   


    return(
        <>
       
       <div className=" bg-white shadow-md md:w-[60%] lg:w-[34%] rounded-lg border  border-b-gray-300 w-[90%] px-6 py-10 mx-auto my-20">
            <h1 className="text-2xl text-center text-gray-600 mb-8">Login</h1>
            <div className="">
                <form action="submit">
                  
                    <label htmlFor="">E-mail</label> <br />
                <input className="bg-gray-100  focus-within:border-gray-400  px-3 focus-within:bg-slate-200 py-2 w-full  mt-2 rounded-sm outline-none border border-b-gray-300" type="email" value={email} onChange={(e)=> setEmail(e.target.value)} /> <br />
               
                    <label htmlFor="">Password</label> <br />
                <input className="bg-gray-100 px-3 focus-within:bg-slate-200 py-2 focus-within:border-gray-400 w-full mb-7 mt-2 rounded-sm outline-none border border-b-gray-300" type="password" value={password} onChange={(e)=> setPassword(e.target.value)} />
                </form>

                <button className="bg-green-500 text-white text-xl tracking-wider rounded-sm px-10 py-1 font-semibold w-[40%] mx-auto justify-center flex" onClick={handleClick}>Login</button>
                <p className="text-center mt-6 text-lg">Have Not Account <span className="text-blue-600 font-medium hover:cursor-pointer ml-1" onClick={handleRegister}> Sign Up </span></p>
                
                <ToastContainer />
            </div>
        </div>




        </>
    )
}

export default Login