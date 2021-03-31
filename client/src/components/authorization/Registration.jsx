import React, {useState} from "react";

import "./authorization.scss";
import Input from "../../utils/input/Input";
import {registration} from "../../actions/user";

const Registration = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const registrationHandler = (e) => {
        e.preventDefault();
        registration(email, password);
    }
    return (
        <form className="authorization" onSubmit={ (e) => registrationHandler(e)}>
            <div className="authorization__header">Sign Up</div>
            <Input value={email} setValue={setEmail} type="text" placeholder="Enter email adress" />
            <Input value={password} setValue={setPassword} type="password" placeholder="Enter your password" />
            <button type="submit" className="btn btn-primary authorization__btn">Sign up</button>
        </form>
    )
}

export default Registration;