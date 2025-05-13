package com.model;

public class Skill {
    private int id;
    private String name;
    private String level;
    private int userId; // ou String userEmail si tu préfères

    public Skill() {}

    public Skill(int id, String name, String level, int userId) {
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