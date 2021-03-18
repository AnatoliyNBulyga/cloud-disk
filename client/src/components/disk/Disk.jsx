import React, { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";

import {getFiles, uploadFile} from "../../actions/file.js";
import FileList from "../fileList/FileList.jsx";
import Popup from "./Popup.jsx";

import "./disk.scss";
import { setCurrentDir, togglePopup } from "../../redusers/fileReducer.js";
import Uploader from "../fileList/uploader/Uploader.jsx";

const Disk = () => {
    const dispatch = useDispatch();
    const currentDir = useSelector(state => state.file.currentDir);
    const popupDisplay = useSelector(state => state.file.popupDisplay);
    const dirStack = useSelector(state => state.file.dirStack);
    const [dragEnter, setDragEnter] = useState(false);

    useEffect(() => {
        dispatch(getFiles(currentDir));
    }, [currentDir]);

    const showPopupHandler = () => {
        dispatch(togglePopup());
    };
    const backClickHandler = () => {
        const backDirId = dirStack.pop();
        dispatch(setCurrentDir(backDirId));
    };
    const fileUploadHandler = (event) => {
        const files = [...event.target.files];
        files.forEach( file => dispatch(uploadFile(file, currentDir)));
    };
    const dragEnterHandler = event => {
        event.preventDefault();
        event.stopPropagation();
        setDragEnter(true);
    };
    const dragLeaveHandler = event => {
        event.preventDefault();
        event.stopPropagation();
        setDragEnter(false);
    };
    const dropHandler = event => {
        event.preventDefault();
        event.stopPropagation();
        let files = [...event.dataTransfer.files];
        files.forEach(file => dispatch(uploadFile(file, currentDir)));
        setDragEnter(false);
    }

    return ( !dragEnter ?
        <div className="disk" onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
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
            <Uploader />   
        </div>
        :
        <div className="drop-area" onDrop={dropHandler} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
            Перетащите файлы сюда
        </div>
    );
};

export default Disk;