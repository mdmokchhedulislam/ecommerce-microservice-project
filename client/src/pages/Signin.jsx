import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux';
import { signInSuccess } from "../redux/slice/userSlice";
import Loading from "./Loading";



function Signin() {
  const [loading,setLoading] = useState(false)


  const [input, setInput] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput({
      ...input,
      [name]: value
    });
  };

  console.log(input);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const handleSubmit = async () => {

    try {
      setLoading(true)
        const res = await axios.post("http://3.84.134.228/api/auth/login",input,{
          headers:{
            "Content-Type":"application/json"
          },
          withCredentials:true
        })
      
        dispatch(signInSuccess(res))
  
        if (res.status === 200) {
          setLoading(false)
          toast.success("Login successful!");
          navigate("/"); 
        }
        
        
    
      
    } catch (err) {
        console.log("i need to findout why login failed");
        console.log(err);
        setLoading(false)
        
      toast.error(err.response?.message || "Login failed");
      console.error(err);
    }
  };




  return (
    <div style={{
      backgroundImage:"url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-t25EHnz-6-RWXdse0PUrHzrgchmMZXvOAY2Jth4btfp_UiKpIDju6_ZHcQbrTvdSzBA&usqp=CAU')",
      backgroundRepeat:"no-repeat",
      backgroundPosition:"center",
      backgroundSize:"cover"

    }} 
    className=' flex justify-center shadow-xl shadow-white'>
      <div className='w-[350px] my-[50px] shadow-white border-white-5 shadow-inner bg-white/25 mx-auto p-5 rounded-md flex flex-col gap-y-5'>
        <h1 className='text-4xl text-center mb-4 font-bold font-oswald text-white underline'>Login Form</h1>

        <div>
          <label className="text-white font-onest font-bold" htmlFor="email">Enter your email</label>
          <input
            type="email"
            name='email'
            placeholder='Enter your email'
            className='w-full py-1 px-3 outline-none border border-black rounded bg-transparent placeholder:text-white'
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="text-white font-onest font-bold"  htmlFor="password">Enter your password</label>
          <input
            type="password"
            name='password'
            placeholder='Enter your password'
            className='w-full py-1 px-3 outline-none border border-black rounded bg-transparent placeholder:text-white'
            onChange={handleChange}
          />
        </div>

        <button onClick={handleSubmit} className='bg-green-600 w-full text-center text-white py-1 px-3 rounded-md'>
        {
            loading ? "Loading..." :"Login"
          }
        </button>

        <p>Don't have an account? 
          <Link className="text-green-700 ml-5 bg-green-100 py-1 px-2 rounded-md" to={"/registration"}>
      
          SignUp
            
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signin; 