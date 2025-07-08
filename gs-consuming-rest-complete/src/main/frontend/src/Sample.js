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
		/*axios.get('/sample')
		.then(res => setData(res.data))
		.then(function (result){console.log(result)})*/
		
		fetch("/sample")
		.then((res) => {
         	return res.json();
       	})
       	.then(function (result) {
           	setData(result);
			console.log(JSON.stringify(result));
     	})		
  	},[])  
	
	return (
  		<ul>
      		{data.map((v,idx)=><li key={`${idx}-${v}`}>{v}</li>)}
  		</ul>
  	);
}

export default Sample;