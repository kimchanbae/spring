import React, {useCallback, useEffect, useRef, useState} from "react";
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
import FileCompent from "../../common/file/FileCompent";

function UserView(){
	const location = useLocation();
	const userData = {...location.state };
	const navigate = useNavigate();
	const [data, setData] = useState([]);
	const [uploadfiles, setUploadFiles] = useState([]);			/* 업로드 파일정보 객체 */
	const searchKeyword = new URLSearchParams({id:userData.searchKeyword.id, name:userData.searchKeyword.name})		/* 검색키워드 객체 */
	
	const [schFileParams, setSchFileParams] = useState({api:"user", fileSeq:userData.file_seq});	/* 파일정보 조회,저장 객체 */

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
		use_yn: "",
	});
	const {id, name, comment, use_yn} = inptus;
	
	/*입려폼 수정시*/
	const onChange = (e) => {
		const {name, value} = e.target
		
		setInptus({
			...inptus,
	      	[e.target.name]: e.target.value
	    });
	}

	/* 체크박스 체크시 */
	// const useYn = ["게임", "등산"];
	// const [useYnCheckeds, setUseYnCheckeds] = useState({});
	// const onChecked = (e) => {
	// 	const {name, checked} = e.target

	// 	setUseYnCheckeds((prev) => ({
	// 		...prev,
	// 		[name]: checked
	// 	}))
	// }

	/*등록, 수정*/
	const [fileUploadCnt, setFileUploadCnt] = useState(0);
	const [saveData, setSaveData] = useState([]);			/* 입력폼 저장정보 객체 */
	const onSubmit = async (e) => {
		e.preventDefault();		/* 페이지 리로드 방지 */
		
		if(window.confirm("저장하시겠습니까?")){
			const formData = new FormData(e.target);
			const data = Object.fromEntries(formData.entries());

			setSaveData(data);
			
			if(uploadfiles.length > 0){
				setFileUploadCnt(fileUploadCnt+1);
			}else{
				save(data);
			}
		}else{
			return;
		}
	}

	/* 등록,수정 실행 */ 
	const save = (data, fileMap) => {	
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
				if(fileMap != null && fileMap != ""){
					schFileParams.fileSeq = fileMap.seq;		/* 저장후 파일정보 조회 시퀀스번호 */
				}

				setFileUploadCnt(0);

				alert("사용자 정보가 저장 되었습니다.");
			}
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
		save(saveData, fileMap);
	})

	/* 부모창으로 전달된 파일 정보 */
	const handleFileChange = (files) => {
		// setUploadFiles((prev) => [...prev, ...file]);
		setUploadFiles(files);
	}

	/* 목록이동 */
	const list = () => {
		// navigate('/user');
		navigate('/user?' + searchKeyword.toString());
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
							{/* <FileCompent onFileChange={handleFileChange} onUploadComplete={handleUploadComplete} schFileSeq={schFileSeq} fileUploadCnt={fileUploadCnt} /> */}
							<FileCompent onFileChange={handleFileChange} onUploadComplete={handleUploadComplete} schFileParams={schFileParams} fileUploadCnt={fileUploadCnt} />
						</li>
					</ul>
					<ul>
						<li className="det-header">사용여부</li>
						<li className="det-cont">
							<input type="radio" name="use_yn" value="Y" checked={inptus.use_yn === "Y"} onChange={onChange} />사용
							<input type="radio" name="use_yn" value="N" checked={inptus.use_yn === "N"} onChange={onChange} />미사용
							{/* {useYn.map((item) => (
								<input type="checkbox" name={item} onChange={onChecked} checked={useYnCheckeds[item] || false} />
							))}
							{Object.keys(useYnCheckeds).filter((key) => useYnCheckeds[key]).join(',') || '없음'} */}
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

export default UserView;