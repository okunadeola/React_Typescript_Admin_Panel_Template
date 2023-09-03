
import { useContext } from 'react';
import './navbar.scss'
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";

import SearchIcon from '@mui/icons-material/Search';

import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; 
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

import MenuIcon from '@mui/icons-material/Menu';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';

import { DarkModeContext } from '../../context/mode';


const Navbar = ()=> {
    const { toggleMode, darkMode, expandMenu } = useContext(DarkModeContext);








    return (
        <header className='navbar'>

            <div className="logo">
                <MenuIcon className="icon" />
                <MenuOpenIcon className="icon iconExpand"  onClick={expandMenu}/>
                <img src="logo.svg" alt="sitelogo" />
                <span>ADMIN</span>
            </div>

            <div className="icons">
                <SearchIcon className="icon"/>
                <AspectRatioIcon className="icon" />



                {darkMode ? (
                    <WbSunnyOutlinedIcon onClick={toggleMode} />
                    ) : (
                    <DarkModeOutlinedIcon onClick={toggleMode} />
                 )}

                <div className="notification">
                    <NotificationsIcon/>
                    <span>1</span>
                </div>
                <div className="user">
                    <AccountCircleIcon/>
                    <span>Jane</span>
                </div>
                <SettingsApplicationsIcon/>
            </div>
        </header>
    )
}

export default Navbar