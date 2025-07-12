/*import logo from './logo.svg';*/
import React, {useEffect, useState} from "react";
import './App.css'
import axios from "axios";

function Sample(){
	/*const sumDate = '2023-01-01';
	const exDivCode = 'A';
	const tcsType = 'Y';
	const carType = 'Sedan';*/
	
	const [data, setData] = useState([]);
			
	useEffect(() => {
		/*axios.get('/sample')
		.then(res => setData(res.data))
		.then(function (result){console.log(result)})*/
		
		/*fetch("/sample")*/
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
  		<ul>
      		sample 이동 화면
			<li>{data}</li>
  		</ul>
  	);
}

export default Sample;