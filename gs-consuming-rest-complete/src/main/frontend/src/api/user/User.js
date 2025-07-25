import React, {useEffect, useRef, useState} from "react";
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import axios from "axios";
import Model from "/common/model";

function User(){
	const [data, setData] = useState([]);
	const inputRef = useRef();

	/* 검색조건 셋팅 객체 생성 */	
	const [searchParames, setSearchParames] = useState({
		id:"",
		name:""
	});
	const {id, name} = searchParames;

	useEffect(() => {
		const keywordId = localStorage.getItem('searchId');
		const keywordName = localStorage.getItem('searchName');

		/* 검색조건 검색설정된 정보 있을시 */
		if(keywordId || keywordName){
			searchParames.id = keywordId;
			searchParames.name = keywordName;
		}

		search();
		
		inputRef.current.focus();	/* 검색조건 아이디 포커스 */
  	}, [])

	/* 검색조건 조회 */
	const search = () => {
		axios.post("http://localhost:9000/api/user", searchParames)
		.then(res => {
			setData(res.data);

			/* 검색조건 설정정보 저장 */
			localStorage.setItem('searchId', searchParames.id);
			localStorage.setItem('searchName', searchParames.name);
		});
	}

	/* 검색조건 입려폼 수정시 */	
	const onChange = (e) => {
		const {id, value} = e.target;
		
		setSearchParames({
			...searchParames,
			[e.target.id]: e.target.value
		})
	}
	
	/*모달*/
	const [open, setOpen] = useState(false);
	const [userData, setUserData] = useState([]);
	function model(userId){
		/*모달 오픈*/
		setOpen(true);
		
		let userData = {"id":userId};
		
		axios.post("http://localhost:9000/api/user/view", userData)
		.then(res => {
			setUserData(res.data);
		});
	}

	/*상세*/
	const navigate = useNavigate();
	function detail(userId){
		/*상세 페이지 이동 state 파라미터 셋팅*/
		navigate('/user/view', {state : {id:userId}});
	}

	const [isHoverd, setIsHoverd] = useState(false);	/* 마우스 오버시,벗어났을때 객체 */
	const [TooltipIdx, setTooltipIdx] = useState();		/* 마우스 오버시 키값 객체 */
	/* 마우스 오버시 */
	const handleMouseEnter = (seq) => {
		setIsHoverd(true);
		setTooltipIdx(seq);
	}
	/* 마우스 벗어났을때 */
	const handleMouseLeave = () => {
		setIsHoverd(false);
	}
	
	return (
		<header className="App-header">
			<form name="schForm" className="sch-form">
				<div className="sch-div">
					<ul>
						<li>아이디</li>
						<li><input ref={inputRef} type="text" id="id" value={searchParames.id} onChange={onChange} /></li>
						{/* <li><input ref={inputRef} type="text" id="id" value={id} onChange={(e) => setId(e.target.value)} /></li> */}
						<li>이름</li>
						<li><input type="text" id="name" value={searchParames.name} onChange={onChange} /></li>
						{/* <li><input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} /></li> */}
						<li><button type="button" onClick={search}>검색</button></li>
					</ul>
				</div>
			</form>
			<div className="div-item">
				<ul className="header">
					<li className="w-100">아이디</li>
					<li className="w-150">이름</li>
					<li className="w-300">내용</li>
					<li className="w-100">상세</li>
					<li className="w-100">팝업</li>
				</ul>
				{data.map((v) => 
				<ul>
					<li className="w-100">{v.id}</li>
					<li className="w-150 txt-left">{v.name}</li>
					<li className="w-300 txt-left" onMouseEnter={() => handleMouseEnter(v.seq)} onMouseLeave={handleMouseLeave}>
						{(isHoverd && v.seq === TooltipIdx && <div className="hover-content">{v.comment}</div>)}{v.comment}
					</li>
					<li className="w-100"><button onClick={() => detail(v.id)}>상세(view)</button></li>
					<li className="w-100"><button onClick={() => model(v.id)}>상세(팝업)</button></li>
				</ul>
				)}
			</div>
			<div className="btn-grp">
				<ul>
					<li><button onClick={() => detail('')}>등록</button></li>
				</ul>
			</div>
			<Model isOpen={open} onClose={() => setOpen(false)}>
				<h3>사용자 정보</h3>	
				<div className="det-div">
					<ul><li>아이디</li><li className="txt-left">{userData.id}</li></ul>
					<ul><li>이름</li><li className="txt-left">{userData.name}</li></ul>
					<ul><li>내용</li><li className="txt-left">{userData.comment}</li></ul>
				</div>
			</Model>
		</header>
  	);
}

export default User;