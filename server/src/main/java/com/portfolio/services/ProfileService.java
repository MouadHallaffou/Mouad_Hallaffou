package com.portfolio.services;

import com.portfolio.models.Profile;
import java.util.Optional;

public interface ProfileService {
    Profile saveProfile(Profile profile);

    Optional<Profile> getProfile();

    Profile updateProfile(String id, Profile profileDetails);

    void deleteProfile(String id);
}
