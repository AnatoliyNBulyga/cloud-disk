import React from "react";
import {useDispatch, useSelector} from "react-redux";

import "./file.scss";
import dirLogo from "../../../assets/img/dir.svg";
import fileLogo from "../../../assets/img/file.svg";
import { pushToStack, setCurrentDir } from "../../../redusers/fileReducer";
import { deleteFile, downloadFile } from "../../../actions/file.js";
import sizeFormat from "../../../utils/sizeFormat.js";

const File = ({file}) => {
    const dispatch = useDispatch();
    const currentDir = useSelector(state => state.file.currentDir);
    const fileView = useSelector(state => state.file.view);

    const openDirHandler = () => {
        if (file.type !== 'dir') return false;
        dispatch(pushToStack(currentDir));
        dispatch(setCurrentDir(file._id));
    };
    const downloadClickHandler = (event) => {
        event.stopPropagation();
        downloadFile(file)
    };
    const deleteClickHandler = (e) => {
        e.stopPropagation();
        dispatch(deleteFile(file));
    }

    if (fileView === 'plate') {
        return (
            <div className="file-plate" onClick={openDirHandler}>
                <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="file icon" className="file-plate__img" />
                <div className="file-plate__name">{file.name}</div>
                <div className="file-plate__btns">
                    {file.type !== 'dir' && <button onClick={ event => downloadClickHandler(event)} className="file-plate__btn file-plate__download btn btn-default">Download</button>}
                    <button onClick={(e) => deleteClickHandler(e)} className="file-plate__btn file-plate__delete btn btn-default">Delete</button>
                </div>
            </div>
        )
    }

    return (
        <div className="file" onClick={openDirHandler}>
            <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="file icon" className="file__img" />
            <div className="file__name">{file.name}</div>
            <div className="file__date">{file.date.slice(0,10)}</div>
            <div className="file__size">{sizeFormat(file.size)}</div>
            {file.type !== 'dir' && <button onClick={ event => downloadClickHandler(event)} className="file__btn file__download btn btn-default">Download</button>}
            <button onClick={(e) => deleteClickHandler(e)} className="file__btn file__delete btn btn-default">Delete</button>
        </div>
    );
};

export default File;