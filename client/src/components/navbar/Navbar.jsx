import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import "./navbar.scss";
import logo from "../../assets/img/navbar-logo.svg";
import {logout} from "../../redusers/userReducer.js";
import {searchFiles, getFiles} from "../../actions/file.js";
import {showLoader} from "../../redusers/appReducer.js";

const Navbar = () => {
    const isAuth = useSelector(state => state.user.isAuth);
    const currentDir = useSelector(state => state.file.currentDir);
    const dispatch = useDispatch();
    const [searchName, setSearchName] = useState('');
    const [searchTimeout, setSearchTimeout] = useState(false);

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
                <img src={logo} alt="logo" className="navbar__logo" />
                <div className="navbar__header">MERN CLOUD</div> 

                {isAuth && <input 
                    value={searchName}
                    onChange={ e => searchChangeHandler(e)}
                    className="navbar__search" 
                    type="text" 
                    placeholder="Название файла..." />
                }
                {!isAuth && <div className="navbar__login"><NavLink to="/login">Войти</NavLink></div>} 
                {!isAuth && <div className="navbar__registration"><NavLink to="/registration">Регистрация</NavLink></div>}
                {isAuth && <button className="navbar__logout" onClick={() => dispatch(logout())}>Выйти</button>}

            </div>
            
        </div>
    )
}
export default Navbar;