import React, {useEffect, useState} from "react";
import axios from "axios"; 

function Hello(){
	const [data, setData] = useState([]);
	/*const [data, setData] = useState('');*/
			
	useEffect(() => {
		/*fetch("/http://localhost:3000/")
		.then((res) => {
			alert("res:" + res.data);
			return res.json();
       	})
       	.then((result) => {
			setData(result);
			console.log(JSON.stringify(result));
		})*/
		
		axios.get("http://localhost:9000/hello")
		.then(res => {
			console.log("res:" + console.log(JSON.stringify(res.data)));
			setData(res.data);
		})
  	},[])  
	
	return (
		<div className="mt-10 min-h-screnn flex bg-gray-100 grid grid-cols-2 gap-4">
				<a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">리액트API 이동</a>
				<ul className="main">
					{data.map((v,idx) =>  <li key={idx}>{v.content}</li> )}
				</ul>
		</div>
  	);
}

export default Hello;