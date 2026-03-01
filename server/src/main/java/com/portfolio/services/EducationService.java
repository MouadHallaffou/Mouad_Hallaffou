package com.portfolio.services;

import com.portfolio.models.Education;
import java.util.List;
import java.util.Optional;

public interface EducationService {
    Education saveEducation(Education education);

    List<Education> getAllEducations();

    Optional<Education> getEducationById(String id);

    Education updateEducation(String id, Education educationDetails);

    void deleteEducation(String id);
}
