import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import StateTag from '../components/state-tag';
import send from '../images/send.svg';

function ConvoPage(props){
  const receiver= props.receiver;
  const [ message, setMessage ]= useState('');
  const [ refresh, setRefresh ]= useState(false);
  
  const messagesEndRef = useRef(null);
  
  const [ convoList, setConvoList]= useState([]);
  useEffect( ()=>{
    const getConvos= async ()=>{
      const { data }= await axios.get('/conversations/'+receiver);
      setConvoList(data.conversations);
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
    getConvos();
  }, [refresh])
  
  useEffect(() => {
  const timer = setInterval( async () => {
    const { data }= await axios.get('/conversations/'+receiver);
      setConvoList(data.conversations);
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, 3000);
  return () => clearInterval(timer);
}, []);
  
  function handleSend(){
    if( message !== ''){
      const sendConvo= async ()=>{
      const { data }= await axios.post('/conversations/'+receiver, {
          message: message
      });
      if (data === 'sent'){
        setMessage('');
        setRefresh(!refresh);
      }
    }
    sendConvo();
    }
    
  }
  
  return(<div className="convo">
    <StateTag
    page= {receiver}
    backTo= "ChatPage" />
    {convoList.map( (eachConvo)=>(<div className="chat" key= {eachConvo._id}>
    <span className= {(eachConvo.sender === receiver)? 'common-chat friend-chat': 'common-chat user-chat'}>{eachConvo.message}</span>
    </div>))}
    <div className='space' ref={messagesEndRef}></div>
    
    <div className="compose">
      <input placeholder="write message" onChange={(e)=>(setMessage(e.target.value))} value={message}/>
      <img src= {send} onClick= {handleSend}/>
    </div>
  </div>);
}
export default ConvoPage;