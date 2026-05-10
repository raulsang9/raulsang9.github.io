// Header and Scroll Button behavior
const nav = document.getElementById('main-nav');
const scrollBtn = document.getElementById("scrollTopBtn");

window.addEventListener('scroll', function() {
    // --- NEW: Shrinking Header Logic ---
    // If user scrolls down more than 50px, shrink the nav
    if (window.scrollY > 50) {
        if (nav) nav.classList.add('scrolled');
    } else {
        if (nav) nav.classList.remove('scrolled');
    }

    // Show/hide scroll to top button based on depth
    if (window.scrollY > 400) {
        if (scrollBtn) scrollBtn.style.display = "block";
    } else {
        if (scrollBtn) scrollBtn.style.display = "none";
    }
    
    // Telemetry Scroll Progress Bar Calculation
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    const telemetryBar = document.getElementById("telemetryBar");
    if (telemetryBar) {
        telemetryBar.style.width = scrolled + "%";
    }
});

// Click to scroll to top
if (scrollBtn) {
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Intersection Observer for Scroll Reveals
const observerOptions = {
    threshold: 0.15
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Apply observer to reveal sections
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// Close mobile menu when a link is clicked
const menuToggle = document.getElementById('menu-toggle');
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (menuToggle) menuToggle.checked = false;
    });
});

// --- MODAL FUNCTIONS ---

// Function to open the modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "block";
        // Prevent the background website from scrolling
        document.body.style.overflow = "hidden"; 
    }
}

// Function to close the modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "none";
        // Restore the background scrolling
        document.body.style.overflow = "auto"; 
    }
}

// Close modal if user clicks the dark background outside the box
window.onclick = function(event) {
    const modals = document.getElementsByClassName('modal');
    for (let i = 0; i < modals.length; i++) {
        if (event.target == modals[i]) {
            modals[i].style.display = "none";
            document.body.style.overflow = "auto";
        }
    }
}

function showCourseProjects(courseId, buttonEl = null) {
    document.querySelectorAll('#polimi-projects-modal .course-pane').forEach((pane) => {
        pane.classList.remove('active');
    });

    document.querySelectorAll('#polimi-projects-modal .course-tab').forEach((btn) => {
        btn.classList.remove('active');
    });

    const targetPane = document.getElementById(courseId);
    if (targetPane) {
        targetPane.classList.add('active');
    }

    if (buttonEl) {
        buttonEl.classList.add('active');
    }

    document.querySelectorAll('#polimi-projects-modal .project-details').forEach((detail) => {
        detail.classList.remove('active');
    });
}

function toggleProjectDetails(detailsId) {
    const details = document.getElementById(detailsId);
    if (!details) return;

    const isOpen = details.classList.contains('active');

    document.querySelectorAll('#polimi-projects-modal .project-details').forEach((panel) => {
        panel.classList.remove('active');
    });

    if (!isOpen) {
        details.classList.add('active');
    }
}

const originalOpenModal = openModal;
openModal = function(modalId) {
    originalOpenModal(modalId);

    if (modalId === 'polimi-projects-modal') {
        document.querySelectorAll('#polimi-projects-modal .course-tab').forEach((btn) => {
            btn.classList.remove('active');
        });

        const firstTab = document.querySelector('#polimi-projects-modal .course-tab');
        if (firstTab) firstTab.classList.add('active');

        showCourseProjects('course-sgn', firstTab);
    }
};