// Tab switching
const loginTab = document.getElementById('loginTab');
const registerTab = document.getElementById('registerTab');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

loginTab.onclick = () => {
    loginTab.classList.add('active');
    registerTab.classList.remove('active');
    loginForm.classList.add('active');
    registerForm.classList.remove('active');
};
registerTab.onclick = () => {
    registerTab.classList.add('active');
    loginTab.classList.remove('active');
    registerForm.classList.add('active');
    loginForm.classList.remove('active');
};

// Gestion du modal d'inscription
const openRegister = document.getElementById('openRegister');
const registerModal = document.getElementById('registerModal');
const closeRegister = document.getElementById('closeRegister');

if (openRegister && registerModal && closeRegister) {
    openRegister.onclick = () => {
        registerModal.style.display = 'block';
    };
    closeRegister.onclick = () => {
        registerModal.style.display = 'none';
    };
    window.onclick = (event) => {
        if (event.target === registerModal) {
            registerModal.style.display = 'none';
        }
    };
}

// Login form submit
if (loginForm) {
    loginForm.onsubmit = async (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;
        const message = document.getElementById('loginMessage');
        message.textContent = '';
        if (!email || !password) {
            message.textContent = 'Veuillez remplir tous les champs.';
            return;
        }
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email, motDePasse: password })
            });
            if (res.ok) {
                message.style.color = 'green';
                message.textContent = 'Connexion réussie !';
                // Redirection ou mise à jour UI ici
            } else {
                const text = await res.text();
                message.style.color = '#d32f2f';
                message.textContent = text || 'Identifiants invalides.';
            }
        } catch (err) {
            message.textContent = 'Erreur serveur.';
        }
    };
}

// Register form submit
if (registerForm) {
    registerForm.onsubmit = async (e) => {
        e.preventDefault();
        const nom = document.getElementById('registerNom').value.trim();
        const prenom = document.getElementById('registerPrenom').value.trim();
        const email = document.getElementById('registerEmail').value.trim();
        const password = document.getElementById('registerPassword').value;
        const message = document.getElementById('registerMessage');
        message.textContent = '';
        if (!nom || !prenom || !email || !password) {
            message.textContent = 'Veuillez remplir tous les champs.';
            return;
        }
        if (password.length < 6) {
            message.textContent = 'Le mot de passe doit contenir au moins 6 caractères.';
            return;
        }
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nom, prenom, email, motDePasse: password })
            });
            if (res.ok) {
                message.style.color = 'green';
                message.textContent = 'Inscription réussie ! Vous pouvez vous connecter.';
                setTimeout(() => {
                    registerModal.style.display = 'none';
                }, 1200);
            } else {
                const text = await res.text();
                message.style.color = '#d32f2f';
                message.textContent = text || 'Inscription échouée.';
            }
        } catch (err) {
            message.textContent = 'Erreur serveur.';
        }
    };
} 