import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import Input from "../../utils/input/Input.jsx";
import {togglePopup} from "../../redusers/fileReducer.js";
import {createDir} from "../../actions/file.js";

const Popup = () => {

    const [dirName, setDirName] = useState('');
    const dispatch = useDispatch();
    const currentDir = useSelector(state => state.file.currentDir);

    const createHandler = () => {
        dispatch(createDir(currentDir, dirName));
        setDirName('');
        dispatch(togglePopup());
    };
    const togglePopupHandler = () => dispatch(togglePopup());

    return (
        <div className="popup" onClick={togglePopupHandler}>
            <div className="popup__content" onClick={event => event.stopPropagation()}>
                <div className="popup__header">
                    <div className="popup__title">Создать новую папку</div>
                    <button className="popup__close" onClick={togglePopupHandler}>X</button>
                </div>
                <Input type="text" placeholder="Введите название папки..." value={dirName} setValue={setDirName} />
                <button className="popup__create" onClick={createHandler}>Создать</button>
            </div>
        </div>
    )
}
export default Popup;