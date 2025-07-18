import React from "react";

function Model({isOpen, onClose, children}){
	return(
		<div className="modal" style={{display:isOpen ? "block" : "none"}}>
		    <div className="modal_popup">
		        <h3>모달 팝업 타이틀 입니다!</h3>
		        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
		        <div>1111111</div>
				<button type="button" className="close_btn" onClick={onClose}>닫기</button>
		    </div>
		</div>
	)
}

export default Model;
