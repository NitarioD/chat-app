import { useNavigate } from 'react-router-dom';

function MessageBox(props){
  
  const navigate= useNavigate();
  
  return(<div onClick={ ()=>{props.setReceiver(props.username);navigate('/conversations')} } className="message-group">
  <div className="img-box"><img alt="user's photo" src={props.img}/></div>
  <div className="message-box">
    <h3>~ {props.username}</h3>
    <p>{props.message}</p>
  </div>
  </div>);
}
export default MessageBox;