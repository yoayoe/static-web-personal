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
});