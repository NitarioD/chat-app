import { useState, useEffect } from 'react';
import axios from 'axios';
import Kebab from '../images/kebab.svg';
import Logo from '../images/chatapp.png';

import MenuBox from './menubox.jsx';
function Header(props){
  const [ display, setDisplay ]= useState(false);
  
  return(<div className="header">
  <div  onClick={()=>setDisplay(false)} className='logo-container'>
    <img src={Logo} alt='logo' className='logo'/>
  </div>
  <span className="header-user">Hello {props.user}</span>
  { (display)? <MenuBox />: <img src={Kebab} className='kebab' onClick={()=>setDisplay(true)}/> }
  </div>);
}
export default Header;