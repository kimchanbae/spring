import React, {useEffect, useState} from "react";
import '/src/App.css'
import '/css/Custorom.css'
import axios from "axios";

function User(){
	const [data, setData] = useState([]);
	
	useEffect(() => {
		axios.get("http://localhost:9000/api/user")
		/*axios.get("http://localhost:9000/user")*/
		/*fetch("/api/user")*/
		.then(res => {
			console.log("res:" + console.log(JSON.stringify(res)));
			setData(res.data);
		});
		
		/*fetch("/user")
		.then((res) => {
			return res.json();
       	})*/
  	},[])  
	
	return (
		<div className="App div-item">
	      <header className="App-header">
		  	<ul><li>아이디</li><li>이름</li></ul>
		  	<ul>
				{data.map((v,idx) => <li key={idx}>{v.id}</li>)}
				{data.map((v,idx) => <li key={idx}>{v.name}</li>)}
	      	</ul>
	      </header>
	    </div>
  	);
}

export default User;