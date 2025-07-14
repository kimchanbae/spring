import React, {useEffect, useState} from "react";
import '/src/App.css'
import '/css/Custorom.css'
import axios from "axios";

function User(){
	/*const [data, setData] = useState([]);*/
	const data = [
		{"title": "오징어게임", "content": "오징어게임 내용"},
		{"title": "판타스틱4", "content": "판타스틱4 내용"}
	];
	
	useEffect(() => {
		/*axios.get("http://localhost:9000/api/video")
		.then(res => {
			console.log("res:" + console.log(JSON.stringify(res)));
			setData(res.data);
		})*/;
  	},[])  
	
	return (
		<div className="App div-item">
	      <header className="App-header">
		  	<ul><li>제목</li><li>내용</li></ul>
			{data.map((v) => 
				<ul>
				<li>{v.title}</li>
				<li>{v.content}</li>
				</ul>
			)}
	      </header>
	    </div>
  	);
}

export default User;