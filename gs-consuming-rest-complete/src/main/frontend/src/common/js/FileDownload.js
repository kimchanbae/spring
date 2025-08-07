import axios from "axios";

const FileDownload = async (filename) => {
    const data = {filename:filename};

    try{
        // const response = await fetch("http://localhost:9000/common/fileDownload", 
        // 	{method:'post', headers:{"Content-Type":"application/json"}, body: JSON.stringify(data)}
        // );

        const response = await axios.post("http://localhost:9000/common/fileDownload", data, {responseType:"blob"})
        
        // fatch로 호출시
        // if(!response.ok){
        // 	throw new Error("다운로드 실패..."); 
        // }

        if(!response.data){
            throw new Error("다운로드 실패...");  
        }

        // 파일 blob 받아옴
        // const blob = await response.blob();		// fatch로 호출시 
        const blob = new Blob([response.data]);		// axios로 호출시 
        // blob를 url로 변환
        const url = window.URL.createObjectURL(blob);

        // const disposition = response.headers.get('Content-Disposition');
        const disposition = response.headers["Content-Disposition"];

        // if(disposition && disposition.includes('filename=')){
        // 	const matches = disposition.match(/filename\*=UTF-8''(.*)/);
        // 	if(matches && matches.length > 1){
        // 		filename = decodeURIComponent(matches[1]);
        // 	}else{
        // 		const normalMatch = disposition.match(/filename="?(.+?)"?$/);
        // 		if(normalMatch && normalMatch[1]){
        // 			filename = normalMatch[1];
        // 		}
        // 	}
        // }

        // 동적으로 a태그를 생성하여 다운로드 트리거
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
        
        // 다운로드후 생성한 url객체 해제
        window.URL.revokeObjectURL(url);
    }catch(error){
        alert("파일 다운로드에 실패....");
        console.error("오류:", error);
    }
}

export default FileDownload;
