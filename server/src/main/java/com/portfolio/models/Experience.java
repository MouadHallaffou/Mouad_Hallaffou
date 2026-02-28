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
@Document(collection = "experiences")
public class Experience {
    @Id
    private String id;
    private ExperienceType type; // ACADEMIC or PROFESSIONAL
    private String title;
    private String companyOrSchool;
    private String startDate;
    private String endDate;
    private String description;

    public enum ExperienceType {
        ACADEMIC,
        PROFESSIONAL,
        CERTIFICATION
    }
}
