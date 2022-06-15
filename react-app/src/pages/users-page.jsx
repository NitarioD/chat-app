import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import StateTag from '../components/state-tag';
import dp from '../images/user.jpeg';

function UsersPage(props){
  const navigate= useNavigate();
  const [users, setUsers]= useState([]);
  const [matchedUsers, setMatchedUsers]= useState([]);
  
  useEffect( ()=>{
    const getUsers= async ()=>{
      const { data }= await axios.get('/users');
      setUsers(data);
      setMatchedUsers(data);
    }
    getUsers();
  }, []);
  
  const handleChange= (e)=>{
    const currentValue= e.target.value;
    const lengthOfCurrentValue= currentValue.length;
    const matched= users.filter( (eachUser)=>{
      return ( currentValue.slice(0,lengthOfCurrentValue) === eachUser.username.slice(0,lengthOfCurrentValue) )
    } );
    setMatchedUsers(matched);
  }
  return(<div>
    <StateTag
    page= {<input className="search-users" placeholder="Search Users" onChange={handleChange} />}
    />
    {matchedUsers.map( (eachUser)=>(<div key={eachUser._id} className="user" onClick= { ()=>{props.setReceiver(eachUser.username) ;navigate('/conversations')} }>
      <img src={dp}/> {eachUser.username}
    </div>))}
  </div>);
}
export default UsersPage;