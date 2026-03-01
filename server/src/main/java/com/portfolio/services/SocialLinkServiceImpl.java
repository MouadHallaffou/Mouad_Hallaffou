package com.portfolio.services;

import com.portfolio.exceptions.ResourceNotFoundException;
import com.portfolio.models.SocialLink;
import com.portfolio.repositories.SocialLinkRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SocialLinkServiceImpl implements SocialLinkService {

    private final SocialLinkRepository socialLinkRepository;

    @Override
    public SocialLink saveSocialLink(SocialLink socialLink) {
        return socialLinkRepository.save(socialLink);
    }

    @Override
    public List<SocialLink> getAllSocialLinks() {
        return socialLinkRepository.findAll();
    }

    @Override
    public Optional<SocialLink> getSocialLinkById(String id) {
        return socialLinkRepository.findById(id);
    }

    @Override
    public SocialLink updateSocialLink(String id, SocialLink socialLinkDetails) {
        SocialLink socialLink = socialLinkRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("SocialLink", "id", id));

        socialLink.setPlatform(socialLinkDetails.getPlatform());
        socialLink.setUrl(socialLinkDetails.getUrl());
        socialLink.setIcon(socialLinkDetails.getIcon());

        return socialLinkRepository.save(socialLink);
    }

    @Override
    public void deleteSocialLink(String id) {
        SocialLink socialLink = socialLinkRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("SocialLink", "id", id));
        socialLinkRepository.delete(socialLink);
    }
}
