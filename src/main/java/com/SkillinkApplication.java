package com;

import com.model.User;
import com.service.UtilisateurService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.ComponentScan;


@SpringBootApplication
@ComponentScan(basePackages = {"com"})


public class SkillinkApplication {

	public static void main(String[] args) {

		// Démarrer l'application Spring Boot
		ApplicationContext context = SpringApplication.run(SkillinkApplication.class, args);
		/*SpringApplication.run(SkillinkApplication.class, args);
        /* //UtilisateurService utilisateurService = new UtilisateurService();
        User user = utilisateurService.CreerUtilisateur("TALBI","Manal","talbimanal28@gmail.com","1234");
        System.out.println(user.getNom());
        System.out.println(user.getPrenom());
        System.out.println(user.getEmail());
        System.out.println(user.getMotDePasse());
		// Récupérer le service depuis le contexte Spring
		UtilisateurService utilisateurService = context.getBean(UtilisateurService.class);
		// Créer un nouvel utilisateur
		User user = new User();
		user.setNom("TALBI");
		user.setPrenom("Manal");
		user.setEmail("talbimanal28@gmail.com");
		user.setMotDePasse("1234");
		user.setBiographie("Ma biographie");
		user.setPhotoDeProfil("chemin/vers/photo.jpg");
		
		// Sauvegarder l'utilisateur dans la base de données
		User savedUser = utilisateurService.saveUser(user);
		
		// Afficher les informations de l'utilisateur sauvegardé
		System.out.println("Utilisateur créé avec l'ID : " + savedUser.getId());
		System.out.println("Nom : " + savedUser.getNom());
		System.out.println("Prénom : " + savedUser.getPrenom());
		System.out.println("Email : " + savedUser.getEmail());
		
		// Récupérer tous les utilisateurs de la base de données
		System.out.println("\nListe de tous les utilisateurs :");
		utilisateurService.getAllUsers().forEach(u -> 
			System.out.println(u.getNom() + " " + u.getPrenom())
		);*/
	}

}
