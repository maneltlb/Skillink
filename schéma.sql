-- Table des utilisateurs
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    motDePasse VARCHAR(255) NOT NULL,
    biographie TEXT,
    photoDeProfil VARCHAR(255),
    telephone VARCHAR(20),
    date_naissance DATE,
    is_admin BOOLEAN DEFAULT FALSE
);

-- Table des compétences
CREATE TABLE competences (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    skill_name VARCHAR(255) NOT NULL,
    skill_level VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Table de liaison utilisateur-compétence
CREATE TABLE utilisateur_competence (
    utilisateur_id INT,
    competence_id INT,
    PRIMARY KEY (utilisateur_id, competence_id),
    FOREIGN KEY (utilisateur_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (competence_id) REFERENCES competences(id) ON DELETE CASCADE
);

-- Table des cours
CREATE TABLE cours (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titre VARCHAR(200) NOT NULL,
    description TEXT,
    prix FLOAT,
    dateHeure DATETIME,
    formateur_id INT,
    FOREIGN KEY (formateur_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Table des rendez-vous
CREATE TABLE rendezvous (
    id INT AUTO_INCREMENT PRIMARY KEY,
    dateHeure DATETIME NOT NULL,
    statut VARCHAR(50),
    evaluationFormateur FLOAT,
    evaluationApprenant FLOAT,
    formateur_id INT,
    apprenant_id INT,
    FOREIGN KEY (formateur_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (apprenant_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Table des messages
CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    contenu TEXT NOT NULL,
    dateEnvoi DATETIME DEFAULT CURRENT_TIMESTAMP,
    expediteur_id INT,
    destinataire_id INT,
    FOREIGN KEY (expediteur_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (destinataire_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Table des factures
CREATE TABLE factures (
    id INT AUTO_INCREMENT PRIMARY KEY,
    montant FLOAT NOT NULL,
    dateEmission DATE DEFAULT CURRENT_DATE,
    destinataire VARCHAR(150),
    utilisateur_id INT,
    FOREIGN KEY (utilisateur_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Table des feedbacks
CREATE TABLE feedbacks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    commentaire TEXT,
    note INT CHECK (note BETWEEN 0 AND 5),
    date DATE DEFAULT CURRENT_DATE,
    utilisateur_id INT,
    cours_id INT,
    FOREIGN KEY (utilisateur_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (cours_id) REFERENCES cours(id) ON DELETE CASCADE
);