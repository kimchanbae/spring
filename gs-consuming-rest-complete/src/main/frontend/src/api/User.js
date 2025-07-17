import React, {useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function User(){
	const [data, setData] = useState([]);
	const navigate = useNavigate();
	
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
	
	function detail(userId){
		/*상세 페이지 이동 state 파라미터 셋팅*/
		navigate('/user/view', {state : {id:userId}});
	}
	
	return (
		<div className="App div-item">
	      	<header className="App-header">
	  			<ul><li>아이디</li><li>이름</li><li></li></ul>
				{data.map((v,idx) => 
					<ul>
						<li key={idx}>{v.id}</li>
						<li key={idx}>{v.name}</li>
						<li><button onClick={() => detail(v.id)}>상세</button></li>
					</ul>
				)}
				<div className="btn-grp">
					<ul>
						<li><button onClick={() => detail('')}>등록</button></li>
					</ul>
				</div>
	      	</header>
	    </div>
  	);
}

export default User;