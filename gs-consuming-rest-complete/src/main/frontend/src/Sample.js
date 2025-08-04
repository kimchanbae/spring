import React, {useEffect, useState} from "react";
import axios from "axios";
import SampleLeft from "./compent/SampleLeft"
import Model from "./common/js/model";

function Sample(){
	const [data, setData] = useState([]);
	const [file, setFile] = useState(null);		/* 파일정보 셋팅 객체 */
	
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
		
		// const response = await axios.post("http://localhost:9000/common/fileUpload", fileData);
		await axios.post("http://localhost:9000/common/fileUpload", fileData)
		.then(res => {
			alert(res.data);
		})
		.catch(error => {
			// alert(error.response.data + "\n" + error);
			console.error("오류:", error);
		})
	}
	/* 파일다운로드 */
	const fileDownload = async (filename) => {
		const data = {filename:filename};

		try{
			// const response = await fetch("http://localhost:9000/common/fileDownload", 
			// 	{method:'post', headers:{"Content-Type":"application/json"}, body: JSON.stringify(data)}
			// );

			const response = await axios.post("http://localhost:9000/common/fileDownload", data, {responseType:"blob"})
			
			// fatch로 호출시
			// if(!response.ok){
			// 	throw new Error("다운로드 실패..."); 
			// }

			if(!response.data){
				throw new Error("다운로드 실패...");  
			}

			// 파일 blob 받아옴
			// const blob = await response.blob();		// fatch로 호출시 
			const blob = new Blob([response.data]);		// axios로 호출시 
			// blob를 url로 변환
			const url = window.URL.createObjectURL(blob);

			// const disposition = response.headers.get('Content-Disposition');
			const disposition = response.headers["Content-Disposition"];

			// if(disposition && disposition.includes('filename=')){
			// 	const matches = disposition.match(/filename\*=UTF-8''(.*)/);
			// 	if(matches && matches.length > 1){
			// 		filename = decodeURIComponent(matches[1]);
			// 	}else{
			// 		const normalMatch = disposition.match(/filename="?(.+?)"?$/);
			// 		if(normalMatch && normalMatch[1]){
			// 			filename = normalMatch[1];
			// 		}
			// 	}
			// }

			// 동적으로 a태그를 생성하여 다운로드 트리거
			const link = document.createElement('a');
			link.href = url;
			link.download = filename;
			link.click();
			
			// 다운로드후 생성한 url객체 해제
			window.URL.revokeObjectURL(url);
		}catch(error){
			alert("파일 다운로드에 실패....");
			console.error("오류:", error);
		}	
	}
	
	return (
		<header className="App-header">
			<div className="title"><ul><li>예제</li></ul></div>
			<div className="sample-cont">
				<div className="sample-left">
					<SampleLeft />
				</div>
				<div className="sample-div">
					<ul>	
						<li>API 호출 데이터: {data}</li>
					</ul>
					<ul>
						<li>
							카운트:<input type="text" id="count" value={count} />
							<button type="button" onClick={handleCountPlus}>카운트증가</button>
							<button type="button" onClick={handleCountMinus}>카운트빼기</button>
						</li>
					</ul>
					<ul>
						<li><button onClick={modelOpen}>모달호출</button></li>
					</ul>
					<ul>
						<li>
							<input type="file" onChange={fileChange}></input>
							<button type="button" onClick={fileUpload}>파일업로드</button>
							<button type="button" onClick={() => fileDownload('00eb82634b4f1e90f8a8f0792b97673d.jpg')}>파일다운로드</button>
						</li>
					</ul>
				</div>
			</div>
			<Model isOpen={open} onClose={() => setOpen(false)}>
				<h1>모달 샘플</h1>
				<div>모달샘플 내용 정보</div>
			</Model>
		</header>
  	);
}

export default Sample;