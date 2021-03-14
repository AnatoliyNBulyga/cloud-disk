import React from "react";
import {useDispatch, useSelector} from "react-redux";

import "./file.scss";
import dirLogo from "../../../assets/img/dir.svg";
import fileLogo from "../../../assets/img/file.svg";
import { pushToStack, setCurrentDir } from "../../../redusers/fileReducer";

const File = ({file}) => {
    const dispatch = useDispatch();
    const currentDir = useSelector(state => state.file.currentDir);
    const openDirHandler = () => {
        dispatch(pushToStack(currentDir));
        dispatch(setCurrentDir(file._id));
    }

    return (
        <div className="file" onClick={ file.type === 'dir' && openDirHandler}>
            <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="file icon" className="file__img" />
            <div className="file__name">{file.name}</div>
            <div className="file__date">{file.date.slice(0,10)}</div>
            <div className="file__size">{file.size}</div>
        </div>
    );
};

export default File;