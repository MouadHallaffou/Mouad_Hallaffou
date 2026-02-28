package com.portfolio.controllers;

import com.portfolio.models.SocialLink;
import com.portfolio.services.SocialLinkService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/social-links")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class SocialLinkController {

    private final SocialLinkService socialLinkService;

    @GetMapping
    public ResponseEntity<List<SocialLink>> getAllSocialLinks() {
        return ResponseEntity.ok(socialLinkService.getAllSocialLinks());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SocialLink> getSocialLinkById(@PathVariable String id) {
        return socialLinkService.getSocialLinkById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<SocialLink> createSocialLink(@RequestBody SocialLink socialLink) {
        return ResponseEntity.ok(socialLinkService.saveSocialLink(socialLink));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SocialLink> updateSocialLink(@PathVariable String id, @RequestBody SocialLink socialLink) {
        socialLink.setId(id);
        return ResponseEntity.ok(socialLinkService.saveSocialLink(socialLink));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSocialLink(@PathVariable String id) {
        socialLinkService.deleteSocialLink(id);
        return ResponseEntity.noContent().build();
    }
}
