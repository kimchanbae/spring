import React, {useEffect, useRef, useState} from "react";
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import axios from "axios";
import Model from "/src/common/js/model";
// import ReactPaginate from "react-paginate";

function User(){
	const [data, setData] = useState([]);
	const [rowCount, setRowCount] = useState('');
	const inputRef = useRef();

	/* 검색조건 셋팅 객체 생성 */	
	const [searchParames, setSearchParames] = useState({
		id:"",
		name:""
	});
	const {id, name} = searchParames;

	const [searchKeyword] = useSearchParams();		/* 입력된 검색 키원드 객체 */

	useEffect(() => {
		/* 검색시 키원드에 입력된 정보 조회 */
		// const keywordId = localStorage.getItem('searchId');
		// const keywordName = localStorage.getItem('searchName');
		// const searchKeyword = JSON.parse(localStorage.getItem('search'));

		/* 검색조건 검색설정된 정보 있을시 */
		// if(keywordId || keywordName){
		// if(searchKeyword){
			// searchParames.id = keywordId;
			// searchParames.name = keywordName;
			// searchParames.id = searchKeyword.id;
			// searchParames.name = searchKeyword.name;
		// }

		searchParames.id = searchKeyword.get("id");
		searchParames.name = searchKeyword.get("name");

		search();

		inputRef.current.focus();	/* 검색조건 아이디 포커스 */
  	}, [])

	/* 검색조건 조회 */
	const search = () => {
		// axios.post("http://localhost:9000/api/user", searchParames)
		axios.post("http://localhost:9000/api/user", searchParames)
		.then(res => {
			setRowCount(res.data.length);
			setData(res.data);

			/* 검색조건 설정정보 저장 */
			// localStorage.setItem('searchId', searchParames.id);
			// localStorage.setItem('searchName', searchParames.name);
			// localStorage.setItem('search', JSON.stringify(searchParames));

			// setTimeout(() => {
			// 	localStorage.clear();	// 로컬스토리지 클리어
			// }, 100000);
		});
	}

	const [searchStstus, setSearchStatus] = useState(false);
	/* 검색 버튼 클릭 */
	const searchClick = () => {
		search();

		setSearchStatus(true);
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
	const [keyword, setKeyword] = useState({id:"", name:""});
	const detail = (userId, file_seq) => {
		if(searchStstus){
			keyword.id = searchParames.id;
			keyword.name = searchParames.name;
		}

		if(!searchStstus){
			if(searchKeyword.get("id") == null){keyword.id = ""}else{keyword.id = searchKeyword.get("id")};
			if(searchKeyword.get("name") == null){keyword.name = ""}else{keyword.name = searchKeyword.get("name")};
		}

		/*상세 페이지 이동 state 파라미터 셋팅*/
		navigate('/user/view', {state : {id:userId, file_seq:file_seq, searchKeyword:keyword}});
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
		<React.Fragment>
			<div className="grid grid-cols-2 gap-4">
				<div className="mt-10 justify-self-start">사용자 정보</div>
				<div className="mt-10 justify-self-end">총건수:{rowCount}건</div>
			</div>
			<div className="flex">
				<form name="schForm">
					<div className="w-50 border border-solid border-gray-500">아이디</div>
					<div className="ml-4"><input className="w-150 bg-white-100 border border-solid border-gray-500" ref={inputRef} type="text" id="id" value={searchParames.id} onChange={onChange} /></div>
					{/* <li><input ref={inputRef} type="text" id="id" value={id} onChange={(e) => setId(e.target.value)} /></li> */}
					<div className="w-50 ml-4 border border-solid border-gray-500">이름</div>
					<div className="ml-4"><input className="w-150 bg-white-100 border border-solid border-gray-500" type="text" id="name" value={searchParames.name} onChange={onChange} /></div>
					{/* <li><input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} /></li> */}
					<div><button className="bg-blue-400" type="button" onClick={searchClick}>검색</button></div>
				</form>
			</div>
			<div className="overflow-x-auto bg-white shadow-md overflow-y-auto max-h-screen">
				<table className="min-w-full divide-y divide-gray-200 bg-sky-50">
					<thead className="bg-gray-200">
						<tr>
							<th className="px-4 py-2 font-semibold">순번</th>
							<th className="px-4 py-2 font-semibold">아이디</th>
							<th className="px-4 py-2 font-semibold">이름</th>
							<th className="px-4 py-2 font-semibold">내용</th>
							<th className="px-4 py-2 font-semibold">상세</th>
							<th className="px-4 py-2 font-semibold">팝업</th>
							<th className="px-4 py-2 font-semibold">등록일시</th>
						</tr>
					</thead>
					<tbody>
					{data.map((v, idx) =>
						<tr className="">
							<td className="px-4 py-2 border-r-1 border-b border-solid border-gray-400">{idx}</td>
							<td className="px-4 py-2 hover:bg-blue-200" onClick={() => detail(v.id, v.file_seq)}>{v.id}</td>
							<td className="px-4 py-2 hover:bg-blue-200">{v.name}</td>
							<td className="px-4 py-2 text-left" onMouseEnter={() => handleMouseEnter(v.seq)} onMouseLeave={handleMouseLeave}>
								{(isHoverd && v.seq === TooltipIdx && <div className="hover-content">{v.comment}</div>)}{v.comment}
							</td>
							<td className="px-4 py-2"><button className="bg-blue-400" onClick={() => detail(v.id, v.file_seq)}>상세(view)</button></td>
							<td className="px-4 py-2"><button className="bg-red-400" onClick={() => model(v.id)}>상세(팝업)</button></td>
							<td className="px-4 py-2">{v.reg_date}</td>
						</tr>
					)}
					</tbody>
				</table>
			</div>
			{/* <div className="div-item">
				<div className="header">
					<ul>
						<li className="w-50">순번</li>	
						<li className="w-100">아이디</li>
						<li className="w-150">이름</li>
						<li className="w-300">내용</li>
						<li className="w-100">상세</li>
						<li className="w-100">팝업</li>
						<li>등록일시</li>
					</ul>
				</div>
				{data.map((v, idx) =>  
				<div className="row">
					<ul>
						<li className="w-50">{idx}</li>
						<li className="w-100" onClick={() => detail(v.id)}>{v.id}</li>
						<li className="w-150 txt-left">{v.name}</li>
						<li className="w-300 txt-left" onMouseEnter={() => handleMouseEnter(v.seq)} onMouseLeave={handleMouseLeave}>
							{(isHoverd && v.seq === TooltipIdx && <div className="hover-content">{v.comment}</div>)}{v.comment}
						</li>
						<li className="w-100"><button onClick={() => detail(v.id, v.file_seq)}>상세(view)</button></li>
						<li className="w-100"><button onClick={() => model(v.id)}>상세(팝업)</button></li>
						<li>{v.reg_date}</li>
					</ul>
				</div>
				)}
			</div> */}
			<div>
				{/* <ReactPaginate pageCount={5} pageRangeDisplayed={5} marginPagesDisplayed={2}></ReactPaginate> */}
			</div>
			<div className="btn-grp">
				<ul>
					<li><button className="bg-blue-600 mt-5" onClick={() => detail('')}>등록</button></li>
				</ul>
			</div>
			<Model isOpen={open} onClose={() => setOpen(false)}>
				<h3>사용자 정보</h3>	
				<div className="det-div">
					<ul><li className="det-header">아이디</li><li className="det-cont">{userData.id}</li></ul>
					<ul><li className="det-header">이름</li><li className="det-cont">{userData.name}</li></ul>
					<ul><li className="det-header">내용</li><li className="det-cont">{userData.comment}</li></ul>
					<ul><li className="det-header">첨부파일</li><li className="det-cont">{userData.file_name}</li></ul>
				</div>
			</Model>
  		</React.Fragment>
	);
}

export default User;