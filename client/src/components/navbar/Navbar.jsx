import React from "react";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import "./navbar.scss";
import logo from "../../assets/img/navbar-logo.svg";
import {logout} from "../../redusers/userReducer.js";

const Navbar = () => {
    const isAuth = useSelector(state => state.user.isAuth);
    const dispatch = useDispatch();
    return (
        <div className="navbar">
            <div className="container">
                <img src={logo} alt="logo" className="navbar__logo" />
                <div className="navbar__header">MERN CLOUD</div> 

                {!isAuth && <div className="navbar__login"><NavLink to="/login">Войти</NavLink></div>} 
                {!isAuth && <div className="navbar__registration"><NavLink to="/registration">Регистрация</NavLink></div>}
                {isAuth && <button className="navbar__logout" onClick={() => dispatch(logout())}>Выйти</button>}

            </div>
            
        </div>
    )
}
export default Navbar;