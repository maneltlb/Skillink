const userEmail = localStorage.getItem('userEmail');
if (!userEmail) {
    window.location.href = 'login.html';
}

// Function to create a skill element
function createSkillElement(skill) {
    const skillSpan = document.createElement('span');
    skillSpan.textContent = skill.name;
    skillSpan.title = `Niveau: ${skill.level}`;
    return skillSpan;
}

// Function to load user data and skills
async function loadUserData() {
    try {
        // Fetch user data
        const userRes = await fetch(`/api/auth/user/me?email=${encodeURIComponent(userEmail)}`);
        if (!userRes.ok) {
            console.error('Failed to fetch user:', userRes.status);
            return;
        }
        const user = await userRes.json();
        console.log('Fetched user:', user);
        console.log('Profile photo data:', user.photoDeProfil ? user.photoDeProfil.substring(0, 50) + '...' : 'No photo');
        if (!user.id) {
            console.error('User object does not have a valid id:', user);
            return;
        }

        // Update user information
        document.getElementById('dashboardUserName').textContent = `${user.nom} ${user.prenom}`;
        document.getElementById('dashboardName').textContent = `${user.nom} ${user.prenom}`;
        
        // Update header avatar
        const headerAvatar = document.getElementById('dashboardHeaderAvatar');
        if (user.photoDeProfil && user.photoDeProfil.trim() !== "") {
            headerAvatar.innerHTML = `<img src="${user.photoDeProfil}" alt="Photo de profil" style="width:100%;height:100%;object-fit:cover;border-radius:50%;display:block;">`;
        } else {
            const initials = (user.nom ? user.nom[0] : '') + (user.prenom ? user.prenom[0] : '');
            headerAvatar.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:1.2rem;color:#666;">${initials || '👤'}</div>`;
        }
        
        document.getElementById('dashboardJoin').textContent = 'Membre depuis ' + (user.dateNaissance ? new Date(user.dateNaissance).getFullYear() : '2023');

        // Update profile avatar (left circle)
        const avatarDiv = document.getElementById('dashboardAvatar');
        if (user.photoDeProfil && user.photoDeProfil.trim() !== "") {
            avatarDiv.innerHTML = `<img src="${user.photoDeProfil}" alt="Photo de profil" style="width:100%;height:100%;object-fit:cover;border-radius:50%;display:block;">`;
        } else {
            // Use the user's initials as a fallback
            const initials = (user.nom ? user.nom[0] : '') + (user.prenom ? user.prenom[0] : '');
            avatarDiv.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:2rem;color:#666;">${initials || '👤'}</div>`;
        }

        // Fetch user's skills
        const skillsRes = await fetch(`/api/skills?userId=${user.id}`);
        if (!skillsRes.ok) {
            console.error('Failed to fetch skills:', skillsRes.status);
            return;
        }
        const skills = await skillsRes.json();
        console.log('Fetched skills:', skills);

        // Display skills
        const offeredSkillsContainer = document.getElementById('offeredSkills');
        offeredSkillsContainer.innerHTML = ''; // Clear existing content

        if (!Array.isArray(skills) || skills.length === 0) {
            const noSkills = document.createElement('span');
            noSkills.textContent = 'Aucune compétence ajoutée';
            noSkills.style.color = '#888';
            offeredSkillsContainer.appendChild(noSkills);
        } else {
            skills.forEach(skill => {
                offeredSkillsContainer.appendChild(createSkillElement(skill));
            });
        }

        // For now, we'll leave the "Skills to learn" section empty
        // This can be implemented later when that feature is added
        const wantedSkillsContainer = document.getElementById('wantedSkills');
        wantedSkillsContainer.innerHTML = '<span style="color: #888;">Fonctionnalité à venir</span>';

    } catch (error) {
        console.error('Error loading user data:', error);
    }
}

// Load data when the page loads
document.addEventListener('DOMContentLoaded', loadUserData); 