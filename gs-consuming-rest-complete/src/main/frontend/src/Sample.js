import React, {useEffect, useState} from "react";
import axios from "axios";
import SampleLeft from "./compent/SampleLeft"
import Model from "/common/model";

function Sample(){
	const [data, setData] = useState([]);
			
	useEffect(() => {
		axios.get("http://localhost:9000/api/sample")
		.then(res => {
			return res.data;
       	})
       	.then(result => {
           	setData(result);
     	})
  	},[])
	
	/* 카운트 증가,빼기 객체 */
	const [count, setCount] = useState(0);
	/* 카운트증가 */
	const handleCountPlus = () => {
		setCount(count+1);
	}
	/* 카운트빼기 */
	const handleCountMinus = () => {
		if(count >= 1){
			setCount(count-1);
		}
	}

	/* 모달 */
	const [open, setOpen] = useState(false);
	const modelOpen = () => {
		setOpen(true);
	} 
	
	return (
		<header className="App-header">
			<div>
				<div className="sample-left">
					<SampleLeft />
				</div>
				<div className="sample-div">
					<ul>	
						API 호출 데이터: {data}
					</ul>
					<ul>
						카운트:<input type="text" id="count" value={count} />
						<button type="button" onClick={handleCountPlus}>카운트증가</button>
						<button type="button" onClick={handleCountMinus}>카운트빼기</button>
					</ul>
					<ul>
						<button onClick={modelOpen}>모달호출</button>
					</ul>
				</div>
			</div>
			<Model isOpen={open} onClose={() => setOpen(false)}>
				<h1>모달 샘플</h1>
				<div>모달샘플 내용 정보</div>
			</Model>
		</header>
  	);
}

export default Sample;