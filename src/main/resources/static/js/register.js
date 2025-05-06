document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
        const password = document.getElementById('motDePasse').value;
        const confirm = document.getElementById('confirmPassword').value;
        if(password !== confirm) {
            e.preventDefault();
            alert('Les mots de passe ne correspondent pas.');
        }
    });
});
