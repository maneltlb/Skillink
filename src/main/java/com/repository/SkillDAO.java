package com.repository;

import jakarta.persistence.*;

@Entity
@Table(name = "competences")
public class SkillDAO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "skill_name", nullable = false)
    private String name;

    @Column(name = "skill_level", nullable = false)
    private String level;

    @Column(name = "user_id", nullable = false)
    private int userId;

    public SkillDAO() {}

    public SkillDAO(int id, String name, String level, int userId) {
        this.id = id;
        this.name = name;
        this.level = level;
        this.userId = userId;
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getLevel() { return level; }
    public void setLevel(String level) { this.level = level; }
    public int getUserId() { return userId; }
    public void setUserId(int userId) { this.userId = userId; }
} 