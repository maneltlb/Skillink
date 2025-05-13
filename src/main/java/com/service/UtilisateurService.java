package com.service;

import com.model.User;
import com.repository.UserDAO;
import com.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UtilisateurService implements IUtilisateurService {

    @Autowired
    private UserRepository userRepository;

    /*
    Ancien code :
    public User CreerUtilisateur(String nom, String prenom, String email, String MotDePasse) {
        User user = new User();
        user.setNom(nom);
        user.setPrenom(prenom);
        user.setEmail(email);
        user.setMotDePasse(MotDePasse);
        return user;
    }
    public UtilisateurService (){}
    */

    private UserDAO toDAO(User user) {
        return new UserDAO(
            user.getId(),
            user.getNom(),
            user.getPrenom(),
            user.getEmail(),
            user.getMotDePasse(),
            user.getBiographie(),
            user.getPhotoDeProfil(),
            user.getTelephone(),
            user.getDateNaissance(),
            user.getIs_admin()
        );
    }

    private User toDTO(UserDAO dao) {
        if (dao == null) return null;
        User user = new User();
        user.setId(dao.getId());
        user.setNom(dao.getNom());
        user.setPrenom(dao.getPrenom());
        user.setEmail(dao.getEmail());
        user.setMotDePasse(dao.getMotDePasse());
        user.setBiographie(dao.getBiographie());
        user.setPhotoDeProfil(dao.getPhotoDeProfil());
        user.setTelephone(dao.getTelephone());
        user.setDateNaissance(dao.getDateNaissance());
        user.setIs_admin(dao.getIs_admin());
        return user;
    }

    @Override
    public User saveUser(User user) {
        UserDAO userdao = toDAO(user);
        userRepository.save(userdao);
        return toDTO(userdao);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll().stream().map(this::toDTO).toList();
    }

    @Override
    public User getUserById(int id) {
        return toDTO(userRepository.findById(id).orElse(null));
    }

    @Override
    public User updateUser(User user) {
        // First check if user exists
        UserDAO existingUser = userRepository.findById(user.getId()).orElse(null);
        if (existingUser == null) {
            return null;
        }
        
        // Create new DAO with updated fields
        UserDAO userdao = toDAO(user);
        
        // Preserve the password if not provided in the update
        if (user.getMotDePasse() == null || user.getMotDePasse().isEmpty()) {
            userdao.setMotDePasse(existingUser.getMotDePasse());
        }
        
        // Save the updated user
        userRepository.save(userdao);
        return toDTO(userdao);
    }

    @Override
    public void deleteUser(int id) {
        userRepository.deleteById(id);
    }

    @Override
    public User authentifier(String email, String motDePasse) {
        UserDAO user = userRepository.findByEmail(email);
        if (user != null && motDePasse.equals(user.getMotDePasse())) {
            return toDTO(user);
        } else {
            System.out.println("user introuvable");
            return null;
        }
    }

    public User findByEmail(String email) {
        return toDTO(userRepository.findByEmail(email));
    }
}
