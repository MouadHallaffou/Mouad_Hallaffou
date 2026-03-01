package com.portfolio.controllers;

import com.portfolio.services.FileStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/files")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class FileStorageController {

    private final FileStorageService fileStorageService;

    @PostMapping("/upload")
    public ResponseEntity<Map<String, String>> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            String cloudinaryUrl = fileStorageService.uploadFile(file, "general");
            return buildResponse(file, cloudinaryUrl);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/upload/resume")
    public ResponseEntity<Map<String, String>> uploadResume(@RequestParam("file") MultipartFile file) {
        try {
            String cloudinaryUrl = fileStorageService.uploadResume(file);
            return buildResponse(file, cloudinaryUrl);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/upload/profile")
    public ResponseEntity<Map<String, String>> uploadProfilePicture(@RequestParam("file") MultipartFile file) {
        try {
            String cloudinaryUrl = fileStorageService.uploadProfilePicture(file);
            return buildResponse(file, cloudinaryUrl);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    private ResponseEntity<Map<String, String>> buildResponse(MultipartFile file, String url) {
        Map<String, String> response = new HashMap<>();
        response.put("fileName", file.getOriginalFilename());
        response.put("fileDownloadUri", url); // Cloudinary URL
        response.put("fileType", file.getContentType());
        response.put("size", String.valueOf(file.getSize()));
        return ResponseEntity.ok(response);
    }
}
