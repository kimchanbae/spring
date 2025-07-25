import React, {useEffect, useState} from "react";
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';

function User(){
	const location = useLocation();
	const userData = {...location.state };
	const navigate = useNavigate();
	const [data, setData] = useState([]);
	
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
		comment: ""
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
	const onSubmit = (e) => {
		e.preventDefault();		/* 페이지 리로드 방지 */
		
		if(window.confirm("저장하시겠습니까?")){
			const formData = new FormData(e.target);
			const data = Object.fromEntries(formData.entries());
			
			let saveMode="create";
			if(userData.id != ""){
				saveMode="update";
				data.id = userData.id;
			}
			data.mode = saveMode;
			
			axios.post("http://localhost:9000/api/user/save", data)
			.then(res => {
				alert("사용지 정보 저장 성공~~~~~~");
				navigate('/user');
			})
			.catch(error => {
				alert("시용자정보 등록 오류\n관리자에게 문의하세요.\n" + error);
				console.error("오류:", error);
			})
		}else{
			return;
		}
	}
	
	/*삭제*/
	function delite(){
		if(window.confirm("삭제하시겠습니까?")){
			axios.post("http://localhost:9000/api/user/delite", userData)
			.then(res => {
				alert("사용지 정보 삭제 성공~~~~~~");
				navigate('/user');
			})
			.catch(error => {
				console.error("오류:", error);
			})
		}else{
			return;
		}
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
						<li>아이디</li><li className="txt-left">
						{userData.id === "" ? <input type="text" name="id" value={inptus.id} onChange={onChange} /> :
						<input type="text" name="id" value={inptus.id} onChange={onChange} disabled />}
						</li>
					</ul>
					<ul><li>이름</li><li className="txt-left"><input type="text" name="name" value={inptus.name} onChange={onChange} /></li></ul>
					<ul><li>내용</li><li className="txt-left"><textarea name="comment" value={inptus.comment} onChange={onChange} rows="10" cols="50" /></li></ul>
				</div>
				<div className="btn-grp">
					<ul>
						{userData.id === "" ? <li><button type="submit">등록</button></li> : <li><button type="submit">수정</button></li>}
						{userData.id === "" ? null : <li><button type="button" onClick={(() => delite())}>삭제</button></li>}
						<li><button type="button" onClick={list}>목록</button></li>
					</ul>
				</div>
			</form>
		</header>
  	);
}

export default User;