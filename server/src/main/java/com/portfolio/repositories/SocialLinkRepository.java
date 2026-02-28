package com.portfolio.repositories;

import com.portfolio.models.SocialLink;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SocialLinkRepository extends MongoRepository<SocialLink, String> {
}
