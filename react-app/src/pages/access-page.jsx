import axios from 'axios';
import Logo from '../images/chatapp.png';
import { useNavigate  } from 'react-router-dom';
import React, { useState } from 'react';

function AccessPage(props){
  const [username, setUsername]= useState('');
  const [password, setPassword]= useState('');
  const [ errorMessage, setErrorMessage ]= useState('');
  
  const navigate= useNavigate();
  
  const handleChange= (e)=>{
    if (e.target.name === 'username'){
      setUsername(e.target.value);
    }else if (e.target.name === 'password'){
      setPassword(e.target.value);
    }
    
  }

  const handleSubmit= async (e)=>{
    try{
      const data=  {username: username, password: password};
      const response= await axios.post("/login", data);
      if (response.data.auth){
        props.setValidation(true);
        navigate('/');
      }
    }catch(err){
      if (err.response.data === 'Unauthorized'){
        setErrorMessage('The username and password does not match');
      }else{
        setErrorMessage(err.response.data);
      }
    }
  }
  
  return(<div className="access-container">
  <div className='entry-logo'><img src={Logo} alt='logo'/></div>
  <div className="access">
    <div className="access-label">
      <span>Login</span>
    </div>
    <hr />
    <br />
    <div>
      <label>Username</label>
      <input name="username" placeholder="john_doe" onChange={handleChange}/>
    </div>
    <div>
      <label>Password</label>
      <input name="password" placeholder="password" onChange={handleChange}/>
    </div>
    {(errorMessage !== '')&& <span>{errorMessage}</span>}
    <span className="signup" onClick={()=>(navigate('/register'))}><i className="fa fa-reply" aria-hidden="true"></i> <i>sign up</i></span>
    <button onClick={ handleSubmit }><i className="fa fa-sign-in" aria-hidden="true"></i></button>
  </div>
  </div>);
}
export default AccessPage;