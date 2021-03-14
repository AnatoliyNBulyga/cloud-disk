import React, { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";

import {getFiles, uploadFile} from "../../actions/file.js";
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
    const fileUploadHandler = (event) => {
        const files = [...event.target.files];
        files.forEach( file => dispatch(uploadFile(file, currentDir)));
    }
    return (
        <div className="disk">
            <div className="disk__btns">
                <button className="disk__back" onClick={backClickHandler}>Назад</button>
                <button className="disk__create" onClick={showPopupHandler}>Создать папку</button>
                <div className="disk__upload">
                    <label htmlFor="disk__upload-input" className="disk__upload-label">Загрузить файл</label>
                    <input multiple={true} onChange={event => fileUploadHandler(event)} type="file" id="disk__upload-input" className="disk__upload-input"/>
                </div>
            </div>
            <FileList/>
            {popupDisplay && <Popup />}
            
        </div>
    );
};

export default Disk;