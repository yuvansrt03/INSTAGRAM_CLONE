import React, { useState } from 'react'
import { setLogin,setLogout} from '../../Slices/authSlice';
import './LoginPage.css'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
function LoginPage() {
    const dispatch=useDispatch();
    const state=useSelector(store=>store.auth);
    const [name,setName]=useState("");
    const [password,setPassword]=useState("");
    const [invalid,setInvalid]=useState(false)
    // const [date,setDate]=useState("");
    const handleSubmit=async(e)=>{
        console.log(name,password);
        e.preventDefault();
        const response = await fetch("http://localhost:5000/auth/login",{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify({
                userUserName:name,
                userPassword:password,
            })
        })
        const data=await response.json();
        if(data._id){
            dispatch(setLogin(data));
            console.log(state)
            // window.location.href="/";
        }
        else{
            setInvalid(true);
        }

    }
    return (
        <form className="login_page_container">
            <h2>LoginPage</h2>
            <div className='login_page_username'>
                <label>Name</label>
                <input type="text" onChange={(e)=>setName(e.target.value)}/>
            </div>
            <div className="login_page_password">
                <label htmlFor="">Password</label>
                <input type="text" onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            {/* <div className="login_page_dob">
                <label htmlFor="">Password</label>
                <input type="date" onChange={(e)=>setDate(e.target.value)}/>
            </div> */}
            <button className='login_submit' onClick={handleSubmit}>Submit</button>
        </form>
    )
}

export default LoginPage