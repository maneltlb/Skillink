package com.controller;

import com.model.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping(path = "/api")
public interface IUtilisateurController {
    @GetMapping("/authentifier/email/{email}/motDePasse/{motDePasse}")
    User authentifier (@PathVariable("email") String email , @PathVariable("motDePasse") String motDePasse);
}
