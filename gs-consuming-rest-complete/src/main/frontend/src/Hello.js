/*import logo from './logo.svg';*/ 
import React, {useEffect, useState} from "react";
import './App.css'
import axios from "axios"; 

function Hello(){
	/*const sumDate = '2023-01-01';
	const exDivCode = 'A';
	const tcsType = 'Y';
	const carType = 'Sedan';*/
	
	const [data, setData] = useState([]);
	/*const [data, setData] = useState('');*/
			
	useEffect(() => {
		/*axios.get('/hello')
		.then(res => setData(res.data))
		.then((result) => {console.log(result);})*/
		
		/*fetch("/http://localhost:3000/")
		.then((res) => {
			alert("res:" + res.data);
			return res.json();
       	})
       	.then((result) => {
			setData(result);
			console.log(JSON.stringify(result));
		})*/
		
		/*axios.get("http://localhost:9000/api/hello")
		.then(res => {
			console.log("res:" + console.log(JSON.stringify(res.data)));
			setData(res.data);
		})*/
		
		axios.get("http://localhost:9000/hello")
		.then(res => {
			console.log("res:" + console.log(JSON.stringify(res.data)));
			setData(res.data);
		})
  	},[])  
	
	return (
		<div className="App">
	      <header className="App-header">
	        <p>
	          Edit <code>src/App.js</code> and save to reload. 
	        </p>
	        <a
	          className="App-link"
	          href="https://reactjs.org"
	          target="_blank"
	          rel="noopener noreferrer"
	        >
	          Learn React
	        </a>
			<a
	          className="App-link"
	          href="/sample"
	        >
	          api sample 이동
	        </a>
			<a
	          className="App-link"
	          href="/user"
	        >
	          사용자정보 이동
	        </a>
			<ul>
				{data.map((v,idx) => <li key={idx}>{v.content}</li>)}
	      	</ul>
	      </header>
	    </div>
  	);
}

export default Hello;