package com.portfolio.services;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class FileStorageService {

    private final Cloudinary cloudinary;

    @Autowired
    public FileStorageService(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    public String storeFile(MultipartFile file) {
        try {
            // Upload to cloudinary directly
            @SuppressWarnings("unchecked")
            Map<String, Object> uploadResult = cloudinary.uploader().upload(file.getBytes(),
                    ObjectUtils.asMap(
                            "resource_type", "auto" // Automatically detect if it's an image or raw (pdf)
                    ));

            return uploadResult.get("secure_url").toString();

        } catch (IOException ex) {
            throw new RuntimeException("Could not store file to Cloudinary. Please try again!", ex);
        }
    }

    public Resource loadFileAsResource(String fileName) {
        throw new UnsupportedOperationException("Files are now hosted remotely on Cloudinary.");
    }
}
