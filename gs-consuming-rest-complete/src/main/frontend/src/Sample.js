import React, {useEffect, useState} from "react";
import axios from "axios";

function Sample(){
	const [data, setData] = useState([]);
			
	useEffect(() => {
		axios.get("http://localhost:9000/api/sample")
		.then(res => {
			return res.data;
       	})
       	.then(result => {
			/*console.log(JSON.stringify(result));*/
           	setData(result);
     	})
		
		/*fetch("/api/sample")*/
		/*axios.get("http://localhost:9000/api/sample")
		.then(response => {
			console.log(JSON.stringify(response));
			setData(response.data);
       	})
		.catch(error => {
			console.error("오류:", error);
		})*/		
  	},[])  
	
	return (
		<header className="App-header">
			<div className="div-item">
				<ul>
					<li>sample 이동 화면</li>
				</ul>
				<ul>	
					<li>{data}</li>
				</ul>
			</div>
		</header>	
  	);
}

export default Sample;