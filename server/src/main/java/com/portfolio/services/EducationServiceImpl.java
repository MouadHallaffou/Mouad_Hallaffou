package com.portfolio.services;

import com.portfolio.exceptions.ResourceNotFoundException;
import com.portfolio.models.Education;
import com.portfolio.repositories.EducationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EducationServiceImpl implements EducationService {

    private final EducationRepository educationRepository;

    @Override
    public Education saveEducation(Education education) {
        return educationRepository.save(education);
    }

    @Override
    public List<Education> getAllEducations() {
        return educationRepository.findAll();
    }

    @Override
    public Optional<Education> getEducationById(String id) {
        return educationRepository.findById(id);
    }

    @Override
    public Education updateEducation(String id, Education educationDetails) {
        Education education = educationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Education", "id", id));

        education.setTitle(educationDetails.getTitle());
        education.setInstitution(educationDetails.getInstitution());
        education.setDate(educationDetails.getDate());
        education.setDescription(educationDetails.getDescription());

        return educationRepository.save(education);
    }

    @Override
    public void deleteEducation(String id) {
        Education education = educationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Education", "id", id));
        educationRepository.delete(education);
    }
}
