import logo from './logo.svg';
import './App.css'
import {useEffect, useState} from "react";
import axios from "axios";

function Sample(){
	/*const sumDate = '2023-01-01';
	const exDivCode = 'A';
	const tcsType = 'Y';
	const carType = 'Sedan';*/
	
	const [data, setData] = useState([]);
			
	useEffect(() => {
		/*axios.get('/hello')
		.then(res => setData(res.data))
		.then((result) => {console.log(result);})*/
		
		/*fetch("/hello")
		.then((res) => {
			return res.json();
       	})
       	.then((result) => {
			setData(result);
			console.log(JSON.stringify(result));
		})*/
		
		axios.get("/hello")
		.then(res => {
			/*console.log("res:" + console.log(JSON.stringify(res)));*/
			setData(res.data);
		});
  	},[])  
	
	return (
		<div className="App">
	      <header className="App-header">
	        <img src={logo} className="App-logo" alt="logo" />
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
			<ul>
				{data.map((v,idx) => <li key={idx}>{v.content}</li>)}
	      	</ul>
	      </header>
	    </div>
  	);
}

export default Sample;