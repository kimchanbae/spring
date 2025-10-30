import React, {useEffect, useState} from "react";
import axios from "axios";
import SampleLeft from "./components/left/SampleLeft";
import Model from "./common/js/model";
import FileDownload from "./common/js/FileDownload";

function Sample(){
	const [data, setData] = useState([]);
	const [file, setFile] = useState(null);		/* 파일정보 셋팅 객체 */
	const [fileData, setFileData] = useState([]);	/* 파일리스트 정보 객체 */
	
	useEffect(() => {
		if(file){
			// console.log("파일변경: " + file);
		}
		
		axios.get("http://localhost:9000/api/sample")
		.then(res => {
			return res.data;
       	})
       	.then(result => {
           	setData(result);
     	})

		/* 파일조회 */
		axios.post("http://localhost:9000/common/file/fileList", {})
		.then(res => {
			setFileData(res.data);
       	})
  	},[file])
	
	/* 카운트 증가,빼기 객체 */
	const [count, setCount] = useState(0);
	/* 카운트증가 */
	const handleCountPlus = () => {
		setCount(count+1);
	}
	/* 카운트빼기 */
	const handleCountMinus = () => {
		if(count >= 1){
			setCount(count-1);
		}
	}

	/* 모달 */
	const [open, setOpen] = useState(false);
	const modelOpen = () => {
		setOpen(true);
	}
	
	/* 파일 변경 */
	const fileChange = (e) => {
		const selectedFile = e.target.files[0];
		setFile(selectedFile);
	}
	/* 파일 업로드 */
	const [uploadStatus, setUploadStatus] = useState('');
	const fileUpload = async () => {
		if(!file){
			alert("파일을 선택하세요....");
			return;
		}
		
		const fileData = new FormData();
		fileData.append('file', file);

		setUploadStatus('파일 업로드중....');
		
		// const response = await axios.post("http://localhost:9000/common/file/fileUpload", fileData);
		await axios.post("http://localhost:9000/common/file/fileUpload", fileData)
		.then(res => {
			alert(res.data);
		})
		.catch(error => {
			// alert(error.response.data + "\n" + error);
			console.error("오류:", error);
		})
	}

	return (
		<React.Fragment>
			<div className='mt-10'><ul><li>예제</li></ul></div>
			<div className="grid grid-cols-2 gap-4">
				<div className="mt-10 justify-self-start bg-blue-50"><SampleLeft /></div>
				<div className="mt-10 justify-self-end">
					<div className="mt-5">API 호출 데이터: {data}</div>
					<div className="flex mt-5">
						<div className="mr-10">카운트:<input type="text" id="count" value={count} /></div>
						<div className="mr-5"><button type="button" className="bg-blue-100" onClick={handleCountPlus}>증가</button></div>
						<div className="mr-5"><button type="button" className="bg-blue-100" onClick={handleCountMinus}>빼기</button></div>
					</div>
					<div className="mt-5"><button className="bg-cyan-500" onClick={modelOpen}>모달호출</button></div>
					<div className="flex mt-5">
						<input type="file" onChange={fileChange}></input>
						<button type="button" className="bg-pink-500" onClick={fileUpload}>파일업로드</button>
					</div>
					{fileData.map((v) => <div className="flex mt-5 bg-gray-100">
					<img src={"http://localhost:9000/" + v.path + v.name} style={{maxWidth:'200px', maxHeight:'200px'}} />
					<button className="bg-blue-400 ml-5" type="button" onClick={() => FileDownload(v.name)}>파일다운로드</button>
					</div>
					)}
				</div>
			</div>
			<Model isOpen={open} onClose={() => setOpen(false)}>
				<h1>모달 샘플</h1>
				<div>모달샘플 내용 정보</div>
			</Model>
		</React.Fragment>
  	);
}

export default Sample;