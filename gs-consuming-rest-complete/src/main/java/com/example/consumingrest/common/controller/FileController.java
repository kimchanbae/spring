package com.example.consumingrest.common.controller;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.io.FilenameUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpServerErrorException.InternalServerError;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriUtils;

import com.example.consumingrest.common.service.FileService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;


@RestController
@RequestMapping("/common/file")
public class FileController {

	private static final Logger log = LoggerFactory.getLogger(FileController.class);
	
	@Value("${file.upload-dir}")
	private String uploadDir;
	
	@Autowired
	private FileService fileService;
	
	
	@PostMapping("/fileList")
	public List list(@RequestBody Map paramMap) {
		List<Map<String, Object>> list = fileService.list(paramMap); 
		
		return list;
	}
	
	@PostMapping("/api/fileList")
	public List apiFileList(@RequestBody Map paramMap) {
		List<Map<String, Object>> list = fileService.apiFileList(paramMap); 
		
		return list;
	}
	
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
			
				
			Map file = new HashMap<>();
			file.put("name", files.getOriginalFilename());
			file.put("path", uploadDir);
			file.put("extents", FilenameUtils.getExtension(files.getOriginalFilename()).toLowerCase()); 
			
			fileService.insert(file);
			
			return ResponseEntity.ok("파일 업로드 성공...");
		}catch (IOException e) {
			// TODO: handle exception
			e.printStackTrace();
			return ResponseEntity.status(500).body("파일 업로드 실패.....");
		}
	}
	
	@PostMapping("/api/fileUpload")
//	public ResponseEntity<String> fileUpload(@RequestParam("file") MultipartFile files, @RequestParam("params") String params) throws Exception {
	public ResponseEntity<Map<String, Object>> fileUpload(@RequestParam("file") MultipartFile files, @RequestParam("params") String params) throws Exception {	
		log.debug("============== 파일 업로드 =====================");
		log.debug(files.toString());
		log.debug("parammap:" + params);
		
		Map<String, Object> response = new HashMap<>();
		
		if(files.isEmpty()) {
			response.put("message", "파일을 선택하세요...");
			return ResponseEntity.badRequest().body(response);
		}
		
		// 파일 저장 경로
//		String uploadDir = "uploads/";
		File uploadDirFile = new File(uploadDir);
		
		// 디렉토리가 없으면 디렉토리 생성
		if(!uploadDirFile.exists()) {
			uploadDirFile.mkdir();		
		}
		
		// json데이터를 Map으로 변환
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> paramMap = objectMapper.readValue(params, new TypeReference<Map<String, Object>>() {});
		
		try {
			String fullFilePath = uploadDir + files.getOriginalFilename();
			Path path = Paths.get(fullFilePath).toAbsolutePath();
			
//			files.transferTo(new File(uploadDir + files.getOriginalFilename()));
			files.transferTo(path.toFile());
			
				
			Map file = new HashMap<>();
			file.put("name", files.getOriginalFilename());
			file.put("path", uploadDir);
			file.put("extents", FilenameUtils.getExtension(files.getOriginalFilename()).toLowerCase()); 
			file.put("api_compent", paramMap.get("apicompent"));
			
			Map<String, Object> fileMap = fileService.insert(file);
			
			response.put("message", "파일 업로드 성공...");
			response.put("fileMap", fileMap);
			return ResponseEntity.ok(response);
		}catch (IOException e) {
			// TODO: handle exception
			e.printStackTrace();
			
			response.put("message", "파일 업로드 실패.....");
			response.put("status", "500");
			return ResponseEntity.badRequest().body(response);
		}
	}
	
	@PostMapping("/api/multiFileUpload")
	public ResponseEntity<Map<String, Object>> fileUpload(@RequestParam("files") MultipartFile[] files, @RequestParam("params") String params) throws Exception {	
		log.debug("============== 파일 업로드 =====================");
		log.debug(files.toString());
		log.debug("parammap:" + params);
		
		Map<String, Object> response = new HashMap<>();
		
		// 파일 저장 경로
//		String uploadDir = "uploads/";
		File uploadDirFile = new File(uploadDir);
		
		// 디렉토리가 없으면 디렉토리 생성
		if(!uploadDirFile.exists()) {
			uploadDirFile.mkdir();		
		}
		
		// json데이터를 Map으로 변환
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> paramMap = objectMapper.readValue(params, new TypeReference<Map<String, Object>>() {});
		
		try {
			Map<String, Object> fileMap = new HashMap<>();
			
			for(MultipartFile file : files) {
				if(!file.isEmpty()) {
					String fullFilePath = uploadDir + file.getOriginalFilename();
					Path path = Paths.get(fullFilePath).toAbsolutePath();
			
					// 파일저장
					file.transferTo(path.toFile());
				
					Map param = new HashMap<>();
					param.put("name", file.getOriginalFilename());
					param.put("path", uploadDir);
					param.put("extents", FilenameUtils.getExtension(file.getOriginalFilename()).toLowerCase()); 
					param.put("api_compent", paramMap.get("apicompent")); 
					
					fileMap = fileService.insert(param);
				}
			}
			
			response.put("message", "파일 업로드 성공...");
			response.put("fileMap", fileMap);
			return ResponseEntity.ok(response);
		}catch (IOException e) {
			// TODO: handle exception
			e.printStackTrace();
			
			response.put("message", "파일 업로드 실패.....");
			response.put("status", "500");
			return ResponseEntity.badRequest().body(response);
		}
	}
	
	@PostMapping("/fileDownload")
	public ResponseEntity<Resource> fileDownload(@RequestBody Map map) throws Exception{
		// 파일경로지정
//		Path filePath = Paths.get(uploadDir).resolve(map.get("filename").toString()).normalize();
		Path filePath = Paths.get(uploadDir + map.get("filename"));
		
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
	
	@DeleteMapping("/{fileName}")
	public ResponseEntity<String> delete(@PathVariable String fileName){
		try {
			// 파일 저장 경로 + 파일명
			File file = new File(uploadDir + fileName);
			
			if(file.exists()) {
				if(file.delete()) {
					fileService.delete(fileName);
					
					return ResponseEntity.ok(fileName + " 파일 삭제성공");
				}else {
					return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(fileName + " 파일 삭제실패");
				}
			}else {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(fileName + " 파일이 존재하지 않음");
			}
		} catch (Exception e) {
			// TODO: handle exception
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("에러:" + e.getMessage());
		}
	}
	
}
