import React from "react";
import {useSelector} from "react-redux";

import File from "./file/File.jsx";
import "./fileList.scss";

const FileList = () => {
    const files = useSelector(state => state.file.files)
        .map( file => <File key={file._id} file={file}/>);

    return (
        <div className="filelist">
            <div className="filelist__header">
                <div className="filelist__name">Название</div>
                <div className="filelist__date">Дата</div>
                <div className="filelist__size">Размер</div>
            </div>
            {files}
        </div>
    );
};

export default FileList;