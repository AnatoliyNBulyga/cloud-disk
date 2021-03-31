import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {CloseOutlined} from "@ant-design/icons";

import Input from "../../utils/input/Input.jsx";
import {togglePopup} from "../../redusers/fileReducer.js";
import {createDir} from "../../actions/file.js";

const Popup = () => {

    const [dirName, setDirName] = useState('');
    const dispatch = useDispatch();
    const currentDir = useSelector(state => state.file.currentDir);

    const createHandler = (e) => {
        e.preventDefault();
        dispatch(createDir(currentDir, dirName));
        setDirName('');
        dispatch(togglePopup());
    };
    const togglePopupHandler = () => dispatch(togglePopup());

    return (
        <div className="popup" onClick={togglePopupHandler}>
            <form className="popup__content" onSubmit={ e => createHandler(e)} onClick={event => event.stopPropagation()}>
                <div className="popup__header">
                    <div className="popup__title">Create new dir</div>
                    <button className="popup__close" type="button" onClick={togglePopupHandler}><CloseOutlined /></button>
                </div>
                <Input type="text" placeholder="Enter dir name..." value={dirName} setValue={setDirName} />
                <button type="submit" className="btn btn-primary popup__create">Create</button>
            </form>
        </div>
    )
}
export default Popup;