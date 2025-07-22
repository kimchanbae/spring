import React, {useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Model from "/common/model";

function User(){
	const [data, setData] = useState([]);
	
	useEffect(() => {
		axios.get("http://localhost:9000/api/user")
		.then(res => {
			console.log("res:" + console.log(JSON.stringify(res)));
			setData(res.data);
		});
		
		/*fetch("/user")
		.then((res) => {
			return res.json();
       	})*/
  	},[])
	
	/*상세*/
	const navigate = useNavigate();
	function detail(userId){
		/*상세 페이지 이동 state 파라미터 셋팅*/
		navigate('/user/view', {state : {id:userId}});
	}
	
	/*모달*/
	const [open, setOpen] = useState(false);
	const [userData, setUserData] = useState([]);
	function model(userId){
		/*모달 오픈*/
		setOpen(true);
		
		let userData = {"id":userId};
		
		axios.post("http://localhost:9000/api/user/view", userData)
		.then(res => {
			setUserData(res.data);
		});
	}
	
	return (
		<header className="App-header">
			<div className="div-item">
				<ul>
					<li className="w-300">아이디</li>
					<li className="w-300">이름</li>
					<li className="w-100">상세</li>
					<li className="w-100">팝업</li>
				</ul>
				{data.map((v,idx) => 
					<ul>
						<li className="w-300" key={idx}>{v.id}</li>
						<li className="w-300" key={idx}>{v.name}</li>
						<li className="w-100"><button onClick={() => detail(v.id)}>상세(view)</button></li>
						<li className="w-100"><button onClick={() => model(v.id)}>상세(팝업)</button></li>
					</ul>
				)}
			</div>
			<div className="btn-grp">
				<ul>
					<li><button onClick={() => detail('')}>등록</button></li>
				</ul>
			</div>
			<Model isOpen={open} onClose={() => setOpen(false)}>
				<h3>사용자 정보</h3>	
				<div className="det-div">
					<ul><li>아이디</li><li className="left">{userData.id}</li></ul>
					<ul><li>이름</li><li className="left">{userData.name}</li></ul>
					<ul><li>내용</li><li className="left">{userData.comment}</li></ul>
				</div>
			</Model>
		</header>
  	);
}

export default User;