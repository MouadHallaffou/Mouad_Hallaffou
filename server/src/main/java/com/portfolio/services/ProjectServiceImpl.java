package com.portfolio.services;

import com.portfolio.exceptions.ResourceNotFoundException;
import com.portfolio.models.Project;
import com.portfolio.repositories.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;

    @Override
    public Project saveProject(Project project) {
        return projectRepository.save(project);
    }

    @Override
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    @Override
    public Optional<Project> getProjectById(String id) {
        return projectRepository.findById(id);
    }

    @Override
    public Project updateProject(String id, Project projectDetails) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project", "id", id));

        project.setTitle(projectDetails.getTitle());
        project.setDescription(projectDetails.getDescription());
        if (projectDetails.getImageUrl() != null) {
            project.setImageUrl(projectDetails.getImageUrl());
        }
        project.setTechnologies(projectDetails.getTechnologies());
        project.setGithubLink(projectDetails.getGithubLink());
        project.setLiveLink(projectDetails.getLiveLink());
        project.setFeatured(projectDetails.isFeatured());

        return projectRepository.save(project);
    }

    @Override
    public void deleteProject(String id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project", "id", id));
        projectRepository.delete(project);
    }
}
