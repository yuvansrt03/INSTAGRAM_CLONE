import React, { useState } from 'react'
import axios from 'axios';
import './RegisterPage.css'
function RegisterPage() {
    const [userName,setUserName]=useState("")
    const [name,setName]=useState("")
    const [password,setPassword]=useState("")
    const [email,setEmail]=useState("")
    const [date,setDate]=useState("")
    const [image,setImage]=useState();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log(image)
        var formdata=new FormData();
        formdata.append('userUserName',userName);
        formdata.append('userPassword',password);
        formdata.append('userName',name);
        formdata.append('userEmail',email);
        formdata.append('userDOB',date);
        formdata.append('Image',image);
        // console.log(formdata.get('Image'))
        let response = await axios.post("http://localhost:5000/auth/register",formdata)
    }
    return (
    <form className="register_page_container">
        <h2>registerPage</h2>
        <div className='register_page_username'>
            <label>UserName</label>
            <input type="text" onChange={(e)=>setUserName(e.target.value)}/>
        </div>
        <div className='register_page_Name'>
            <label>Name</label>
            <input type="text" onChange={(e)=>setName(e.target.value)}/>
        </div>
        <div className="register_page_password">
            <label htmlFor="">Password</label>
            <input type="text" onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        <div className='register_page_email'>
            <label>Email</label>
            <input type="text" onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div className="register_page_dob">
            <label htmlFor="">Date</label>
            <input type="date" onChange={(e)=>setDate(e.target.value)}/>
        </div>
        <div className="register_page_profile_img">
            <label htmlFor="">Image</label>
            <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
        </div>
        <button className='register_submit' onClick={handleSubmit}>Submit</button>
    </form>
  )
}

export default RegisterPage