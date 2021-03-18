import React from "react";
import { useDispatch } from "react-redux";

import "./uploader.scss";
import {removeUploadFile} from "../../../redusers/uploadReducer.js";

const UploadeFile = ({file}) => {
    const dispatch = useDispatch();

    const removeUploadHandler = () => {
        dispatch(removeUploadFile(file.id));
    }
    return (
        <div className="upload-file">
            <div className="upload-file__header">
                <div className="upload-file__name">{file.name}</div>
                <button className="upload-file__remove" onClick={removeUploadHandler}>X</button>
            </div>
            <div className="upload-file__progress-bar">
                <div className="upload-file__bar" style={{width: file.progress + "%"}}></div>
                <div className="upload-file__percent">{file.progress}%</div>
            </div>
        </div>
    );
};
export default UploadeFile;