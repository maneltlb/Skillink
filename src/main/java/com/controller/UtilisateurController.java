package com.controller;

import com.model.User;
import com.repository.UserDAO;
import com.service.UtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
public class UtilisateurController implements IUtilisateurController {

    @Autowired
    private UtilisateurService utilisateurService;
    
    private static final String UPLOAD_DIR = "uploads/profile_photos/";

    @Override
    public User authentifier(String email, String motDePasse) {
        return utilisateurService.authentifier(email, motDePasse);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestParam("nom") String nom,
            @RequestParam("prenom") String prenom,
            @RequestParam("email") String email,
            @RequestParam("motDePasse") String motDePasse,
            @RequestParam(value = "biographie", required = false) String biographie,
            @RequestParam(value = "telephone", required = false) String telephone,
            @RequestParam(value = "dateNaissance", required = false) String dateNaissance,
            @RequestParam(value = "photo", required = false) MultipartFile photo) {
        
        try {
            if (utilisateurService.findByEmail(email) != null) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already exists");
            }

            User user = new User();
            user.setNom(nom);
            user.setPrenom(prenom);
            user.setEmail(email);
            user.setMotDePasse(motDePasse);
            user.setBiographie(biographie);
            user.setTelephone(telephone);
            user.setDateNaissance(dateNaissance);
            user.setIs_admin(false);

            // Handle photo upload
            if (photo != null && !photo.isEmpty()) {
                // Create upload directory if it doesn't exist
                File uploadDir = new File(UPLOAD_DIR);
                if (!uploadDir.exists()) {
                    uploadDir.mkdirs();
                }

                // Generate unique filename
                String originalFilename = photo.getOriginalFilename();
                String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
                String filename = UUID.randomUUID().toString() + extension;
                
                // Save file
                Path filePath = Paths.get(UPLOAD_DIR + filename);
                Files.copy(photo.getInputStream(), filePath);
                
                // Set photo path in user object
                user.setPhotoDeProfil("/uploads/profile_photos/" + filename);
            }

            // Save user
            User savedUser = utilisateurService.saveUser(user);
            if (savedUser != null) {
                return ResponseEntity.ok("User registered successfully");
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to save user");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Registration failed: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        User user = utilisateurService.findByEmail(loginRequest.getEmail());
        if (user != null && loginRequest.getMotDePasse().equals(user.getMotDePasse())) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }

    @GetMapping("/user/me")
    public ResponseEntity<?> getUserByEmail(@RequestParam String email) {
        User user = utilisateurService.findByEmail(email);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }

    @PutMapping("/user/me")
    public ResponseEntity<?> updateUser(@RequestBody User user) {
        User updated = utilisateurService.updateUser(user);
        if (updated != null) {
            return ResponseEntity.ok("Profil mis à jour avec succès.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Utilisateur non trouvé");
        }
    }
}
