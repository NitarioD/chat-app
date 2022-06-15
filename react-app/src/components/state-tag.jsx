import { useNavigate } from 'react-router-dom';

function StateTag(props){
  const navigate= useNavigate();
  
  return (<div className="state-tag">
    <i className="fa fa-arrow-left back" aria-hidden="true" onClick= {()=>(navigate('/'))}></i>
    <span>{props.page}</span>
  </div>)
}
export default StateTag;