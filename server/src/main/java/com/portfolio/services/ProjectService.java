package com.portfolio.services;

import com.portfolio.models.Project;
import java.util.List;
import java.util.Optional;

public interface ProjectService {
    Project saveProject(Project project);

    List<Project> getAllProjects();

    Optional<Project> getProjectById(String id);

    Project updateProject(String id, Project projectDetails);

    void deleteProject(String id);
}
