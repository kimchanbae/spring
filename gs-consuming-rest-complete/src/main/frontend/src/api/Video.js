import React, {useEffect, useState, useRef} from "react";
import axios from "axios";

function User(){
	const [data, setData] = useState([]);
	const inputRef = useRef();
	// const data = [
	// 	{"title": "오징어게임", "content": "오징어게임 내용"},
	// 	{"title": "판타스틱4", "content": "판타스틱4 내용"}
	// ];

	useEffect(() => {
		axios.get("http://localhost:9000/api/video")
		.then(res => {
			setData(res.data);
		});

		inputRef.current.focus();
  	},[])
	
	/* 검색조건 셋팅 객체 생성 */
	const [schInptus, setSchInptus] = useState({
		title: "",
		comment: "",
		actor: ""
	})
	const {title, comment, actor} = schInptus;

	/* 검색조건 입려폼 수정시 */
	const onChange = (e) => {
		const {id, value} = e.target;
		setSchInptus({
			...schInptus,
			[e.target.id]: e.target.value
		})
	}

	/* 검색조건 조회 */
	const search = () => {
		axios.post("http://localhost:9000/api/video", schInptus)
		.then(res => {
			setData(res.data);
		});
	}

	/*상세*/
	const detail = (seq) => {
		
	}
	
	return (
		<header className="App-header">
			<form name="schForm" className="sch-form">
				<div className="sch-div">
					<ul>
						<li>제목</li>
						<li><input ref={inputRef} type="text" id="title" value={title} onChange={onChange} /></li>
						<li>내용</li>
						<li><input type="text" id="comment" value={comment} onChange={onChange} /></li>
						<li>배우명</li>
						<li><input type="text" id="actor" value={actor} onChange={onChange} /></li>
						<li><button type="button" onClick={search}>검색</button></li>
					</ul>
				</div>
			</form>
			<div className="div-item">	
				<ul className="header">
					<li className="w-150">제목</li>
					<li className="w-300">내용</li>
					<li className="w-150">배우명</li>
				</ul>
				{data.map((v) => 
					<ul>
						<li className="w-150">{v.title}</li>
						<li className="w-300">{v.comment}</li>
						<li className="w-150">{v.actor}</li>
					</ul>
				)}
			</div>
			<div className="btn-grp">
				<ul>
					<li><button onClick={() => detail('')}>등록</button></li>
				</ul>
			</div>
		</header>
  	);
}

export default User;