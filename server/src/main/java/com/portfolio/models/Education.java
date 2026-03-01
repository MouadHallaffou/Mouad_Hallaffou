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
@Document(collection = "education")
public class Education {
    @Id
    private String id;
    private String title;
    private String institution;
    private String date; // E.g., "2024 - present"
    private String description;
}
