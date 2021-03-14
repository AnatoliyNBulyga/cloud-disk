import React, { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";

import {getFiles, createDir} from "../../actions/file.js";
import FileList from "../fileList/FileList.jsx";
import Popup from "./Popup.jsx";

import "./disk.scss";
import { togglePopup } from "../../redusers/fileReducer.js";

const Disk = () => {
    const dispatch = useDispatch();
    const currentDir = useSelector(state => state.file.currentDir);
    const popupDisplay = useSelector(state => state.file.popupDisplay);
    useEffect(() => {
        dispatch(getFiles(currentDir));
    }, [currentDir]);
    const showPopupHandler = () => {
        dispatch(togglePopup());
    }
    return (
        <div className="disk">
            <div className="disk__btns">
                <button className="disk__back">Назад</button>
                <button className="disk__create" onClick={() => showPopupHandler()}>Создать папку</button>
            </div>
            <FileList/>
            {popupDisplay && <Popup />}
            
        </div>
    );
};

export default Disk;