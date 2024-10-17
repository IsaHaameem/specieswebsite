// Change header background on scroll
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    const scrollPosition = window.scrollY || window.pageYOffset;

    if (scrollPosition > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
const navLinks = document.querySelectorAll('nav a[href^="#"]');

navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            // Calculate the position to scroll to
            const headerOffset = header.offsetHeight; // Height of the header
            const elementPosition = targetSection.getBoundingClientRect().top; // Position of target section
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset; // Adjusted position

            // Smooth scroll to target section
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});
