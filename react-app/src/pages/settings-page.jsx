import ProfilePic from '../components/profile-pic.jsx';
import StateTag from '../components/state-tag.jsx';


function SettingsPage(props){
  return(<div className="settings">
    <StateTag 
    page= "Settings"
    backTo= "ChatPage" 
    changePage= {props.changePage} />
    <ProfilePic />
  </div>);
}
export default SettingsPage