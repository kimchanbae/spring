import axios from "axios"
import React, { forwardRef, useEffect, useRef, useState } from "react"
import FileDownload from "../js/FileDownload";
import { useLocation } from "react-router-dom";

const FileDiv = ({onFileChange, schFileData}) => {
    const location = useLocation();
    const userData = {...location.state};
    const [fileData, setFileData] = useState([]);   /* 저장된 파일정보 객체 */
    const [files, setFiles] = useState([]);			/* 등록 파일정보 객체 */
    const fileInputRef = useRef(null);              /* 파일 input */

    useEffect(() => {
        fileList();
    },[schFileData])
    
    const fileList = () => {
        const schData = {file_seq:schFileData};

        axios.post("http://localhost:9000/common/file/api/fileList", schData)
        .then(res => {
            // setFileData(res.data);
            setFiles(res.data);
        })

        // setFiles((prev) => []);
    }

    /* 파일 체인지 */
	const fileChange = (e) => {
		/* 단일 */
		// setFiles(e.target.files[0]);
		
		console.log("files:" + JSON.stringify(e.target.files));
        
        const selectedFiles = Array.from(e.target.files);
		setFiles((prev) => [...prev, ...selectedFiles]);

        onFileChange(selectedFiles);        /* 부모전달파일정보 */

        e.target.value = "";    /* input 초기화 */
	}

    /* 파일추가 클릭 */	
	const fileDivClick = () => {
		fileInputRef.current.click();
	}

    /* 파일업로드 */
    // const fileUpload = async (api) => {
    //     const fileData = new FormData();
        
    //     /* 단일 */
    //     // fileData.append('file', files);

    //     /* 다중 */
    //     files.forEach((file) => {
    //         fileData.append("files", file);
    //     })

    //     const inptus = {"apicompent":api};
    //     fileData.append('params', JSON.stringify(inptus));

    //     // await axios.post("http://localhost:9000/common/file/api/fileUpload", fileData)
    //     await axios.post("http://localhost:9000/common/file/api/multiFileUpload", fileData)
    //     .then(res => {
    //         console.log("res:" + JSON.stringify(res));
    //     })
    //     .catch(error => {
    //         alert(error.response.data + "\n" + error);
    //         console.error("오류:", error);
    //     })
    // }

    /* 파일삭제 */
    const FileDelete = async (fileName, toIndex) => {
        try {
            const response = await axios.delete('http://localhost:9000/common/file/' + fileName);
            alert(response.data);

            // console.log("파일삭제 key:" + JSON.stringify(fileData) + "--" + toSeq);

            // fileList();
            setFiles(prev => prev.filter((__, index) => index !== toIndex));

            /* 삭제 후 input value 초기화 */
            if(fileInputRef.current){
                fileInputRef.current.value = "";
            }

            onFileChange(files);
        } catch (error) {
            alert("삭제중 오류발생:" + error.response.data);
        }
    }

    /* 저장된 파일정보,버튼 */
    const onFileLoad = (fileName, index) => {
        return(
            <li key={index}>
                {fileName}
                <button type="button" onClick={() => FileDownload(fileName)}>다운로드</button>
                <button type="button" onClick={() => FileDelete(fileName, index)}>삭제</button>
            </li>
        )
    }

    return(
        <div>
            <div className="file-div">
                {/* {fileData.map((v, index) =>
                <ul> */}
                    {/* <li> */}
                        {/* {v.name} */}
                        {/* {v.name === null || v.name === "" || userData.id ==="" ? null : onFileLoad(v.name, index)  */}
                        {/* <button type="button" onClick={() => FileDownload(v.name)}>다운로드</button>
                        } */}
                    {/* </li> */}
                {/* </ul>
                )} */}
                <ul>
                {files.map((file, index) => (
                    <li key={index}>
                        {file.name}
                        <button type="button" onClick={() => FileDelete(file.name, index)}>삭제</button>
                    </li>
                ))}	
                </ul>
            </div>
            <div className="file-btn">
                <button type="button" onClick={fileDivClick}>파일추가</button>
                <input ref={fileInputRef} type="file" multiple onChange={fileChange} style={{display:'none'}} />
            </div>
        </div>
    )
}

export default FileDiv;