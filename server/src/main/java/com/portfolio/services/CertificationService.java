package com.portfolio.services;

import com.portfolio.models.Certification;
import java.util.List;
import java.util.Optional;

public interface CertificationService {
    Certification saveCertification(Certification certification);

    List<Certification> getAllCertifications();

    Optional<Certification> getCertificationById(String id);

    Certification updateCertification(String id, Certification certificationDetails);

    void deleteCertification(String id);
}
