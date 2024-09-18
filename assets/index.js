// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission handling with real-time validation
const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

function validateInput(input, regex, errorMessage) {
    const isValid = regex.test(input.value);
    input.classList.toggle('is-invalid', !isValid);
    input.nextElementSibling.textContent = isValid ? '' : errorMessage;
    return isValid;
}

nameInput.addEventListener('input', () => validateInput(nameInput, /^.{2,}$/, 'Name must be at least 2 characters long'));
emailInput.addEventListener('input', () => validateInput(emailInput, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address'));
messageInput.addEventListener('input', () => validateInput(messageInput, /^.{10,}$/, 'Message must be at least 10 characters long'));



document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            sections.forEach(section => {
                section.style.display = section.id === targetId ? 'block' : 'none';
            });
        });
    });
});

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const isNameValid = validateInput(nameInput, /^.{2,}$/, 'Name must be at least 2 characters long');
    const isEmailValid = validateInput(emailInput, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address');
    const isMessageValid = validateInput(messageInput, /^.{10,}$/, 'Message must be at least 10 characters long');

    if (isNameValid && isEmailValid && isMessageValid) {
        alert('Thank you for your message! I will get back to you soon.');
        this.reset(); // Reset the form after successful submission
    } else {
        alert('Please ensure all fields are filled out correctly before submitting.');
    }
});
document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission and page reload
    alert("Thanks for reaching out! I'll get back to you soon.");
    // Optionally, reset the form after showing the alert
    document.getElementById("contact-form").reset();
});

// Animate skill bars on scroll
function animateSkillBars() {
    const skillsSection = document.getElementById('skills');
    const progressBars = skillsSection.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        const width = bar.getAttribute('aria-valuenow') + '%';
        bar.style.width = width;
    });
}

// Intersection Observer for lazy loading and animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.id === 'skills') {
                animateSkillBars();
            }
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Back-to-Top button functionality
const backToTopButton = document.createElement('button');
backToTopButton.id = 'back-to-top';
backToTopButton.innerHTML = '↑';
backToTopButton.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: var(--primary-color);
    color: #fff;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
`;
document.body.appendChild(backToTopButton);

window.addEventListener('scroll', () => {
    backToTopButton.style.display = window.scrollY > 300 ? 'flex' : 'none';
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

backToTopButton.addEventListener('mouseover', () => {
    backToTopButton.style.backgroundColor = 'var(--secondary-color)';
    backToTopButton.style.transform = 'scale(1.1)';
});

backToTopButton.addEventListener('mouseout', () => {
    backToTopButton.style.backgroundColor = 'var(--primary-color)';
    backToTopButton.style.transform = 'scale(1)';
});

// Add typewriter effect to the header
function typeWriter(element, text, speed) {
    let i = 0;
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

const headerLead = document.querySelector('.jumbotron .lead');
const originalText = headerLead.textContent;
headerLead.textContent = '';
typeWriter(headerLead, originalText, 50);

// Project hover effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.05)';
        card.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1)';
        card.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
    });
});