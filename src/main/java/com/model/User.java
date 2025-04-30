package com.model;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
/*  private  String nom;
    private  String prenom;
    private  String email;
    private  String MotDePasse; */
    @Column(nullable = false)
    private String nom;
    
    @Column(nullable = false)
    private String prenom;
    
    @Column(nullable = false, unique = true)
    private String email;
    
    @Column(name = "mot_de_passe", nullable = false)
    private String motDePasse;
    
    @Column
    private String biographie;
    
    @Column(name = "photo_de_profil")
    private String photoDeProfil;

    public User(int id, String nom, String prenom, String email, String motDePasse, String biographie, String photoDeProfil) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.motDePasse = motDePasse;
        this.biographie = biographie;
        this.photoDeProfil = photoDeProfil;
    }
    public User (){
    }

    public int getId() {
        return id;
    }

    public String getNom() {
        return nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public String getEmail() {
        return email;
    }

    public String getMotDePasse() {
        return motDePasse;
    }

    public String getBiographie() {
        return biographie;
    }

    public String getPhotoDeProfil() {
        return photoDeProfil;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setMotDePasse(String motDePasse) {
        motDePasse = motDePasse;
    }

    public void setBiographie(String biographie) {
        biographie = biographie;
    }

    public void setPhotoDeProfil(String photoDeProfil) {
        photoDeProfil = photoDeProfil;
    }
}
