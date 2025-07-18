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
	function model(userId){
		setOpen(true);
	}
	
	return (
		<div className="App">
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
				</Model>
	      	</header>
	    </div>
  	);
}

export default User;