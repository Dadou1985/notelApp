import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import MenuSharpIcon from '@material-ui/icons/MenuSharp'
import Lost from '../../../svg/lost-items.svg'
import Cab from '../../../svg/taxi.svg'
import Clock from '../../../svg/timer.svg'
import Maid from '../../../svg/maid.svg'
import Repair from '../../../svg/repair.svg'
import PhoneBook from '../../../svg/contacts.svg'
import CheckList from '../../../svg/todoList.svg'
import CallCenter from '../../../svg/call-center.svg'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew'
import { navigate } from 'gatsby'



export default function TemporaryDrawer({firebase, user}) {
  const [state, setState] = React.useState({left: false,});

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleLogout = () =>{
    firebase.logout().then(()=>navigate('/'))
}

  const list = (anchor) => (
    <div
      className="drawer_listlist drawer_fullList"
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
        <h2 className="drawer_title">Menu</h2>
      <List className="drawer_listIcons">
        <img src={Lost} alt="Lost and found" className="drawer_icons" onClick={()=>{navigate("./phoneLost")}} />
        <img src={Cab} alt="Lost and found" className="drawer_icons" onClick={()=>{navigate("/")}} />
        <img src={Clock} alt="Lost and found" className="drawer_icons" onClick={()=>{navigate("/")}} />
        <img src={Maid} alt="Lost and found" className="drawer_icons" onClick={()=>{navigate("/")}} />
        <img src={Repair} alt="Lost and found" className="drawer_icons" onClick={()=>{navigate("/")}} />
      </List>
      <Divider />
      <List className="drawer_listIcons2">
        <img src={PhoneBook} alt="Lost and found" className="drawer_icons" onClick={()=>{navigate("/")}} />
        <img src={CheckList} alt="Lost and found" className="drawer_icons" onClick={()=>{navigate("/")}} />
        <img src={CallCenter} alt="Lost and found" className="drawer_icons" onClick={()=>{navigate("/")}} />
      </List>
      <Divider />
      <PowerSettingsNewIcon id="drawer_icons2" onClick={handleLogout} />
    </div>
  );

  return (
    <div className="drawer">
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <MenuSharpIcon onClick={toggleDrawer(anchor, true)} />
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
