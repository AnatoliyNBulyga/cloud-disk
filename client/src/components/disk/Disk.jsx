import React, { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";

import {getFiles} from "../../actions/file.js";
import FileList from "../fileList/FileList.jsx";
import Popup from "./Popup.jsx";

import "./disk.scss";
import { setCurrentDir, togglePopup } from "../../redusers/fileReducer.js";

const Disk = () => {
    const dispatch = useDispatch();
    const currentDir = useSelector(state => state.file.currentDir);
    const popupDisplay = useSelector(state => state.file.popupDisplay);
    const dirStack = useSelector(state => state.file.dirStack);

    useEffect(() => {
        dispatch(getFiles(currentDir));
    }, [currentDir]);

    const showPopupHandler = () => {
        dispatch(togglePopup());
    };
    const backClickHandler = () => {
        const backDirId = dirStack.pop();
        dispatch(setCurrentDir(backDirId));
    }
    return (
        <div className="disk">
            <div className="disk__btns">
                <button className="disk__back" onClick={backClickHandler}>Назад</button>
                <button className="disk__create" onClick={showPopupHandler}>Создать папку</button>
            </div>
            <FileList/>
            {popupDisplay && <Popup />}
            
        </div>
    );
};

export default Disk;