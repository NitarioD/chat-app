import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import ChatPage from './pages/chat-page.jsx';
import ConvoPage from './pages/conversation-page.jsx';
import AccessPage from './pages/access-page.jsx';
import RegisterPage from './pages/register-page.jsx';
import UsersPage from './pages/users-page.jsx';

axios.defaults.baseURL= '/api';
axios.defaults.withCredentials= true;

function App(){
  const [ validation, setValidation ]= useState("");
  const [receiver, setReceiver]= useState('');
  
  useEffect( ()=>{
    const validationChecker = async ()=>{
      const { data } = await axios.get("/authenticate");
      setValidation(data.auth);
    }
    validationChecker();
    
  }, []);
  
  return (<Router>
  <Routes>
    <Route exact path="/login" element={<AccessPage setValidation= {setValidation}/>} />
    <Route 
       path="/"
      element={ (validation === true)?  <ChatPage setReceiver= {setReceiver} />: <Navigate to='/login' />}
    />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/users" element={<UsersPage setReceiver= {setReceiver}/>} />
    <Route path="/conversations" element={<ConvoPage receiver= {receiver}/>} />
  </Routes>
  </Router>);
}
export default App;