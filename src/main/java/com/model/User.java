package com.model;

public class User {
    private int id;
    private String nom;
    private String prenom;
    private String email;
    private String motDePasse;
    private String biographie;
    private String photoDeProfil;
    private String telephone;
    private String dateNaissance;
    private Boolean is_admin = false;

    public User(int id, String nom, String prenom, String email, String motDePasse, String biographie, String photoDeProfil, String telephone, String dateNaissance, Boolean is_admin) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.motDePasse = motDePasse;
        this.biographie = biographie;
        this.photoDeProfil = photoDeProfil;
        this.telephone = telephone;
        this.dateNaissance = dateNaissance;
        this.is_admin = is_admin != null ? is_admin : false;
    }

    public User() {
        this.is_admin = false;
    }

    public int getId() { return id; }
    public String getNom() { return nom; }
    public String getPrenom() { return prenom; }
    public String getEmail() { return email; }
    public String getMotDePasse() { return motDePasse; }
    public String getBiographie() { return biographie; }
    public String getPhotoDeProfil() { return photoDeProfil; }
    public String getTelephone() { return telephone; }
    public String getDateNaissance() { return dateNaissance; }
    public Boolean getIs_admin() { return is_admin; }

    public void setId(int id) { this.id = id; }
    public void setNom(String nom) { this.nom = nom; }
    public void setPrenom(String prenom) { this.prenom = prenom; }
    public void setEmail(String email) { this.email = email; }
    public void setMotDePasse(String motDePasse) { this.motDePasse = motDePasse; }
    public void setBiographie(String biographie) { this.biographie = biographie; }
    public void setPhotoDeProfil(String photoDeProfil) { this.photoDeProfil = photoDeProfil; }
    public void setTelephone(String telephone) { this.telephone = telephone; }
    public void setDateNaissance(String dateNaissance) { this.dateNaissance = dateNaissance; }
    public void setIs_admin(Boolean is_admin) { this.is_admin = is_admin != null ? is_admin : false; }
}
