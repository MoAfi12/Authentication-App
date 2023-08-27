import { useContext, useState } from "react"
import { GlobalContext, Globalprovider } from "../Usecontent"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register(){

 const {state , dispatch} =  useContext(GlobalContext)
 const navigate = useNavigate()
 const[name , setName] = useState('')
 const[email , setEmail] = useState('')
 const[password , setPassword] = useState('')
 const[checkPassword  , setCheckPasword] = useState(false)
 const[checkUsername  , setCheckUsername] = useState(false)
 const[checkEmail  , setCheckEmail] = useState(false)
 const[checInputs  , setCheckInputs] = useState(false)
 

function handleClick(event){
    event.preventDefault()
    if(name.trim() === '' || email.trim() === '' || password.trim() === ''){
       setCheckInputs(true)
       return;
    }else{
        setCheckInputs(false)
    }

    if(name.length < 4 || !/\d/.test(name) || !/[a-zA-Z]/.test(name)){
        setCheckUsername(true)
        return;
    }
    else{
      setCheckUsername(false)
    } 


       const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };

       if (!isValidEmail(email)) {
        setCheckEmail(true);
        return;
      } else{
        setCheckEmail(false)
      }


    if (password.length < 5 || !/[a-zA-Z]/.test(password) || !/[0-9]/.test(password) || !/[!@#$%^&*]/.test(password)) {
        setCheckPasword(true)
        return;
      } else{
        setCheckPasword(false)
      }


    
   
     const newData = { name , email , password}
    const existAccount = localStorage.getItem("data")
   
    if(!existAccount){
       localStorage.setItem("data" , JSON.stringify([newData]))
      dispatch({type: "REGISTER" , payload: {name , email , password}})
      toast.success('Welcome', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
        setEmail('')
        setName('')
        setPassword('')
        setTimeout(()=>{
            navigate("/login")
        } , 4000)
    
    }

    else{
        const accounts = JSON.parse(existAccount)
         const accountExists = accounts.some((account)=> account.email === email )

         if(accountExists){
            toast.error('This email already exists!', {
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
    } else{
       
    accounts.push(newData)
      localStorage.setItem("data" , JSON.stringify(accounts))

      dispatch({type: "REGISTER" , payload: {name , email , password}})
      toast.success('Welcome' , accounts.name, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
        setEmail('')
        setName('')
        setPassword('')
        setTimeout(()=>{
            navigate("/login")
        } , 4000)
      
  }

}

}

const handleRegister = ()=>{
    navigate("/login")
   }


    return(
        <>
        
        <div className="bg-white shadow-md md:w-[60%] lg:w-[34%] rounded-lg border border-b-gray-300 w-[90%] px-6 py-10 mx-auto my-20">
            <h1 className="text-xl text-center text-gray-600 mb-8">Register</h1>
            <div className="">
                {checInputs && (
                <p className="mb-4  text-red-500 text-center">please first Fill inputs</p>
                )}
                <form action="submit">
                    <label htmlFor="">Username</label> <br />
                <input className="bg-gray-100 px-3 focus-within:border-gray-400 focus-within:bg-slate-200  py-2 w-full mb-7 mt-2 rounded-sm outline-none border border-b-gray-300" type="text" value={name} onChange={(e) => setName(e.target.value)} /> <br />
                {checkUsername && (
                <p className="-mt-6 mb-1  text-red-500">must have at least 4 characters and contain both numbers and letters. </p>
                )}
                    <label htmlFor="">E-mail</label> <br />
                <input className="bg-gray-100  focus-within:border-gray-400  px-3 focus-within:bg-slate-200 py-2 w-full  mt-2 mb-7 rounded-sm outline-none border border-b-gray-300" type="email" value={email} onChange={(e)=> setEmail(e.target.value)} /> <br />
                {checkEmail && (
                    <p className="-mt-6 mb-9  text-red-500">Email must contain symbol email @.</p>
                )}
                
                
                    <label htmlFor="">Password</label> <br />
                <input className="bg-gray-100 px-3 focus-within:bg-slate-200 py-2 focus-within:border-gray-400 w-full mb-7 mt-2 rounded-sm outline-none border border-b-gray-300" type="password" value={password} onChange={(e)=> setPassword(e.target.value)} />
                {checkPassword && (
                <p className="-mt-6 mb-9  text-red-500">'Password must contain symbols, numbers, and letters, and be at least 5 characters long.'</p>
                )}
                </form>

                <button className="bg-green-500 text-white text-xl tracking-wider rounded-sm px-10 py-1 font-semibold  mx-auto flex" onClick={handleClick}>Register</button>
                <p className="text-center text-lg mt-6 ">I have account <span className="text-blue-600 font-medium hover:cursor-pointer ml-1" onClick={handleRegister}> Sign in </span></p>
                <ToastContainer />
            </div>
        </div>


        </>
    )
}

export default Register