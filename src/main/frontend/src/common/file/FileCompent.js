import axios from "axios"
import React, { forwardRef, useEffect, useRef, useState } from "react"
import FileDownload from "../js/FileDownload";

// const FileCompent = ({onFileChange, onUploadComplete, schFileSeq, fileUploadCnt}) => {
const FileCompent = ({onFileChange, onUploadComplete, schFileParams, fileUploadCnt}) => {
    const [files, setFiles] = useState([]);			/* 파일정보 객체 */
    const fileInputRef = useRef(null);              /* 파일 input */
    // const [existingFiles, setExistingFiles] = useState([]);     /* 이전파일정보 객체 */

    useEffect(() => {
        fileList();

        if(fileUploadCnt){
            fileUpload(schFileParams.api);
        }
    },[fileUploadCnt]) 
    
    const fileList = () => {
        const schData = {seq:schFileParams.fileSeq};

        axios.post("http://localhost:9000/common/file/api/fileList", schData)
        .then(res => {
            setFiles(res.data);
            
            // const oldFiles = res.data.map((file) => ({
            //     name:file.name,
            //     size:file.size,
            //     extents:file.extents,
            //     file
            // }))
            // setExistingFiles((prev) => [...prev, ...oldFiles]);
        })
    }

    /* 파일 체인지 */
	const fileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
		/* 단일 */
		// setFiles(e.target.files[0]);
		/* 멀티 */
        setFiles((prev) => [...prev, ...selectedFiles]);
        
        // const newFiles = Array.from(e.target.files).map((file) => ({
        //     id:null,
        //     name:file.name,
        //     file,
        //     isNew:true
        // }))
        // setFiles((prev) => [...prev, ...newFiles])

        onFileChange(selectedFiles);

        e.target.value = "";    /* input 초기화 */
	}

    // useEffect(() => {
    //     if(files){
    //         onFileChange(files);     /* 파일변경시 부모창 파일정보 전달 */
    //     }
    // },[files])

    /* 파일추가 클릭 */	
	const fileAdd = () => {
		fileInputRef.current.click();
	}

    /* 파일업로드 */
    const fileUpload = async (api) => {
        const fileData = new FormData();
        /* 단일 */
        // fileData.append('file', files);
        /* 다중 */
        files.forEach((file) => {
            fileData.append("files", file);
        })

        /* 이전파일정보 */
        // existingFiles.forEach((file) => {
        //     fileData.append("existingFiles", file);
        // })
        
        const inptus = {"apicompent":api, "seq":schFileParams.fileSeq};
        fileData.append('params', JSON.stringify(inptus));

        // await axios.post("http://localhost:9000/common/file/api/fileUpload", fileData)
        await axios.post("http://localhost:9000/common/file/api/multiFileUpload", fileData)
        .then(res => {
            onFileChange([]);
            onUploadComplete(res.data.fileMap);
        })
        .catch(error => {
            alert(error.response.data + "\n" + error);
            console.error("오류:", error);
        })
    }

    /* 파일삭제 */
    const fileDelete = async (file, toIndex) => {
        try {
            if(window.confirm("(" + file.name + ")을 삭제하시겠습니까?")){
                if(file.seq != null && file.seq != ""){
                    const response = await axios.delete('http://localhost:9000/common/file/' + file.name);
                    alert(response.data);
                }

                setFiles((prev) => prev.filter((__, index) => index !== toIndex));      /* 삭제파일 filter로 제외처리 */
                
                if(fileInputRef.current){
                    fileInputRef.current.value = "";    /* 삭제 후 input value 초기화 */
                }

                // const selectedFiles = files.filter((__, index) => index !== toIndex);     /* 삭제된 파일 filter로 제외 후 부모전달 파일정보 */
                // onFileChange(selectedFiles);
            }
        } catch (error) {
            alert("삭제중 오류발생:" + error.response.data);
        }
    }

    /* 버튼표시 */
    const onFileBtnLoad = (file, index) => {
        if(file.seq != "" && file.seq != undefined){
            return(
                <React.Fragment>
                    <button type="button" onClick={() => FileDownload(file.name)}>다운로드</button>
                    <button type="button" onClick={() => fileDelete(file, index)}>삭제</button>
                </React.Fragment>
            )
        }
    }

    return(
        <div>
            <div className="file-div">
                <ul>
                {files.map((file, index) => (
                    <li key={index}>
                        {file.name}
                        {onFileBtnLoad(file, index)}
                    </li>
                ))}	
                </ul>
            </div>
            <div className="file-btn">
                <button type="button" onClick={fileAdd}>파일추가</button>
                <input ref={fileInputRef} type="file" multiple onChange={fileChange} style={{display:'none'}} />
            </div>
        </div>
    )
}

export default FileCompent;