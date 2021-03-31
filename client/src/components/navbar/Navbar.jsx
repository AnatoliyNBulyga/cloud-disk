import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import "./navbar.scss";
import logo from "../../assets/img/logo-new.svg";
import defaultAvatar from "../../assets/img/avatar-default.svg";
import {API_URL} from "../../config.js";

import {logout} from "../../redusers/userReducer.js";
import {searchFiles, getFiles} from "../../actions/file.js";
import {showLoader} from "../../redusers/appReducer.js";
import {SearchOutlined} from '@ant-design/icons';

const Navbar = () => {
    
    const isAuth = useSelector(state => state.user.isAuth);
    const currentDir = useSelector(state => state.file.currentDir);
    const currentUser = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch();
    const [searchName, setSearchName] = useState('');
    const [searchTimeout, setSearchTimeout] = useState(false);
    const avatar = currentUser.avatar ? `${API_URL + currentUser.avatar}` : defaultAvatar;

    const searchChangeHandler = (e) => {
        setSearchName(e.target.value);
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }
        dispatch(showLoader());
        if (e.target.value) {
            setSearchTimeout(setTimeout(() => {dispatch(searchFiles(e.target.value))}, 500));
        } else {
            dispatch(getFiles(currentDir));
        }
        
    }
    return (
        <div className="navbar">
            <div className="container">
                <NavLink to="/"> 
                    <div className="navbar__brand">
                        <img src={logo} alt="logo" width="30" height="30" className="navbar__logo" />
                        <div className="navbar__header">MERN CLOUD</div>
                    </div>   
                </NavLink> 

                {isAuth && <div className="navbar__search-wrap"><SearchOutlined className="navbar__search-icon"/><input 
                    value={searchName}
                    onChange={ e => searchChangeHandler(e)}
                    className="navbar__search" 
                    type="text" 
                    placeholder="Search" /></div>
                }
                
                    {!isAuth && <button className="btn navbar__login"><NavLink to="/login">LOG IN</NavLink></button>} 
                    {!isAuth && <button className="btn btn-default navbar__registration"><NavLink to="/registration">SIGN UP</NavLink></button>}
                    {isAuth && 
                        <div className="navbar__buttons">
                            <button className="btn btn-default navbar__logout" onClick={() => dispatch(logout())}>LOG OUT</button>
                            <NavLink to="/profile">
                                <span className="navbar__avatar-wrap">
                                    <img className="navbar__avatar" src={avatar} alt="avatar" />
                                </span>
                            </NavLink>
                        </div>
                    }

                
            </div>
            
        </div>
    )
}
export default Navbar;