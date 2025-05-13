const userEmail = localStorage.getItem('userEmail');
if (!userEmail) {
    window.location.href = 'login.html';
}

const form = document.getElementById('editProfileForm');
const fullName = document.getElementById('fullName');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const bio = document.getElementById('bio');
const formError = document.getElementById('formError');

// Skills
let skills = [];
const skillsTableBody = document.getElementById('skillsTableBody');
const newSkillName = document.getElementById('newSkillName');
const newSkillLevel = document.getElementById('newSkillLevel');
const addSkillBtn = document.getElementById('addSkillBtn');

const profilePhoto = document.getElementById('profilePhoto');
const profilePhotoPreview = document.getElementById('profilePhotoPreview');
let profilePhotoBase64 = '';

let userId = null;

// Load user info and skills
fetch(`/api/auth/user/me?email=${encodeURIComponent(userEmail)}`)
    .then(res => res.ok ? res.json() : null)
    .then(user => {
        if (!user) return;
        userId = user.id;
        fullName.value = user.nom + ' ' + user.prenom;
        email.value = user.email;
        phone.value = user.telephone || '';
        bio.value = user.biographie || '';
        if (user.photoDeProfil) {
            profilePhotoPreview.src = user.photoDeProfil;
            profilePhotoBase64 = user.photoDeProfil;
        } else {
            profilePhotoPreview.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.nom + ' ' + user.prenom);
        }
        // Charger les skills depuis l'API
        fetch(`/api/skills?userId=${user.id}`)
            .then(res => res.ok ? res.json() : [])
            .then(apiSkills => {
                skills = apiSkills;
                renderSkills();
            });
    });

function renderSkills() {
    skillsTableBody.innerHTML = '';
    skills.forEach((skill, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><input type="text" value="${skill.name}" data-idx="${idx}" class="skill-name-input" style="border:none;background:transparent;width:90%"></td>
            <td>
                <select data-idx="${idx}" class="skill-level-select">
                    <option value="Beginner" ${skill.level==='Beginner'?'selected':''}>Beginner</option>
                    <option value="Intermediate" ${skill.level==='Intermediate'?'selected':''}>Intermediate</option>
                    <option value="Advanced" ${skill.level==='Advanced'?'selected':''}>Advanced</option>
                </select>
            </td>
            <td class="actions">
                <a class="edit" onclick="editSkill(${idx})">Edit</a>
                <a class="remove" onclick="removeSkill(${idx})">Remove</a>
            </td>
        `;
        skillsTableBody.appendChild(tr);
    });
    // Inline editing
    document.querySelectorAll('.skill-name-input').forEach(input => {
        input.addEventListener('change', async e => {
            const idx = e.target.dataset.idx;
            const skill = skills[idx];
            skill.name = e.target.value;
            // Update immédiat en base
            await fetch(`/api/skills/${skill.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(skill)
            });
        });
    });
    document.querySelectorAll('.skill-level-select').forEach(select => {
        select.addEventListener('change', async e => {
            const idx = e.target.dataset.idx;
            const skill = skills[idx];
            skill.level = e.target.value;
            // Update immédiat en base
            await fetch(`/api/skills/${skill.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(skill)
            });
        });
    });
}

addSkillBtn.onclick = async () => {
    const name = newSkillName.value.trim();
    const level = newSkillLevel.value;
    if (!name || !userId) return;

    addSkillBtn.disabled = true;
    formError.textContent = '';

    try {
        const res = await fetch('/api/skills', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, level, userId })
        });
        addSkillBtn.disabled = false;
        if (res.ok) {
            const skill = await res.json();
            skills.push(skill); // Ajoute à l'array locale
            newSkillName.value = '';
            newSkillLevel.value = 'Beginner';
            renderSkills(); // Met à jour le tableau immédiatement
            formError.textContent = '';
        } else {
            const errorText = await res.text();
            formError.textContent = "Erreur lors de l'ajout : " + errorText;
            console.error("Erreur API skills:", errorText);
        }
    } catch (err) {
        addSkillBtn.disabled = false;
        formError.textContent = "Erreur réseau lors de l'ajout de la compétence.";
        console.error(err);
    }
};

window.removeSkill = async function(idx) {
    const skill = skills[idx];
    if (!skill.id) return;
    // Suppression immédiate en base
    const res = await fetch(`/api/skills/${skill.id}`, { method: 'DELETE' });
    if (res.ok) {
        skills.splice(idx, 1);
        renderSkills();
    }
};

window.editSkill = function(idx) {
    // Focus the skill name input for inline editing
    const input = document.querySelector(`.skill-name-input[data-idx='${idx}']`);
    if (input) input.focus();
};

// Prévisualisation de la nouvelle photo
profilePhoto.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    // Vérifier le type de fichier
    if (!file.type.startsWith('image/')) {
        formError.textContent = 'Veuillez sélectionner une image valide.';
        return;
    }
    
    // Vérifier la taille du fichier (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
        formError.textContent = 'L\'image ne doit pas dépasser 5MB.';
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(evt) {
        profilePhotoPreview.src = evt.target.result;
        profilePhotoBase64 = evt.target.result; // Le résultat est déjà en base64 avec le préfixe data:image/...
    };
    reader.readAsDataURL(file);
});

form.onsubmit = async (e) => {
    e.preventDefault();
    formError.textContent = '';
    if (!fullName.value.trim() || !email.value.trim() || !phone.value.trim()) {
        formError.textContent = 'Veuillez remplir tous les champs obligatoires.';
        return;
    }
    const [nom, ...prenomArr] = fullName.value.trim().split(' ');
    const prenom = prenomArr.join(' ');
    const payload = {
        id: userId,
        nom,
        prenom,
        email: email.value.trim(),
        telephone: phone.value.trim(),
        biographie: bio.value.trim(),
        photoDeProfil: profilePhotoBase64
    };
    const res = await fetch('/api/auth/user/me', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    if (res.ok) {
        formError.style.color = 'green';
        formError.textContent = 'Profil mis à jour avec succès !';
        setTimeout(() => window.location.href = 'dashboard.html', 1200);
    } else {
        formError.style.color = '#d32f2f';
        formError.textContent = 'Échec de la mise à jour du profil.';
    }
}; 