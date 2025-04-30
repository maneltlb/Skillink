package com.controller;

import com.model.User;
import com.repository.UserRepository;
import com.service.UtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class UtilisateurController implements IUtilisateurController {

    @Autowired
    private UtilisateurService utilisateurService;

    @Override
    public User authentifier(String email, String motDePasse) {
        return utilisateurService.authentifier(email, motDePasse);
    }



}
