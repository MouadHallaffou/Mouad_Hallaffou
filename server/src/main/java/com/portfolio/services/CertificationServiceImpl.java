package com.portfolio.services;

import com.portfolio.exceptions.ResourceNotFoundException;
import com.portfolio.models.Certification;
import com.portfolio.repositories.CertificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CertificationServiceImpl implements CertificationService {

    private final CertificationRepository certificationRepository;

    @Override
    public Certification saveCertification(Certification certification) {
        return certificationRepository.save(certification);
    }

    @Override
    public List<Certification> getAllCertifications() {
        return certificationRepository.findAll();
    }

    @Override
    public Optional<Certification> getCertificationById(String id) {
        return certificationRepository.findById(id);
    }

    @Override
    public Certification updateCertification(String id, Certification certificationDetails) {
        Certification certification = certificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Certification", "id", id));

        certification.setTitle(certificationDetails.getTitle());
        certification.setIssuer(certificationDetails.getIssuer());
        certification.setYear(certificationDetails.getYear());
        certification.setDescription(certificationDetails.getDescription());

        return certificationRepository.save(certification);
    }

    @Override
    public void deleteCertification(String id) {
        Certification certification = certificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Certification", "id", id));
        certificationRepository.delete(certification);
    }
}
