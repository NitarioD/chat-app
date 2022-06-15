import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function MenuBox(props){
  
  const navigate= useNavigate();
  
  const logout= async ()=>{
    const { data }= await axios.get('/logout');
    if (data === 'logged out'){
      navigate('/login');
    }
  }
  
  return( <div className="menubox">
  <div onClick={()=>(logout() )}><i>Logout</i></div>
  </div>);
}
export default MenuBox;