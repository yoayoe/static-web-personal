/**
 * Main JavaScript for Personal Portfolio Website
 */

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a nav link
    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Basic validation
            if (!name || !email || !message) {
                alert('Please fill out all fields.');
                return;
            }
            
            // Here you would typically send this data to a server
            // Since this is a static site, we'll just show a confirmation message
            alert(`Thank you for your message, ${name}! This is a static form, so no data is being sent. In a real implementation, your message would be sent to the site owner.`);
            
            // Reset the form
            contactForm.reset();
        });
    }
    
    // Simple animation on scroll
    function fadeInOnScroll() {
        const elements = document.querySelectorAll('.section-header, .project-card, .timeline-item');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }
    
    // Add animation classes to CSS
    const style = document.createElement('style');
    style.textContent = `
        .section-header, .project-card, .timeline-item {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .section-header.visible, .project-card.visible, .timeline-item.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .project-card {
            transition-delay: calc(var(--index) * 0.1s);
        }
    `;
    document.head.appendChild(style);
    
    // Set indices for staggered animations
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.setProperty('--index', index);
    });
    
    // Initial check and add scroll listener
    fadeInOnScroll();
    window.addEventListener('scroll', fadeInOnScroll);
    
    // ========== DYNAMIC CONTENT LOADING FROM LOCALSTORAGE ==========
    
    // Check if this is a reload from admin panel
    const isAdminReload = new URLSearchParams(window.location.search).get('admin_update');
    
    // Load personal information
    function loadPersonalInfo() {
        // Force cache busting for localStorage data
        const timestamp = new Date().getTime();
        const personalInfo = JSON.parse(localStorage.getItem('portfolio_personal_info' + (isAdminReload ? '' : '?t=' + timestamp))) || {};
        
        // Update hero section
        const heroName = document.querySelector('.hero h1 .highlight');
        const heroTitle = document.querySelector('.hero h2');
        const heroTagline = document.querySelector('.hero .tagline');
        
        if (heroName) heroName.textContent = personalInfo.fullName || 'Yoayoe Anifa';
        if (heroTitle) heroTitle.textContent = personalInfo.title || 'Frontend Developer & UI/UX Designer';
        if (heroTagline) heroTagline.textContent = personalInfo.tagline || 'Crafting beautiful digital experiences with clean code and innovative design';
        
        // Update about section
        const aboutText = document.querySelector('.about-text p:first-child');
        if (aboutText) {
            aboutText.textContent = personalInfo.about || 'I am a passionate Frontend Developer and UI/UX Designer with over 5 years of experience creating responsive, user-friendly web applications. With a background in computer science and a keen eye for design, I bridge the gap between functionality and aesthetics to deliver exceptional digital experiences. I believe in clean, maintainable code and intuitive interfaces that solve real user problems.';
        }
        
        // Update page title
        const fullName = personalInfo.fullName || 'Yoayoe Anifa';
        const title = personalInfo.title || 'Web Developer & UI Designer';
        document.title = `${fullName} | ${title}`;
        
        // Update footer copyright
        const footerCopyright = document.querySelector('footer .footer-content p');
        if (footerCopyright) {
            const currentYear = new Date().getFullYear();
            footerCopyright.textContent = `© ${currentYear} ${fullName}. All Rights Reserved.`;
        }
    }
    
    // Load experience items
    function loadExperienceItems() {
        const experiences = JSON.parse(localStorage.getItem('portfolio_experiences')) || [];
        const timelineContainer = document.querySelector('.timeline');
        
        if (timelineContainer && experiences.length > 0) {
            // Clear existing timeline items
            timelineContainer.innerHTML = '';
            
            // Add each experience to the timeline
            experiences.forEach(exp => {
                const timelineItem = document.createElement('div');
                timelineItem.className = 'timeline-item';
                
                timelineItem.innerHTML = `
                    <span class="date">${exp.startYear} - ${exp.endYear}</span>
                    <h4>${exp.jobTitle}</h4>
                    <p>${exp.company}</p>
                    <p>${exp.description}</p>
                `;
                
                timelineContainer.appendChild(timelineItem);
            });
        }
    }
    
    // Load skills
    function loadSkills() {
        // Load technical skills
        const technicalSkills = JSON.parse(localStorage.getItem('portfolio_technical_skills')) || [];
        const technicalSkillsList = document.querySelector('.skill-category:first-child ul');
        
        if (technicalSkillsList && technicalSkills.length > 0) {
            technicalSkillsList.innerHTML = '';
            technicalSkills.forEach(skill => {
                const li = document.createElement('li');
                li.textContent = skill;
                technicalSkillsList.appendChild(li);
            });
        }
        
        // Load soft skills
        const softSkills = JSON.parse(localStorage.getItem('portfolio_soft_skills')) || [];
        const softSkillsList = document.querySelector('.skill-category:last-child ul');
        
        if (softSkillsList && softSkills.length > 0) {
            softSkillsList.innerHTML = '';
            softSkills.forEach(skill => {
                const li = document.createElement('li');
                li.textContent = skill;
                softSkillsList.appendChild(li);
            });
        }
    }
    
    // Load projects
    function loadProjects() {
        const projects = JSON.parse(localStorage.getItem('portfolio_projects')) || [];
        const projectsGrid = document.querySelector('.projects-grid');
        
        if (projectsGrid && projects.length > 0) {
            // Clear existing projects
            projectsGrid.innerHTML = '';
            
            // Add each project
            projects.forEach(project => {
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card';
                
                projectCard.innerHTML = `
                    <div class="project-image">
                        <img src="${project.image}" alt="${project.name}">
                    </div>
                    <div class="project-details">
                        <h3>${project.name}</h3>
                        <p>${project.description}</p>
                        <div class="project-links">
                            <a href="${project.demoUrl}" class="btn small-btn"><i class="fas fa-globe"></i> Live Demo</a>
                            <a href="${project.githubUrl}" class="btn small-btn"><i class="fab fa-github"></i> Source Code</a>
                        </div>
                    </div>
                `;
                
                projectsGrid.appendChild(projectCard);
            });
            
            // Reapply animation settings
            const projectCards = document.querySelectorAll('.project-card');
            projectCards.forEach((card, index) => {
                card.style.setProperty('--index', index);
            });
        }
    }
    
    // Load contact information
    function loadContactInfo() {
        const contactInfo = JSON.parse(localStorage.getItem('portfolio_contact_info')) || {};
        
        // Update contact list
        const contactEmail = document.querySelector('.contact-list li:nth-child(1)');
        const contactPhone = document.querySelector('.contact-list li:nth-child(2)');
        const contactLocation = document.querySelector('.contact-list li:nth-child(3)');
        
        if (contactEmail) {
            contactEmail.innerHTML = `<i class="fas fa-envelope"></i> ${contactInfo.email || 'yoayoe.anifa@gmail.com'}`;
        }
        
        if (contactPhone) {
            contactPhone.innerHTML = `<i class="fas fa-phone"></i> ${contactInfo.phone || '+62 812 3456 7890'}`;
        }
        
        if (contactLocation) {
            contactLocation.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${contactInfo.location || 'Jakarta, Indonesia'}`;
        }
        
        // Update social media links
        const socialLinks = {
            linkedin: contactInfo.linkedin || 'https://linkedin.com/in/yoayoe-anifa',
            github: contactInfo.github || 'https://github.com/yoayoe',
            twitter: contactInfo.twitter || 'https://twitter.com/yoayoe_anifa'
        };
        
        // Update hero social links
        const heroSocial = document.querySelectorAll('.hero .social-icons a');
        if (heroSocial.length >= 3) {
            heroSocial[0].href = socialLinks.linkedin;
            heroSocial[1].href = socialLinks.github;
            heroSocial[2].href = socialLinks.twitter;
        }
        
        // Update footer social links
        const footerSocial = document.querySelectorAll('footer .social-icons a');
        if (footerSocial.length >= 3) {
            footerSocial[0].href = socialLinks.linkedin;
            footerSocial[1].href = socialLinks.github;
            footerSocial[2].href = socialLinks.twitter;
        }
    }
    
    // Load all dynamic content
    loadPersonalInfo();
    loadExperienceItems();
    loadSkills();
    loadProjects();
    loadContactInfo();
    
    // If this was loaded from admin panel, clear the URL parameter
    if (isAdminReload) {
        window.history.replaceState({}, document.title, window.location.pathname);
    }
});