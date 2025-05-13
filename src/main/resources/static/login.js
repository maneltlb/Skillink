// Role selection logic
const userRoleBtn = document.getElementById('userRole');
const adminRoleBtn = document.getElementById('adminRole');
const createAccountBtn = document.getElementById('createAccountBtn');
let selectedRole = 'USER';

userRoleBtn.onclick = () => {
    userRoleBtn.classList.add('active');
    adminRoleBtn.classList.remove('active');
    createAccountBtn.style.display = 'block';
    selectedRole = 'USER';
};
adminRoleBtn.onclick = () => {
    adminRoleBtn.classList.add('active');
    userRoleBtn.classList.remove('active');
    createAccountBtn.style.display = 'none';
    selectedRole = 'ADMIN';
};

// Show 'Create Account' only for User by default
if (createAccountBtn) createAccountBtn.style.display = 'block';

// Redirect to registration page
if (createAccountBtn) {
    createAccountBtn.onclick = () => {
        window.location.href = 'register.html';
    };
}

// Login form logic
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.onsubmit = async (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;
        const message = document.getElementById('loginMessage');
        message.textContent = '';
        if (!email || !password) {
            message.textContent = 'Please fill in all fields.';
            return;
        }
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email, motDePasse: password, role: selectedRole })
            });
            if (res.ok) {
                // Stocke l'email dans le localStorage
                localStorage.setItem('userEmail', email);
                // Redirige vers le dashboard
                window.location.href = 'dashboard.html';
            } else {
                const text = await res.text();
                message.textContent = text || 'Invalid credentials or role.';
            }
        } catch (err) {
            message.textContent = 'Server error.';
        }
    };
} 