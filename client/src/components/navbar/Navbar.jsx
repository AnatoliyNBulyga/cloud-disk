import React from "react";
import {NavLink} from "react-router-dom";

import "./navbar.scss";
import logo from "../../assets/img/navbar-logo.svg";

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="container">
                <img src={logo} alt="logo" className="navbar__logo" />
                <div className="navbar__header">MERN CLOUD</div> 
                <div className="navbar__login"><NavLink to="/login">Войти</NavLink></div> 
                <div className="navbar__registration"><NavLink to="/registration">Регистрация</NavLink></div>
            </div>
            
        </div>
    )
}
export default Navbar;