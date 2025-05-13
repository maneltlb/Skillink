const registerForm = document.getElementById('registerForm');
if (registerForm) {
    // Fonction pour redimensionner l'image
    const resizeImage = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    let width = img.width;
                    let height = img.height;
                    
                    // Calculer les nouvelles dimensions (max 800px)
                    const maxSize = 800;
                    if (width > height && width > maxSize) {
                        height = Math.round((height * maxSize) / width);
                        width = maxSize;
                    } else if (height > maxSize) {
                        width = Math.round((width * maxSize) / height);
                        height = maxSize;
                    }
                    
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    
                    // Convertir en base64 avec une qualité réduite
                    resolve(canvas.toDataURL('image/jpeg', 0.7));
                };
                img.onerror = reject;
                img.src = e.target.result;
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    registerForm.onsubmit = async (e) => {
        e.preventDefault();
        const message = document.getElementById('registerMessage');
        message.textContent = '';
        message.style.color = '';

        // Get form values
        const name = document.getElementById('registerName').value.trim();
        const email = document.getElementById('registerEmail').value.trim();
        const password = document.getElementById('registerPassword').value;
        const confirm = document.getElementById('registerConfirm').value;
        const prenom = document.getElementById('registerPrenom').value.trim();
        const bio = document.getElementById('registerBio').value.trim();
        const phone = document.getElementById('registerPhone').value.trim();
        const photoFile = document.getElementById('registerPhoto').files[0];
        const dateNaissance = document.getElementById('registerDateNaissance').value;

        // Validate required fields
        if (!name || !email || !password || !confirm || !prenom) {
            message.style.color = '#d32f2f';
            message.textContent = 'Please fill in all required fields.';
            return;
        }

        // Validate password
        if (password.length < 6) {
            message.style.color = '#d32f2f';
            message.textContent = 'Password must be at least 6 characters.';
            return;
        }

        if (password !== confirm) {
            message.style.color = '#d32f2f';
            message.textContent = 'Passwords do not match.';
            return;
        }

        // Handle photo upload
        if (photoFile) {
            try {
                // Check file size (max 5MB)
                if (photoFile.size > 5 * 1024 * 1024) {
                    message.style.color = '#d32f2f';
                    message.textContent = 'Photo size must be less than 5MB.';
                    return;
                }

                // Check file type
                if (!photoFile.type.startsWith('image/')) {
                    message.style.color = '#d32f2f';
                    message.textContent = 'Please upload an image file.';
                    return;
                }
            } catch (error) {
                message.style.color = '#d32f2f';
                message.textContent = 'Error processing photo file.';
                return;
            }
        }

        try {
            // Create FormData object
            const formData = new FormData();
            formData.append('nom', name);
            formData.append('prenom', prenom);
            formData.append('email', email);
            formData.append('motDePasse', password);
            formData.append('biographie', bio);
            formData.append('telephone', phone);
            formData.append('dateNaissance', dateNaissance);
            if (photoFile) {
                formData.append('photo', photoFile);
            }

            const res = await fetch('/api/auth/register', {
                method: 'POST',
                body: formData
            });

            const responseText = await res.text();
            
            if (res.ok) {
                message.style.color = 'green';
                message.textContent = 'Registration successful! Redirecting to login...';
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 1500);
            } else {
                message.style.color = '#d32f2f';
                message.textContent = responseText || 'Registration failed.';
            }
        } catch (err) {
            message.style.color = '#d32f2f';
            message.textContent = 'Server error. Please try again later.';
            console.error('Registration error:', err);
        }
    };
} 