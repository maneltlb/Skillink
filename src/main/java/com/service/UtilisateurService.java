package com.service;

import com.model.User;
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

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserById(int id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public User updateUser(User user) {
        return user;
    }

    @Override
    public void deleteUser(int id) {
        userRepository.deleteById(id);
    }

    @Override
    public User authentifier(String email, String motDePasse) {
        User user = userRepository.findByEmail(email);
        if ( user != null && motDePasse.equals(user.getMotDePasse())){
            return user;
        }
        else {
            System.out.println("user introuvable");
            return user;

        }

    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
