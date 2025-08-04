package com.example.consumingrest.common.controller;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriUtils;


@RestController
@RequestMapping("/common")
public class FileController {

	private static final Logger log = LoggerFactory.getLogger(FileController.class);
	
	@Value("${file.upload-dir}")
	private String uploadDir;
	
	@PostMapping("/fileUpload")
	public ResponseEntity<String> fileUpload(@RequestParam("file") MultipartFile files) throws Exception {
		log.debug("============== 파일 업로드 =====================");
		log.debug(files.toString());
		
		if(files.isEmpty()) {
			return ResponseEntity.badRequest().body("파일을 선택하세요...");
		}
		
		// 파일 저장 경로
//		String uploadDir = "uploads/";
		File uploadDirFile = new File(uploadDir);
		
		// 디렉토리가 없으면 디렉토리 생성
		if(!uploadDirFile.exists()) {
			uploadDirFile.mkdir();		
		}
		
		try {
			String fullFilePath = uploadDir + files.getOriginalFilename();
			Path path = Paths.get(fullFilePath).toAbsolutePath();
			
//			files.transferTo(new File(uploadDir + files.getOriginalFilename()));
			files.transferTo(path.toFile());
			
			return ResponseEntity.ok("파일 업로드 성공...");
		}catch (IOException e) {
			// TODO: handle exception
			e.printStackTrace();
			return ResponseEntity.status(500).body("파일 업로드 실패.....");
		}
	}
	
	@PostMapping("/fileDownload")
	public ResponseEntity<Resource> fileDownload(@RequestBody Map map) throws Exception{
		// 파일경로지정
//		Path filePath = Paths.get(uploadDir).resolve(map.get("filename").toString()).normalize();
		Path filePath = Paths.get(uploadDir + map.get("filename"));
		
		log.debug(filePath.toString());
		
		if(!Files.exists(filePath)) {
			// 파일이 없다면 404응답
			return ResponseEntity.notFound().build();
		}
		
		Resource resource = new UrlResource(filePath.toUri());
		MediaType mediaType = MediaType.APPLICATION_OCTET_STREAM;
		
		String encodeFileName = UriUtils.encode(map.get("filename").toString(), StandardCharsets.UTF_8);
		
		// 파일을 응답으로 보내기 위한 헤더 설정 
		HttpHeaders headers = new HttpHeaders();
//		headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment:filename=\"" + resource.getFilename() + "\"");
		headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment: filename*=UTF-8''" + encodeFileName);
		
		return ResponseEntity.ok()
				.contentType(mediaType)
				.headers(headers)
				.body(resource);
	}
	
}
