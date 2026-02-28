package com.portfolio.services;

import com.portfolio.models.Profile;
import com.portfolio.repositories.ProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProfileService {
    private final ProfileRepository profileRepository;

    public Profile getProfile() {
        List<Profile> profiles = profileRepository.findAll();
        if (profiles.isEmpty()) {
            return new Profile(); // Return empty if not found
        }
        return profiles.get(0); // Assuming only one profile exists
    }

    public Profile saveOrUpdateProfile(Profile profile) {
        List<Profile> profiles = profileRepository.findAll();
        if (!profiles.isEmpty()) {
            Profile existingProfile = profiles.get(0);
            profile.setId(existingProfile.getId()); // Update existing
        }
        return profileRepository.save(profile);
    }
}
