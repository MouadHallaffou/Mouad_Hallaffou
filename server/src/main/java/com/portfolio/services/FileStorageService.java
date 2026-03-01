package com.portfolio.services;

import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

public interface FileStorageService {
    String uploadFile(MultipartFile file, String folderName) throws IOException;

    String uploadResume(MultipartFile file) throws IOException;

    String uploadProfilePicture(MultipartFile file) throws IOException;
}
