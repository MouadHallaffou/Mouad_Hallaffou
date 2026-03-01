package com.portfolio.services;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class FileStorageServiceImpl implements FileStorageService {

    private final Cloudinary cloudinary;

    @Autowired
    public FileStorageServiceImpl(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    @Override
    public String uploadFile(MultipartFile file, String folderName) throws IOException {
        @SuppressWarnings("unchecked")
        Map<String, Object> uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap(
                "folder", folderName,
                "resource_type", "auto"));
        return uploadResult.get("secure_url").toString();
    }

    @Override
    public String uploadResume(MultipartFile file) throws IOException {
        return uploadFile(file, "resumes");
    }

    @Override
    public String uploadProfilePicture(MultipartFile file) throws IOException {
        return uploadFile(file, "profiles");
    }
}
