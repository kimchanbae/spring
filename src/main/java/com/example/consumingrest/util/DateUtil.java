package com.example.consumingrest.util;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public final class DateUtil {

	public static String nowTime () {
		LocalDateTime now = LocalDateTime.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
		String formatterTime = now.format(formatter);
		
		return formatterTime;
	}
	
}
