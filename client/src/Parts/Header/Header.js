/**
 * Header component to add as a part in each page component.
 */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {GetSessionData, RemoveSessionData} from '../../Service/SessionStorage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Header.scss';

function Header () {
    // Hooks
    const [showProfileBox, setShowProfileBox] = useState(false);
    const userName = GetSessionData("userName");
    const history = useHistory();

    // This function toggles the user profile box
    const toggleProfileBox = () => {
        setShowProfileBox(!showProfileBox);
    }

    // Redirect to logout page and removes the session token
    const logout = () => {
        history.push('/logout');
        RemoveSessionData("sessionToken");
    }

    return (
        <nav className="navbar navbar-expand-sm bg-transparent navbar-light h-10 justify-content-between">
            <a className="navbar-brand text-white"><h3><b>Track Expense</b></h3></a>
            <div className="dropdown mr-lg-3 mr-md-0 mr-sm-0 mr-0">
                <div onClick={toggleProfileBox} className="text-white logo">
                    <span className="h5 mr-2">Hi, {userName}</span> 
                    <FontAwesomeIcon icon="user-circle" size="2x"/>
                </div>
                <ul className={`dropdown-menu dropdown-menu-right ${(showProfileBox) ? 'd-block' : 'd-none'}`}>
                    <li className="p-2" onClick={logout}><FontAwesomeIcon icon="sign-out-alt"/>Logout</li>
                </ul>
            </div>
        </nav>  
    );
}

export default Header;