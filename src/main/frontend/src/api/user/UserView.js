import React, {useCallback, useEffect, useRef, useState} from "react";
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
import FileCompent from "../../common/file/FileCompent";

function User(){
	const location = useLocation();
	const userData = {...location.state };
	const navigate = useNavigate();
	const [data, setData] = useState([]);
	const [uploadfiles, setUploadFiles] = useState([]);			/* 파일정보 객체 */
	
	useEffect(() => {
		/*axios.get("http://localhost:9000/api/user/view?id=" + userData.id)*/
		axios.post("http://localhost:9000/api/user/view", userData)
		.then(res => {
			setData([res.data]);	/* 사용자정보 조회 객체 */
			setInptus(res.data);	/* 입력폼 사용자정보 객체 */
		})
  	},[])

	/* 입력폼 사용자정보 셋팅 객체 생성 */
	const [inptus, setInptus] = useState({
		id: "",
		name: "",
		comment: "",
	});
	const {id, name, comment} = inptus;
	
	/*입려폼 수정시*/
	const onChange = (e) => {
		const {name, value} = e.target
		
		setInptus({
			...inptus,
	      	[e.target.name]: e.target.value
	    });
	}
	
	/*등록, 수정*/
	const [fileUploadCnt, setFileUploadCnt] = useState(0);
	const [saveData, setSaveData] = useState([]);
	const onSubmit = async (e) => {
		e.preventDefault();		/* 페이지 리로드 방지 */
		
		if(window.confirm("저장하시겠습니까?")){
			const formData = new FormData(e.target);
			const data = Object.fromEntries(formData.entries());

			setSaveData(data);
			
			if(uploadfiles.length > 0){
				// fileUpload(e);

				setFileUploadCnt(fileUploadCnt+1);
			}else{
				// save(e);
				save(data);
			}
		}else{
			return;
		}
	}

	/* 파일업로드 */
	// const fileUpload = async (e) => {
	// 	const fileData = new FormData();
		
		/* 단일 */
		// fileData.append('file', files);

		/* 다중 */
		// files.forEach((file) => {
		// uploadfiles.forEach((file) => {
		// 	fileData.append("files", file);
		// })

		// inptus.apicompent = "user";
		// fileData.append('params', JSON.stringify(inptus));

		// await axios.post("http://localhost:9000/common/file/api/fileUpload", fileData)
	// 	await axios.post("http://localhost:9000/common/file/api/multiFileUpload", fileData)
	// 	.then(res => {
	// 		save(e, res.data.fileMap);
	// 	})
	// 	.catch(error => {
	// 		alert(error.response.data + "\n" + error);
	// 		console.error("오류:", error);
	// 	})
	// }

	const [schFileSeq, setSchFileSeq] = useState(userData.file_seq);	/* 파일시퀀스 번호 조회 객체 */
	/* 등록,수정 실행 */ 
	// const save = (e, fileMap) => {
	const save = (data, fileMap) => {	
		// const formData = new FormData(e.target);
		// const data = Object.fromEntries(formData.entries());

		let saveMode="create";
		if(userData.id != ""){
			saveMode="update";
			data.id = userData.id;
		}
		data.mode = saveMode;

		if(fileMap != null && fileMap != ""){
			data.file_seq = fileMap.seq;
		}
		
		axios.post("http://localhost:9000/api/user/save", data)
		.then(res => {
			if(res.data.message != null && res.data.message != ""){
				alert(res.data.message);
			}else{
				alert("사용자 정보가 저장 되었습니다.");

				if(fileMap != null && fileMap != ""){
					setSchFileSeq((prev) => fileMap.seq);
				}
			}
			
			// list();
		})
		.catch(error => {
			alert("시용자정보 등록 오류\n관리자에게 문의하세요.\n" + error);
			console.error("오류:", error);
		})
	}
	
	/*삭제*/
	// function delite(){
	const delite = async () => {
		if(window.confirm("삭제하시겠습니까?")){
			// axios.post("http://localhost:9000/api/user/delite", userData)
			// .then(res => {
			// 	alert("사용지 정보 삭제 성공~~~~~~");
			// 	navigate('/user');
			// })
			// .catch(error => {
			// 	console.error("오류:", error);
			// })

			try{
				await axios.delete("http://localhost:9000/api/user/" + userData.id);
				alert("사용지 정보 삭제 성공~~~~~~");
				
				list();
			}catch(error){
				alert("삭제 실패" + error);
			}
		}else{
			return;
		}
	}

	/* 파일업로드완료 후 콜백 */
	const handleUploadComplete = useCallback((fileMap) => {
		console.log("파일업로드후 데이터:" + fileMap);
		
		setFileUploadCnt(0);
		save(saveData, fileMap);
	})

	/* 부모창으로 전달된 파일 정보 */
	const handleFileChange = (files) => {
		// console.log("부모전달 파일 정보:", files);

		// setUploadFiles((prev) => [...prev, ...file]);
		setUploadFiles(files);
	}

	/* 목록이동 */
	const list = () => {
		navigate('/user');
	}
	
	return (
		<header className="App-header">
			<form name="userForm" onSubmit={onSubmit}>
				<div className="det-div">
					<ul>
						<li className="det-header">아이디</li>
						<li className="det-cont">
						{userData.id === "" ? <input type="text" name="id" value={inptus.id} onChange={onChange} /> :
						<input type="text" name="id" value={inptus.id} onChange={onChange} disabled />}
						</li>
					</ul>
					<ul>
						<li className="det-header">이름</li>
						<li className="det-cont"><input type="text" name="name" value={inptus.name} onChange={onChange} /></li>
					</ul>
					<ul>
						<li className="det-header">내용</li>
						<li className="det-cont"><textarea name="comment" value={inptus.comment} onChange={onChange} rows="10" cols="50" /></li>
					</ul>
					<ul>
						<li className="det-header">첨부파일</li>
						<li className="det-cont">
							<FileCompent onFileChange={handleFileChange} onUploadComplete={handleUploadComplete} schFileSeq={schFileSeq} fileUploadCnt={fileUploadCnt} />
						</li>
					</ul>
				</div>
				<div className="btn-grp">
					<ul>
						{userData.id === "" ? <li><button type="submit">등록</button></li> : <li><button type="submit">수정</button></li>}
						{userData.id === "" ? null : <li><button type="button" onClick={() => delite()}>삭제</button></li>}
						<li><button type="button" onClick={list}>목록</button></li>
					</ul>
				</div>
			</form>
		</header>
  	);
}

export default User;