import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Logo from '../images/chatapp.png';

function RegisterPage(props){
  
  const navigate= useNavigate();
  
  const [username, setUsername]= useState('');
  const [password, setPassword]= useState('');
  const [ errorMessage, setErrorMessage ]= useState('');
  
  const handleChange= (e)=>{
    if (e.target.name === 'username'){
      setUsername(e.target.value);
    }else if (e.target.name === 'password'){
      setPassword(e.target.value);
    }
    
  }
  
  const handleSubmit= async (e)=>{
    if (password.length >= 5){
      try{
      const { data }= await axios.post("/register", {username: username, password: password});
      if (data.auth){
        navigate('/');
      }
    }catch(err){
      setErrorMessage(err.response.data);
    }
  }else{
    setErrorMessage("Your password must be atleast 5 characters long");
  }
  }
  
  return(<div className="access-container">
  <div className='entry-logo'><img src={Logo} alt='logo'/></div>
  <div className="access">
    <div className="access-label">
      <span>Sign Up</span>
    </div>
    <hr />
    <br />
    <div>
      <label>Username</label>
      <input name="username" placeholder="john_doe" onChange={handleChange} />
    </div>
    <div>
      <label>Password</label>
      <input name="password" placeholder="password" onChange={handleChange} />
    </div>
    {(errorMessage !== '')&& <span>{errorMessage}</span>}
    <span className="signup" onClick={()=>(navigate('/login'))}><i className="fa fa-reply" aria-hidden="true"></i> <i>login</i></span>
    <button onClick={ handleSubmit }><i className="fa fa-sign-in" aria-hidden="true"></i></button>
  </div>
  </div>);
}
export default RegisterPage;