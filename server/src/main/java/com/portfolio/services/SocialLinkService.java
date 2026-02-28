package com.portfolio.services;

import com.portfolio.models.SocialLink;
import com.portfolio.repositories.SocialLinkRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SocialLinkService {
    private final SocialLinkRepository socialLinkRepository;

    public List<SocialLink> getAllSocialLinks() {
        return socialLinkRepository.findAll();
    }

    public Optional<SocialLink> getSocialLinkById(String id) {
        return socialLinkRepository.findById(id);
    }

    public SocialLink saveSocialLink(SocialLink socialLink) {
        return socialLinkRepository.save(socialLink);
    }

    public void deleteSocialLink(String id) {
        socialLinkRepository.deleteById(id);
    }
}
