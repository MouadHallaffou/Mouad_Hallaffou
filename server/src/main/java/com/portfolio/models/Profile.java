package com.portfolio.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "profiles")
public class Profile {
    @Id
    private String id;
    private String name;
    private String title;
    private String subtitle;
    private String availability;
    private String shortBio;
    private String longBio;
    private String avatarUrl;

    private List<Stat> stats;
    private List<String> personalTraits;
    private Contact contact;
    private List<Tech> techStack;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Stat {
        private String label;
        private String value;
        private String icon;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Contact {
        private String email;
        private String phone;
        private String location;
        private List<SocialLink> socialLinks;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SocialLink {
        private String platform;
        private String url;
        private String icon;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Tech {
        private String name;
        private String icon;
        private String url; // Optional URL for the tech link
    }
}
