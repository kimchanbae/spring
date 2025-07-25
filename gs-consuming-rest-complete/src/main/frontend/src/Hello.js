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
		<header className="App-header">
			<div className="div-item">
					{/* <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">Learn React</a> */}
					<ul className="main">
						{data.map((v,idx) =>  <li key={idx}>{v.content}</li> )}
					</ul>
			</div>
	    </header>
  	);
}

export default Hello;