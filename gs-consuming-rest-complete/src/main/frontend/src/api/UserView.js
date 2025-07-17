import React, {useEffect, useState} from "react";
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';

function User(){
	const location = useLocation();
	const userData = {...location.state };
	const navigate = useNavigate();
	const [data, setData] = useState([]);
	const [saveBtn, setBtn] = useState('');
	
	/* 입력폼 사용자정보 셋팅 객체 생성 */
	const [inptus, setInptus] = useState({
		id: "",
		name: "",
		content: ""
	});
	const {id, name, content} = inptus;
	
	useEffect(() => {
		if(userData.id == ""){
			setBtn(<button type="submit">등록</button>);
		}else{
			setBtn(<button type="submit">수정</button>);
		}
		
		/*axios.get("http://localhost:9000/api/user/view?id=" + userData.id)*/
		axios.post("http://localhost:9000/api/user/view", userData)
		.then(res => {
			console.log("res:" + console.log(JSON.stringify(res.data)));
			setData([res.data]);	/* 사용자정보 조회 객체 */
			
			setInptus(res.data);	/* 입력폼 사용자정보 객체 */
		})
  	},[])
	
	/*입려폼 수정*/
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
				saveMode="update"
			}
			data.mode = saveMode;
			
			axios.post("http://localhost:9000/api/user/save", data)
			.then(res => {
				alert("사용지 정보 등록 성공~~~~~~");
				navigate('/user');
			})
			.catch(error => {
				console.error("오류:", error);
			})
		}else{
			return;
		}
	}
	
	return (
		<div className="App">
			<header className="App-header">
				<form name="userForm" onSubmit={onSubmit}>
					<div className="det-div">
						{data.map((v,idx) => 
							<ul><li>아이디</li><li key={idx}><input type="text" name="id" value={inptus.id} onChange={onChange} /></li></ul>
						)}
						{data.map((v,idx) => 
							<ul><li>이름</li><li key={idx}><input type="text" name="name" value={inptus.name} onChange={onChange} /></li></ul>
						)}
						{data.map((v,idx) => 
							<ul><li>내용</li><li key={idx}><textarea name="content" value={inptus.content} onChange={onChange} rows="10" cols="50" /></li></ul>
						)}
					</div>
					<div className="btn-grp">
						<ul>
							<li>{saveBtn}</li> 
							<li><a className="App-link" href="/user">이전</a></li>
						</ul>
					</div>
				</form>
	      </header>
	    </div>
  	);
}

export default User;