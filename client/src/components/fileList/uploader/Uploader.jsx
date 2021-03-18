import React from "react";
import { useDispatch, useSelector } from "react-redux";

import "./uploader.scss";
import UploadeFile from "./UploadeFile";
import {hideUploader} from "../../../redusers/uploadReducer.js";

const Uploader = () => {
    const files = useSelector(state => state.upload.files);
    const isVisible = useSelector(state => state.upload.isVisible);
    const dispatch = useDispatch();
    const hideUploaderHandler = () => {
        dispatch(hideUploader());
    }
    return ( isVisible &&  
        <div className="uploader">
            <div className="uploader__header">
                <div className="uploader__title">Загрузка</div>
                    <button className="uploader__close" onClick={hideUploaderHandler}>X</button>
            </div>
            {files.map( file => <UploadeFile key={file.id} file={file} />)}  
        </div>               
    );
}
export default Uploader;