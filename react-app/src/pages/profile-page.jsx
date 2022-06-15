import StateTag from '../components/state-tag.jsx';

function ProfilePage(props){
  return(<div className="profile">
    <StateTag 
    page= "Profile"
    backTo= "ChatPage" 
    changePage= {props.changePage} />
  </div>);
}
export default ProfilePage