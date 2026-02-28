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
@Document(collection = "social_links")
public class SocialLink {
    @Id
    private String id;
    private String platform;
    private String url;
    private String icon; // Icon name from a library like lucide-react
}
