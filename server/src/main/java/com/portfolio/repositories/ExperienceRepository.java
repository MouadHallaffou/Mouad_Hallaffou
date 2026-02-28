package com.portfolio.repositories;

import com.portfolio.models.Experience;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ExperienceRepository extends MongoRepository<Experience, String> {
    List<Experience> findByType(Experience.ExperienceType type);
}
