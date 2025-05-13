package com.controller;

import com.model.Skill;
import com.service.SkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/skills")
public class SkillController {
    @Autowired
    private SkillService skillService;

    @GetMapping
    public List<Skill> getSkills(@RequestParam int userId) {
        return skillService.getSkillsByUserId(userId);
    }

    @PostMapping
    public Skill addSkill(@RequestBody Skill skill) {
        return skillService.addSkill(skill);
    }

    @DeleteMapping("/{id}")
    public void deleteSkill(@PathVariable int id) {
        skillService.deleteSkill(id);
    }

    @PutMapping
    public List<Skill> updateSkills(@RequestParam int userId, @RequestBody List<Skill> skills) {
        return skillService.updateSkills(userId, skills);
    }

    @PutMapping("/{id}")
    public Skill updateSkill(@PathVariable int id, @RequestBody Skill skill) {
        skill.setId(id);
        return skillService.updateSkill(skill);
    }
} 