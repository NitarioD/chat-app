import axios from 'axios';
import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import dp from '../images/user.jpeg' ;


import Header from '../components/header.jsx';
import MessageBox from '../components/message-box';

function ChatPage(props) {
  const navigate= useNavigate();
  const [user, setUser]= useState('');
  const [ chats, setChats]= useState([]);
  
  useEffect( ()=>{
    const getUser= async ()=>{
      const { data }= await axios.get('/user');
      setUser(data.user.username);
    }
    getUser();
  }, []);
  
  useEffect( ()=>{
    const previewConvo= async ()=>{
      const { data }= await axios.get('/conversations');
      setChats(data);
    }
    previewConvo();
  }, []);
  const getEachUsername= (arr)=>{
    const userBox= arr.filter((eachUser)=>(eachUser !== user));
    return userBox[0];
  }
  return (<div>
  <Header
  user= {user}/>
  
  {chats.map( (chat)=>(<MessageBox
  setReceiver= {props.setReceiver}
  key= {chat._id}
  img= {dp}
  username= {getEachUsername(chat.users)}
  message= {chat.messages[(chat.messages.length) -1].message} 
  />) )}
  <div className='chat-user' onClick={ ()=>(navigate('/users'))} >
    <span>+</span>
  </div>
  </div>
  );
}

export default ChatPage;
