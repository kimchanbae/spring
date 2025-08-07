import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import FileDownload from "../js/FileDownload";

function File(){
    const [data, setData] = useState([]);
    const [rowCount, setRowCount] = useState('');
    const inputRef = useRef();

    /* 검색조건 셋팅 객체 생성 */	
    const [searchParames, setSearchParames] = useState({
        name:"",
        path:""
    });
    const {name, path} = searchParames;

    useEffect(() => {
        /* 검색시 키원드에 입력된 정보 조회 */
        const searchKeyword = JSON.parse(localStorage.getItem('search'));

        /* 검색조건 검색설정된 정보 있을시 */
        if(searchKeyword){
            searchParames.name = searchKeyword.name;
            searchParames.path = searchKeyword.path;
        }

        search();
        
        inputRef.current.focus();	/* 검색조건 아이디 포커스 */
    }, [])

    /* 검색조건 조회 */
    const search = () => {
        axios.post("http://localhost:9000/common/fileList", searchParames)
        .then(res => {
            setRowCount(res.data.length);
            setData(res.data);

            /* 검색조건 설정정보 저장 */
            localStorage.setItem('search', JSON.stringify(searchParames));

            setTimeout(() => {
                localStorage.clear();	// 로컬스토리지 클리어
            }, 100000);
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
            <div className="title"><ul><li>파일 정보</li><li className="grd-count">총건수:{rowCount}건</li></ul></div>
            <form name="schForm" className="sch-form">
                <div className="sch-div">
                    <ul>
                        <li>
                            <div className="sch-left">
                                <ul>
                                    <li>파일명<input ref={inputRef} type="text" id="name" value={searchParames.name} onChange={onChange} /></li>
                                    <li>파일경로<input type="text" id="path" value={searchParames.path} onChange={onChange} /></li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <div className="sch-btn">
                                <button type="button" onClick={search}>검색</button>
                            </div>
                        </li>
                    </ul>
                </div>
            </form>
            <div className="div-item">
                <div className="header">
                    <ul>
                        <li className="w-300">파일명</li>
                        <li className="w-150">파일경로</li>
                        <li className="w-100">확장자</li>
                        <li className="w-100">api</li>
                        <li className="w-150">다운로드</li>
                    </ul>
                </div>
                {data.map((v) => 
                <div className="row">
                    <ul>
                        <li className="w-300">{v.name}</li>
                        <li className="w-150">{v.path}</li>
                        <li className="w-100" onMouseEnter={() => handleMouseEnter(v.seq)} onMouseLeave={handleMouseLeave}>
                            {(isHoverd && v.seq === TooltipIdx && <div className="hover-content">{v.extents}</div>)}{v.extents}
                        </li>
                        <li className="w-100">{v.api_compent}</li>
                        <li className="w-150"><button type="button" onClick={() => FileDownload(v.name)}>다운로드</button></li>
                    </ul>
                </div>
                )}
            </div>
            <div className="btn-grp">
				<ul>
					<li></li>
				</ul>
			</div>
        </header>
    );
}

export default File;