import React, { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";

import {getFiles, uploadFile} from "../../actions/file.js";
import FileList from "../fileList/FileList.jsx";
import Popup from "./Popup.jsx";
import Loader from "../loader/Loader.jsx";

import "./disk.scss";
import { setCurrentDir, togglePopup, setView } from "../../redusers/fileReducer.js";
import Uploader from "../fileList/uploader/Uploader.jsx";
import { LeftOutlined } from '@ant-design/icons';
import { Select } from 'antd';

const Disk = () => {
    const dispatch = useDispatch();
    const currentDir = useSelector(state => state.file.currentDir);
    const popupDisplay = useSelector(state => state.file.popupDisplay);
    const dirStack = useSelector(state => state.file.dirStack);
    const loader = useSelector(state => state.app.loader);

    const [dragEnter, setDragEnter] = useState(false);
    const [sort, setSort] = useState('type');

    useEffect(() => {
        dispatch(getFiles(currentDir, sort));
    }, [currentDir, sort, dispatch]);

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
    };
    const { Option } = Select;
    const handleChange = (value) => {
        setSort(value);
    }

    if (loader) return <Loader />

    return ( !dragEnter ?
        <div className="disk" onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
            <div className="disk__btns">
                <div className="disk__btns-left">
                    <button className="btn disk__back" onClick={backClickHandler}><LeftOutlined className="icon-btn" />Back</button>
                    <button className="btn btn-default disk__create" onClick={showPopupHandler}>Create dir</button>
                    <div className="disk__upload">
                        <label htmlFor="disk__upload-input" className="disk__upload-label">Upload</label>
                        <input multiple={true} onChange={event => fileUploadHandler(event)} type="file" id="disk__upload-input" className="disk__upload-input"/>
                    </div>
                </div>
                <div className="disk__btns-right">
                    <Select value={sort} onChange={handleChange} className="disk__select">
                        <Option value="name">By name</Option>
                        <Option value="type">By type</Option>
                        <Option value="date">By date</Option>
                    </Select>
                    <button className="disk__plate" onClick={() => dispatch(setView('plate'))}></button>
                    <button className="disk__list" onClick={() => dispatch(setView('list'))}></button>
                </div>
                
                </div>
            <FileList/>
            {popupDisplay && <Popup />}
            <Uploader />   
        </div>
        :
        <div className="drop-area" onDrop={dropHandler} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
            Drop the files
        </div>
    );
};

export default Disk;