import React, {useState} from "react";
import {useDispatch} from "react-redux";

import "./authorization.scss";
import Input from "../../utils/input/Input";
import { login } from "../../actions/user";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const loginHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
        setEmail('');
        setPassword('');
    }
    return (
        <form className="authorization" onSubmit={ e => loginHandler(e)} onClick={event => event.stopPropagation()}>
            <div className="authorization__header">Log In</div>
            <Input value={email} setValue={setEmail} type="text" placeholder="Enter email adress"/>
            <Input value={password} setValue={setPassword} type="password" placeholder="Enter your password"/>
            <button type="submit" className="btn btn-primary authorization__btn">Log in</button>
        </form>
    )
}

export default Login;