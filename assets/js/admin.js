/**
 * Admin Panel JavaScript for Portfolio Management
 * This allows updating of portfolio content without a database using localStorage
 */

document.addEventListener('DOMContentLoaded', () => {
    // Admin credentials (in a real app, this would be handled server-side)
    const ADMIN_PASSWORD = 'admin123'; // Change this to your preferred password
    
    // DOM Elements
    const loginSection = document.getElementById('login-section');
    const adminPanel = document.getElementById('admin-panel');
    const loginForm = document.getElementById('login-form');
    const logoutBtn = document.getElementById('logout-btn');
    const saveAllBtn = document.getElementById('save-all');
    
    // Tab Navigation
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Add Experience, Skill, Project buttons
    const addExperienceBtn = document.getElementById('add-experience');
    const addTechnicalSkillBtn = document.getElementById('add-technical-skill');
    const addSoftSkillBtn = document.getElementById('add-soft-skill');
    const addProjectBtn = document.getElementById('add-project');
    
    // Form containers
    const experienceList = document.getElementById('experience-list');
    const technicalSkillsList = document.getElementById('technical-skills-list');
    const softSkillsList = document.getElementById('soft-skills-list');
    const projectsList = document.getElementById('projects-list');
    
    // Check if already logged in
    function checkLoginStatus() {
        const isLoggedIn = sessionStorage.getItem('portfolio_admin_logged_in');
        if (isLoggedIn === 'true') {
            showAdminPanel();
        }
    }
    
    // Login form handler
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const password = document.getElementById('password').value;
            
            if (password === ADMIN_PASSWORD) {
                sessionStorage.setItem('portfolio_admin_logged_in', 'true');
                showAdminPanel();
            } else {
                alert('Incorrect password. Please try again.');
            }
        });
    }
    
    // Logout handler
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            sessionStorage.removeItem('portfolio_admin_logged_in');
            hideAdminPanel();
        });
    }
    
    // Show/Hide admin panel
    function showAdminPanel() {
        loginSection.classList.add('hidden');
        adminPanel.classList.remove('hidden');
        loadAllData();
    }
    
    function hideAdminPanel() {
        adminPanel.classList.add('hidden');
        loginSection.classList.remove('hidden');
    }
    
    // Tab navigation
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding tab
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // --- DATA MANAGEMENT FUNCTIONS ---
    
    // Load all data from localStorage
    function loadAllData() {
        loadPersonalInfo();
        loadExperience();
        loadSkills();
        loadProjects();
        loadContactInfo();
    }
    
    // Personal Info Tab
    function loadPersonalInfo() {
        const personalInfo = JSON.parse(localStorage.getItem('portfolio_personal_info')) || {};
        
        document.getElementById('fullName').value = personalInfo.fullName || 'Yoayoe Anifa';
        document.getElementById('title').value = personalInfo.title || 'Frontend Developer & UI/UX Designer';
        document.getElementById('tagline').value = personalInfo.tagline || 'Crafting beautiful digital experiences with clean code and innovative design';
        document.getElementById('about').value = personalInfo.about || 'I am a passionate Frontend Developer and UI/UX Designer with over 5 years of experience creating responsive, user-friendly web applications. With a background in computer science and a keen eye for design, I bridge the gap between functionality and aesthetics to deliver exceptional digital experiences. I believe in clean, maintainable code and intuitive interfaces that solve real user problems.';
        
        // Add event listener for personal info form
        const personalInfoForm = document.querySelector('#personal-info .admin-form');
        if (personalInfoForm) {
            personalInfoForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const personalInfo = {
                    fullName: document.getElementById('fullName').value,
                    title: document.getElementById('title').value,
                    tagline: document.getElementById('tagline').value,
                    about: document.getElementById('about').value
                };
                
                localStorage.setItem('portfolio_personal_info', JSON.stringify(personalInfo));
                alert('Personal information saved! Returning to main page...');
                window.location.href = 'index.html';
            });
        }
    }
    
    // Experience Tab
    function loadExperience() {
        const experiences = JSON.parse(localStorage.getItem('portfolio_experiences')) || [
            {
                startYear: '2023',
                endYear: 'Present',
                jobTitle: 'Senior Frontend Developer',
                company: 'TechInnovate Solutions',
                description: 'Lead frontend development for enterprise clients, architect scalable solutions, mentor junior developers, and implement modern JavaScript frameworks (React, Vue) to deliver high-performance web applications.'
            },
            {
                startYear: '2020',
                endYear: '2023',
                jobTitle: 'UI/UX Developer',
                company: 'Digital Craft Studio',
                description: 'Designed and built responsive interfaces for various client projects, collaborated with UX researchers to implement user-centered design principles, and increased conversion rates by 30% through optimized user journeys.'
            }
        ];
        
        // Clear existing items
        experienceList.innerHTML = '';
        
        // Add each experience
        experiences.forEach((exp, index) => {
            const experienceItem = createExperienceItem(exp, index);
            experienceList.appendChild(experienceItem);
        });
        
        // Add event listener for Add Experience button
        if (addExperienceBtn) {
            addExperienceBtn.addEventListener('click', function() {
                const newExperience = {
                    startYear: '',
                    endYear: '',
                    jobTitle: '',
                    company: '',
                    description: ''
                };
                
                const experienceItem = createExperienceItem(newExperience, experiences.length);
                experienceList.appendChild(experienceItem);
                
                // Update local storage with the new item
                experiences.push(newExperience);
                localStorage.setItem('portfolio_experiences', JSON.stringify(experiences));
            });
        }
    }
    
    // Create experience item HTML
    function createExperienceItem(exp, index) {
        const div = document.createElement('div');
        div.className = 'experience-item';
        div.dataset.index = index;
        
        div.innerHTML = `
            <div class="remove-btn"><i class="fas fa-times"></i></div>
            <div class="form-row">
                <label for="exp-start-${index}">Start Year</label>
                <input type="text" id="exp-start-${index}" value="${exp.startYear}" data-field="startYear">
            </div>
            <div class="form-row">
                <label for="exp-end-${index}">End Year</label>
                <input type="text" id="exp-end-${index}" value="${exp.endYear}" data-field="endYear">
            </div>
            <div class="form-row">
                <label for="exp-title-${index}">Job Title</label>
                <input type="text" id="exp-title-${index}" value="${exp.jobTitle}" data-field="jobTitle">
            </div>
            <div class="form-row">
                <label for="exp-company-${index}">Company</label>
                <input type="text" id="exp-company-${index}" value="${exp.company}" data-field="company">
            </div>
            <div class="form-row">
                <label for="exp-desc-${index}">Description</label>
                <textarea id="exp-desc-${index}" data-field="description">${exp.description}</textarea>
            </div>
        `;
        
        // Add event listeners for input changes
        const inputs = div.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('change', function() {
                updateExperience(index, this.dataset.field, this.value);
            });
        });
        
        // Add event listener for remove button
        const removeBtn = div.querySelector('.remove-btn');
        removeBtn.addEventListener('click', function() {
            removeExperience(index);
            div.remove();
        });
        
        return div;
    }
    
    // Update experience data in localStorage
    function updateExperience(index, field, value) {
        const experiences = JSON.parse(localStorage.getItem('portfolio_experiences')) || [];
        
        if (experiences[index]) {
            experiences[index][field] = value;
            localStorage.setItem('portfolio_experiences', JSON.stringify(experiences));
        }
    }
    
    // Remove experience from localStorage
    function removeExperience(index) {
        const experiences = JSON.parse(localStorage.getItem('portfolio_experiences')) || [];
        experiences.splice(index, 1);
        localStorage.setItem('portfolio_experiences', JSON.stringify(experiences));
        
        // Re-render the experience list to update indices
        loadExperience();
    }
    
    // Skills Tab
    function loadSkills() {
        // Load technical skills
        const technicalSkills = JSON.parse(localStorage.getItem('portfolio_technical_skills')) || [
            'HTML5/CSS3/SASS',
            'JavaScript/TypeScript',
            'React/Vue.js',
            'Figma/Adobe XD'
        ];
        
        // Clear existing items
        technicalSkillsList.innerHTML = '';
        
        // Add each technical skill
        technicalSkills.forEach((skill, index) => {
            const skillItem = createSkillItem(skill, index, 'technical');
            technicalSkillsList.appendChild(skillItem);
        });
        
        // Load soft skills
        const softSkills = JSON.parse(localStorage.getItem('portfolio_soft_skills')) || [
            'Project Management',
            'Team Leadership',
            'Communication',
            'Problem Solving'
        ];
        
        // Clear existing items
        softSkillsList.innerHTML = '';
        
        // Add each soft skill
        softSkills.forEach((skill, index) => {
            const skillItem = createSkillItem(skill, index, 'soft');
            softSkillsList.appendChild(skillItem);
        });
        
        // Add event listener for Add Technical Skill button
        if (addTechnicalSkillBtn) {
            addTechnicalSkillBtn.addEventListener('click', function() {
                const newSkill = '';
                const skillItem = createSkillItem(newSkill, technicalSkills.length, 'technical');
                technicalSkillsList.appendChild(skillItem);
                
                // Update local storage with the new item
                technicalSkills.push(newSkill);
                localStorage.setItem('portfolio_technical_skills', JSON.stringify(technicalSkills));
            });
        }
        
        // Add event listener for Add Soft Skill button
        if (addSoftSkillBtn) {
            addSoftSkillBtn.addEventListener('click', function() {
                const newSkill = '';
                const skillItem = createSkillItem(newSkill, softSkills.length, 'soft');
                softSkillsList.appendChild(skillItem);
                
                // Update local storage with the new item
                softSkills.push(newSkill);
                localStorage.setItem('portfolio_soft_skills', JSON.stringify(softSkills));
            });
        }
    }
    
    // Create skill item HTML
    function createSkillItem(skill, index, type) {
        const div = document.createElement('div');
        div.className = 'skill-item';
        div.dataset.index = index;
        
        div.innerHTML = `
            <div class="remove-btn"><i class="fas fa-times"></i></div>
            <div class="form-row">
                <label for="${type}-skill-${index}">Skill</label>
                <input type="text" id="${type}-skill-${index}" value="${skill}">
            </div>
        `;
        
        // Add event listeners for input changes
        const input = div.querySelector('input');
        input.addEventListener('change', function() {
            if (type === 'technical') {
                updateTechnicalSkill(index, this.value);
            } else {
                updateSoftSkill(index, this.value);
            }
        });
        
        // Add event listener for remove button
        const removeBtn = div.querySelector('.remove-btn');
        removeBtn.addEventListener('click', function() {
            if (type === 'technical') {
                removeTechnicalSkill(index);
            } else {
                removeSoftSkill(index);
            }
            div.remove();
        });
        
        return div;
    }
    
    // Update technical skill in localStorage
    function updateTechnicalSkill(index, value) {
        const skills = JSON.parse(localStorage.getItem('portfolio_technical_skills')) || [];
        
        if (skills[index] !== undefined) {
            skills[index] = value;
            localStorage.setItem('portfolio_technical_skills', JSON.stringify(skills));
        }
    }
    
    // Remove technical skill from localStorage
    function removeTechnicalSkill(index) {
        const skills = JSON.parse(localStorage.getItem('portfolio_technical_skills')) || [];
        skills.splice(index, 1);
        localStorage.setItem('portfolio_technical_skills', JSON.stringify(skills));
        
        // Re-render the skills list to update indices
        loadSkills();
    }
    
    // Update soft skill in localStorage
    function updateSoftSkill(index, value) {
        const skills = JSON.parse(localStorage.getItem('portfolio_soft_skills')) || [];
        
        if (skills[index] !== undefined) {
            skills[index] = value;
            localStorage.setItem('portfolio_soft_skills', JSON.stringify(skills));
        }
    }
    
    // Remove soft skill from localStorage
    function removeSoftSkill(index) {
        const skills = JSON.parse(localStorage.getItem('portfolio_soft_skills')) || [];
        skills.splice(index, 1);
        localStorage.setItem('portfolio_soft_skills', JSON.stringify(skills));
        
        // Re-render the skills list to update indices
        loadSkills();
    }
    
    // Projects Tab
    function loadProjects() {
        const projects = JSON.parse(localStorage.getItem('portfolio_projects')) || [
            {
                name: 'HealthTrack App',
                description: 'A comprehensive health monitoring application built with React and Firebase. Features include workout tracking, nutrition analysis, and personalized recommendations using machine learning algorithms.',
                image: 'assets/images/project-placeholder.jpg',
                demoUrl: 'https://healthtrack-app.com',
                githubUrl: 'https://github.com/yoayoe/healthtrack'
            },
            {
                name: 'Eco-Commerce Platform',
                description: 'A sustainable e-commerce platform built with Vue.js and Node.js. Implemented responsive design, shopping cart functionality, and integrated payment gateways with a focus on eco-friendly products.',
                image: 'assets/images/project-placeholder.jpg',
                demoUrl: 'https://eco-shop.net',
                githubUrl: 'https://github.com/yoayoe/eco-commerce'
            },
            {
                name: 'Smart Home Dashboard',
                description: 'An IoT dashboard for smart home management using React, TypeScript, and WebSockets. Created data visualizations for energy consumption, implemented device controls, and designed intuitive user interfaces.',
                image: 'assets/images/project-placeholder.jpg',
                demoUrl: 'https://smart-home-dash.io',
                githubUrl: 'https://github.com/yoayoe/smart-home'
            }
        ];
        
        // Clear existing items
        projectsList.innerHTML = '';
        
        // Add each project
        projects.forEach((project, index) => {
            const projectItem = createProjectItem(project, index);
            projectsList.appendChild(projectItem);
        });
        
        // Add event listener for Add Project button
        if (addProjectBtn) {
            addProjectBtn.addEventListener('click', function() {
                const newProject = {
                    name: '',
                    description: '',
                    image: 'assets/images/project-placeholder.jpg',
                    demoUrl: '',
                    githubUrl: ''
                };
                
                const projectItem = createProjectItem(newProject, projects.length);
                projectsList.appendChild(projectItem);
                
                // Update local storage with the new item
                projects.push(newProject);
                localStorage.setItem('portfolio_projects', JSON.stringify(projects));
            });
        }
    }
    
    // Create project item HTML
    function createProjectItem(project, index) {
        const div = document.createElement('div');
        div.className = 'project-item';
        div.dataset.index = index;
        
        div.innerHTML = `
            <div class="remove-btn"><i class="fas fa-times"></i></div>
            <div class="form-row">
                <label for="proj-name-${index}">Project Name</label>
                <input type="text" id="proj-name-${index}" value="${project.name}" data-field="name">
            </div>
            <div class="form-row">
                <label for="proj-desc-${index}">Description</label>
                <textarea id="proj-desc-${index}" data-field="description">${project.description}</textarea>
            </div>
            <div class="form-row">
                <label for="proj-image-${index}">Image URL</label>
                <input type="text" id="proj-image-${index}" value="${project.image}" data-field="image">
            </div>
            <div class="form-row">
                <label for="proj-demo-${index}">Demo URL</label>
                <input type="url" id="proj-demo-${index}" value="${project.demoUrl}" data-field="demoUrl">
            </div>
            <div class="form-row">
                <label for="proj-github-${index}">GitHub URL</label>
                <input type="url" id="proj-github-${index}" value="${project.githubUrl}" data-field="githubUrl">
            </div>
        `;
        
        // Add event listeners for input changes
        const inputs = div.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('change', function() {
                updateProject(index, this.dataset.field, this.value);
            });
        });
        
        // Add event listener for remove button
        const removeBtn = div.querySelector('.remove-btn');
        removeBtn.addEventListener('click', function() {
            removeProject(index);
            div.remove();
        });
        
        return div;
    }
    
    // Update project data in localStorage
    function updateProject(index, field, value) {
        const projects = JSON.parse(localStorage.getItem('portfolio_projects')) || [];
        
        if (projects[index]) {
            projects[index][field] = value;
            localStorage.setItem('portfolio_projects', JSON.stringify(projects));
        }
    }
    
    // Remove project from localStorage
    function removeProject(index) {
        const projects = JSON.parse(localStorage.getItem('portfolio_projects')) || [];
        projects.splice(index, 1);
        localStorage.setItem('portfolio_projects', JSON.stringify(projects));
        
        // Re-render the project list to update indices
        loadProjects();
    }
    
    // Contact Tab
    function loadContactInfo() {
        const contactInfo = JSON.parse(localStorage.getItem('portfolio_contact_info')) || {};
        
        document.getElementById('email').value = contactInfo.email || 'yoayoe.anifa@gmail.com';
        document.getElementById('phone').value = contactInfo.phone || '+62 812 3456 7890';
        document.getElementById('location').value = contactInfo.location || 'Jakarta, Indonesia';
        document.getElementById('linkedin').value = contactInfo.linkedin || 'https://linkedin.com/in/yoayoe-anifa';
        document.getElementById('github').value = contactInfo.github || 'https://github.com/yoayoe';
        document.getElementById('twitter').value = contactInfo.twitter || 'https://twitter.com/yoayoe_anifa';
        
        // Add event listener for contact info form
        const contactForm = document.querySelector('#contact .admin-form');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const contactInfo = {
                    email: document.getElementById('email').value,
                    phone: document.getElementById('phone').value,
                    location: document.getElementById('location').value,
                    linkedin: document.getElementById('linkedin').value,
                    github: document.getElementById('github').value,
                    twitter: document.getElementById('twitter').value
                };
                
                localStorage.setItem('portfolio_contact_info', JSON.stringify(contactInfo));
                alert('Contact information saved! Returning to main page...');
                window.location.href = 'index.html';
            });
        }
    }
    
    // Save All Changes Button
    if (saveAllBtn) {
        saveAllBtn.addEventListener('click', function() {
            alert('All changes saved. The website will reflect your changes on refresh.');
            window.location.href = 'index.html';
        });
    }
    
    // Initialize admin panel
    checkLoginStatus();
    
    // Save buttons for individual sections
    const saveExperienceBtn = document.getElementById('save-experience');
    const saveSkillsBtn = document.getElementById('save-skills');
    const saveProjectsBtn = document.getElementById('save-projects');
    
    // Add event listeners for section save buttons
    if (saveExperienceBtn) {
        saveExperienceBtn.addEventListener('click', function() {
            alert('Experience changes saved! Returning to main page...');
            window.location.href = 'index.html';
        });
    }
    
    if (saveSkillsBtn) {
        saveSkillsBtn.addEventListener('click', function() {
            alert('Skills changes saved! Returning to main page...');
            window.location.href = 'index.html';
        });
    }
    
    if (saveProjectsBtn) {
        saveProjectsBtn.addEventListener('click', function() {
            alert('Project changes saved! Returning to main page...');
            window.location.href = 'index.html';
        });
    }
});