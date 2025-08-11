// ============================
// Waste Calculator
// ============================
function calculateWaste() {
    const wasteType = document.getElementById('wasteType').value;
    const weight = parseFloat(document.getElementById('wasteWeight').value);
    const resultBox = document.getElementById('calculationResult');
    const resultText = document.getElementById('resultText');

    if (isNaN(weight) || weight <= 0) {
        alert('Masukkan berat sampah yang valid!');
        resultBox.style.display = 'none';
        return;
    }

    // Harga per kg untuk setiap jenis sampah
    const prices = {
        plastic: 2500,
        paper: 1500,
        metal: 8000,
        glass: 500,
        organic: 1000
    };

    const totalValue = weight * prices[wasteType];
    const formattedValue = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    }).format(totalValue);

    resultText.innerHTML = `
        <strong>${weight} kg ${getWasteTypeName(wasteType)}</strong><br>
        Estimasi nilai: <strong>${formattedValue}</strong>
    `;
    resultBox.style.display = 'block';
}

function getWasteTypeName(type) {
    const names = {
        plastic: 'Plastik',
        paper: 'Kertas',
        metal: 'Logam',
        glass: 'Kaca',
        organic: 'Organik'
    };
    return names[type] || type;
}

// ============================
// Live Statistics Animation
// ============================
function animateStats() {
    document.querySelectorAll('.stat-number').forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target.toLocaleString('id-ID');
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current).toLocaleString('id-ID');
            }
        }, 20);
    });
}

// ============================
// Testimonial Slider
// ============================
let slideIndex = 0;
const slides = document.querySelectorAll('.testimonial-item');
const dots = document.querySelectorAll('.dot');

function showSlide(n) {
    slideIndex = (n + slides.length) % slides.length;

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[slideIndex].classList.add('active');
    dots[slideIndex].classList.add('active');
}

function nextSlide() {
    showSlide(slideIndex + 1);
}

function currentSlide(n) {
    showSlide(n - 1);
}

// Auto slide testimonial
setInterval(nextSlide, 5000);

// ============================
// Smooth Scroll
// ============================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ============================
// Form Validation
// ============================
function initFormValidation() {
    const commentForm = document.getElementById('signupForm');
    if (commentForm) {
        commentForm.addEventListener('submit', function (e) {
            const name = document.getElementById('commentName').value.trim();
            const message = document.getElementById('commentMessage').value.trim();

            if (!name || !message) {
                e.preventDefault();
                alert('Mohon lengkapi nama dan komentar Anda!');
            }
        });
    }
}

// ============================
// Mobile Menu Toggle
// ============================
function toggleMobileMenu() {
    document.querySelector('.nav-links').classList.toggle('active');
}

// ============================
// FAQ Accordion
// ============================
function initFAQ() {
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', function () {
            const answer = this.nextElementSibling;
            const isOpen = answer.style.display === 'block';
            document.querySelectorAll('.faq-answer').forEach(a => a.style.display = 'none');
            answer.style.display = isOpen ? 'none' : 'block';
        });
    });
}

// ============================
// Comparison Chart
// ============================
function initChart() {
    const comparisonData = {
        labels: ["Mei", "Jun", "Jul"],
        datasets: [{
            label: 'Total Sampah (kg)',
            data: [80, 95, 120],
            backgroundColor: ["#2e5e57", "#4CAF50", "#8BC34A"],
            borderColor: ["#1e3e37", "#3C9F40", "#7BB33A"],
            borderWidth: 1,
            borderRadius: 6
        }]
    };

    new Chart(document.getElementById('comparisonChart'), {
        type: 'bar',
        data: comparisonData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: context => `${context.dataset.label}: ${context.raw} kg`
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: { display: true, text: 'Jumlah Sampah (kg)' }
                }
            }
        }
    });
}

// ============================
// Initialize All Features
// ============================
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.calculate-btn')) {
        document.querySelector('.calculate-btn').addEventListener('click', calculateWaste);
    }
    animateStats();
    showSlide(0);
    initSmoothScroll();
    initFormValidation();
    initFAQ();
    initChart();
});
