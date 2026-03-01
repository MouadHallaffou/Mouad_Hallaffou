package com.portfolio.services;

import com.portfolio.models.SocialLink;
import java.util.List;
import java.util.Optional;

public interface SocialLinkService {
    SocialLink saveSocialLink(SocialLink socialLink);

    List<SocialLink> getAllSocialLinks();

    Optional<SocialLink> getSocialLinkById(String id);

    SocialLink updateSocialLink(String id, SocialLink socialLinkDetails);

    void deleteSocialLink(String id);
}
