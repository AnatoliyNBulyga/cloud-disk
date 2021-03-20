import React from "react";
import {useDispatch} from "react-redux";
import { deleteAvatar, uploadAvatar } from "../../actions/user";

import "./profile.scss";

const Profile = () => {
    const dispatch = useDispatch();
    const deleteAvatarHandler = () => dispatch(deleteAvatar());
    const changeAvatarHandler = e => {
        const file = e.target.files[0];
        dispatch(uploadAvatar(file));
        e.target.value = '';
    };
    return (
        <div className="profile">
            <button onClick={deleteAvatarHandler}>Удалить аватар</button>
            <input accept="image/*" onChange={e => changeAvatarHandler(e)} type="file"/>
        </div>
    )
}
export default Profile;