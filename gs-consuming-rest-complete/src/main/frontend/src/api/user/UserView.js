import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
import FileDownload from "../../common/js/FileDownload";

function User(){
	const location = useLocation();
	const userData = {...location.state };
	const navigate = useNavigate();
	const [data, setData] = useState([]);
	// const [files, setFiles] = useState(null);	/* 파일정보 객체 */
	const [files, setFiles] = useState([]);			/* 파일정보 객체 */
	const fileInputRef = useRef(null);			/* 파일 input */
	
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
	const onSubmit = async (e) => {
		e.preventDefault();		/* 페이지 리로드 방지 */
		
		if(window.confirm("저장하시겠습니까?")){
			if(files){
				fileUpload(e);
			}else{
				save(e);
			}
		}else{
			return;
		}
	}

	/* 파일업로드 */
	const fileUpload = async (e) => {
		const fileData = new FormData();
		
		/* 단일 */
		// fileData.append('file', files);

		/* 다중 */
		files.forEach((file) => {
			fileData.append("files", file);
		})

		inptus.apicompent = "user";
		fileData.append('params', JSON.stringify(inptus));

		// await axios.post("http://localhost:9000/common/api/fileUpload", fileData)
		await axios.post("http://localhost:9000/common/api/multiFileUpload", fileData)
		.then(res => {
			console.log("res:" + JSON.stringify(res));
			
			save(e, res.data.fileMap);
		})
		.catch(error => {
			alert(error.response.data + "\n" + error);
			console.error("오류:", error);
		})
	}

	/* 등록,수정 실행 */ 
	const save = (e, fileMap) => {
		const formData = new FormData(e.target);
		const data = Object.fromEntries(formData.entries());
		
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
				alert("사용자 정보 저장 성공~~~~~~");
			}
			
			list();
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

	/* 파일 체인지 */
	const fileChange = (e) => {
		/* 단일 */
		// setFiles(e.target.files[0]);
		
		const selectedFiles = Array.from(e.target.files);
		setFiles((prev) => [...prev, ...selectedFiles]);
	}

	/* 파일추가 클릭 */	
	const fileDivClick = () => {
		fileInputRef.current.click();
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
					{/* {data.map((v) => */}
					<ul>
						<li className="det-header">첨부파일</li>
						<li className="det-cont">
							{/* {v.file_name === null || v.file_name === "" || userData.id ==="" ? null : 
							<button type="button" onClick={() => FileDownload(v.file_name)}>다운로드</button>}	 */}
							<div className="file-div">
								{data.map((v) =>
								<ul>
									<li>
										{v.file_name}
										{v.file_name === null || v.file_name === "" || userData.id ==="" ? null : 
										<button type="button" onClick={() => FileDownload(v.file_name)}>다운로드</button>}
									</li>
								</ul>
								)}
								{files.map((file) => (
								<ul>
									<li>{file.name}</li>
								</ul>
								))}	
							</div>
							<div className="file-btn">
								<button type="button" onClick={fileDivClick}>파일추가</button>
								<input ref={fileInputRef} type="file" multiple onChange={fileChange} style={{display:'none'}} />
							</div>	
						</li>
					</ul>
					{/* )} */}
					{/* <ul>
						<li className="det-header">파일</li>
						<li className="det-cont"><input type="file" multiple onChange={fileChange} /></li>
					</ul> */}
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