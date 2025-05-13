package com.service;

import com.model.Skill;
import com.repository.SkillDAO;
import com.repository.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SkillService {
    @Autowired
    private SkillRepository skillRepository;

    private Skill toDTO(SkillDAO dao) {
        return new Skill(dao.getId(), dao.getName(), dao.getLevel(), dao.getUserId());
    }
    private SkillDAO toDAO(Skill skill) {
        return new SkillDAO(skill.getId(), skill.getName(), skill.getLevel(), skill.getUserId());
    }

    public List<Skill> getSkillsByUserId(int userId) {
        return skillRepository.findByUserId(userId).stream().map(this::toDTO).collect(Collectors.toList());
    }

    public Skill addSkill(Skill skill) {
        SkillDAO dao = skillRepository.save(toDAO(skill));
        return toDTO(dao);
    }

    public void deleteSkill(int id) {
        skillRepository.deleteById(id);
    }

    public List<Skill> updateSkills(int userId, List<Skill> skills) {
        // Supprimer les anciennes compétences
        skillRepository.findByUserId(userId).forEach(s -> skillRepository.deleteById(s.getId()));
        // Ajouter les nouvelles
        return skills.stream().map(this::addSkill).collect(Collectors.toList());
    }

    public Skill updateSkill(Skill skill) {
        SkillDAO dao = skillRepository.save(toDAO(skill));
        return toDTO(dao);
    }
} 