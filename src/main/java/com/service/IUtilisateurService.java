package com.service;

import com.model.User;
import java.util.List;

public interface IUtilisateurService {
    /*
    Ancien code :
    public User CreerUtilisateur (String Nom , String prenom , String email , String MotDePasse );
    */

    User saveUser(User user);
    List<User> getAllUsers();
    User getUserById(int id);
    User updateUser(User user);
    void deleteUser(int id);

    User authentifier ( String email , String motDePasse );
}
