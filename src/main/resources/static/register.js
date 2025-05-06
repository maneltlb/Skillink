const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.onsubmit = async (e) => {
        e.preventDefault();
        const name = document.getElementById('registerName').value.trim();
        const email = document.getElementById('registerEmail').value.trim();
        const password = document.getElementById('registerPassword').value;
        const confirm = document.getElementById('registerConfirm').value;
        const phone = document.getElementById('registerPhone').value.trim();
        const address = document.getElementById('registerAddress').value.trim();
        const prenom = document.getElementById('registerPrenom').value.trim();
        const bio = document.getElementById('registerBio').value.trim();
        const photo = document.getElementById('registerPhoto').value.trim();
        const dateNaissance = document.getElementById('registerDateNaissance').value;
        const message = document.getElementById('registerMessage');
        message.textContent = '';
        if (!name || !email || !password || !confirm) {
            message.textContent = 'Please fill in all required fields.';
            return;
        }
        if (password.length < 6) {
            message.textContent = 'Password must be at least 6 characters.';
            return;
        }
        if (password !== confirm) {
            message.textContent = 'Passwords do not match.';
            return;
        }
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nom: name,
                    prenom: prenom,
                    email: email,
                    motDePasse: password,
                    biographie: bio,
                    photoDeProfil: photo,
                    dateNaissance: dateNaissance
                })
            });
            if (res.ok) {
                message.style.color = 'green';
                message.textContent = 'Registration successful! Redirecting to login...';
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 1500);
            } else {
                const text = await res.text();
                message.style.color = '#d32f2f';
                message.textContent = text || 'Registration failed.';
            }
        } catch (err) {
            message.textContent = 'Server error.';
        }
    };
} 