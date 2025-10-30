import React from "react";

function Model({isOpen, onClose, children}){
	/*onClose:모달 close*/
	
	return(
		<div className="modal" style={{display:isOpen ? "block" : "none"}}>
		    <div className="modal_popup">
				{children}
				<div className="btn-grp">
					<button type="button" className="close_btn" onClick={onClose}>닫기</button>
				</div>
		    </div>
		</div>
	)
}

export default Model;
