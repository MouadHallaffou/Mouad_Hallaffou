package com.portfolio.services;

import com.portfolio.models.Skill;
import java.util.List;
import java.util.Optional;

public interface SkillService {
    Skill saveSkill(Skill skill);

    List<Skill> getAllSkills();

    Optional<Skill> getSkillById(String id);

    Skill updateSkill(String id, Skill skillDetails);

    void deleteSkill(String id);
}
