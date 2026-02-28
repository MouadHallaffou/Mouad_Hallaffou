package com.portfolio.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "profiles")
public class Profile {
    @Id
    private String id;
    private String fullName;
    private String jobTitle;
    private String bio;
    private String email;
    private String phone;
    private String resumeUrl;
    private String profilePictureUrl;
}
