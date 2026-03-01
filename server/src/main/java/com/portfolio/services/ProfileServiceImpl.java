package com.portfolio.services;

import com.portfolio.exceptions.ResourceNotFoundException;
import com.portfolio.models.Profile;
import com.portfolio.repositories.ProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService {

    private final ProfileRepository profileRepository;

    @Override
    public Profile saveProfile(Profile profile) {
        return profileRepository.save(profile);
    }

    @Override
    public Optional<Profile> getProfile() {
        return profileRepository.findAll().stream().findFirst();
    }

    @Override
    public Profile updateProfile(String id, Profile profileDetails) {
        Profile profile = profileRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Profile", "id", id));

        profile.setName(profileDetails.getName());
        profile.setTitle(profileDetails.getTitle());
        profile.setSubtitle(profileDetails.getSubtitle());
        profile.setAvailability(profileDetails.getAvailability());
        profile.setShortBio(profileDetails.getShortBio());
        profile.setLongBio(profileDetails.getLongBio());
        if (profileDetails.getAvatarUrl() != null) {
            profile.setAvatarUrl(profileDetails.getAvatarUrl());
        }
        profile.setStats(profileDetails.getStats());
        profile.setPersonalTraits(profileDetails.getPersonalTraits());
        profile.setContact(profileDetails.getContact());
        profile.setTechStack(profileDetails.getTechStack());

        return profileRepository.save(profile);
    }

    @Override
    public void deleteProfile(String id) {
        Profile profile = profileRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Profile", "id", id));
        profileRepository.delete(profile);
    }
}
