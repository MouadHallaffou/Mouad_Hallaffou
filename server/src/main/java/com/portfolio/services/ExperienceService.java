package com.portfolio.services;

import com.portfolio.models.Experience;
import com.portfolio.repositories.ExperienceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ExperienceService {
    private final ExperienceRepository experienceRepository;

    public List<Experience> getAllExperiences() {
        return experienceRepository.findAll();
    }

    public List<Experience> getExperiencesByType(Experience.ExperienceType type) {
        return experienceRepository.findByType(type);
    }

    public Optional<Experience> getExperienceById(String id) {
        return experienceRepository.findById(id);
    }

    public Experience saveExperience(Experience experience) {
        return experienceRepository.save(experience);
    }

    public void deleteExperience(String id) {
        experienceRepository.deleteById(id);
    }
}
