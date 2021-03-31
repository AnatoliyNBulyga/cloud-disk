import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import { deleteAvatar, uploadAvatar } from "../../actions/user";

import "./profile.scss";
import { LeftOutlined } from '@ant-design/icons';

const Profile = () => {
    const dispatch = useDispatch();
    const deleteAvatarHandler = () => dispatch(deleteAvatar());
    const avatar = useSelector( state => state.user.currentUser.avatar);
    const changeAvatarHandler = e => {
        const file = e.target.files[0];
        dispatch(uploadAvatar(file));
        e.target.value = '';
    };

    return (
        <div className="profile">
            <NavLink to="/"><button className="btn disk__back" ><LeftOutlined className="icon-btn" />Back</button></NavLink>
            {avatar &&<button className="btn btn-default btn-danger profile__delete-button" onClick={deleteAvatarHandler}>Delete avatar</button>}
            <label htmlFor="profile-upload-input" className="profile__upload">
                Upload
                <input id="profile-upload-input" className="profile__upload-input" accept="image/*" onChange={e => changeAvatarHandler(e)} type="file"/>
            </label>
        </div>
    )
}
export default Profile;