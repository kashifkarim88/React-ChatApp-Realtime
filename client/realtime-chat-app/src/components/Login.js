import React, { useState } from 'react'
import '../scss/login.scss'
import { useNavigate } from 'react-router-dom';

let user="";

export default function Login() {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate("");


  const sendUserName= ()=>{
    console.log(userName)
    user = userName;
    if (user !== ""){
      navigate("/chats")
    }
    else{
      alert("please, insert user name first.")
    }
  }
  return <>
  <div className="login-wrapper">
    <div className="login-container">
        <h1 className='login-heading'>Login</h1>
        <input className='input' type="text" placeholder='user name' value={userName} onChange={e=> setUserName(e.target.value)}/>
        <button className='login-btn' onClick={sendUserName}>Login</button>
    </div>
  </div>
  </>
}
export {user}
