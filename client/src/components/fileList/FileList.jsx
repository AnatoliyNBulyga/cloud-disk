import React from "react";
import {useSelector} from "react-redux";
import {TransitionGroup, CSSTransition} from "react-transition-group";

import File from "./file/File.jsx";
import "./fileList.scss";

const FileList = () => {
    const files = useSelector(state => state.file.files);
    const fileView = useSelector(state => state.file.view);

    if (!files.length) {
        return (
            <div className="loader">Files not found</div>
        )
    }

    if (fileView === 'plate') {
        return (
            <div className="fileplate">
                {files.map( file => 
                    <File key={file._id} file={file}/>
                )} 
            </div>
        )
    }
    return (
        <div className="filelist">
            <div className="filelist__header">
                <div className="filelist__name">Name</div>
                <div className="filelist__date">Date</div>
                <div className="filelist__size">Size</div>
            </div>
            <TransitionGroup>
                {files.map( file => 
                    <CSSTransition 
                        key={file._id}
                        timeout={500}
                        classNames={'file'}
                        exit={false}>
                        <File file={file}/>
                    </CSSTransition>
                )}
            </TransitionGroup>
            
        </div>
    );
};

export default FileList;