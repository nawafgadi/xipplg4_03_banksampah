// Waste Calculator Functionality
function calculateWaste() {
    const wasteType = document.getElementById('wasteType').value;
    const weight = parseFloat(document.getElementById('wasteWeight').value);
    const resultBox = document.getElementById('calculationResult');
    const resultText = document.getElementById('resultText');
    
    if (!weight || weight <= 0) {
        alert('Masukkan berat sampah yang valid!');
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
    return names[type];
}

// Live Statistics Animation
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
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

// Testimonial Slider
let slideIndex = 0;
const slides = document.querySelectorAll('.testimonial-item');
const dots = document.querySelectorAll('.dot');

function showSlide(n) {
    slideIndex = n;
    if (slideIndex >= slides.length) slideIndex = 0;
    if (slideIndex < 0) slideIndex = slides.length - 1;
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[slideIndex].classList.add('active');
    dots[slideIndex].classList.add('active');
}

function currentSlide(n) {
    showSlide(n - 1);
}

function nextSlide() {
    showSlide(slideIndex + 1);
}

// Auto slide testimonial
setInterval(() => {
    nextSlide();
}, 5000);

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', function() {
    animateStats();
    
    // Smooth scroll for anchor links
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
});

// Form validation for comment form
document.addEventListener('DOMContentLoaded', function() {
    const commentForm = document.getElementById('signupForm');
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            const name = document.getElementById('commentName').value;
            const message = document.getElementById('commentMessage').value;
            
            if (!name.trim() || !message.trim()) {
                e.preventDefault();
                alert('Mohon lengkapi nama dan komentar Anda!');
            }
        });
    }
});

// Smooth scroll for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

// Mobile menu toggle (if needed)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Fungsi untuk edukasi
document.querySelectorAll('.education-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const cardTitle = this.closest('.education-card').querySelector('h3').textContent;
    });
});

// Comparison Chart
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
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.raw} kg`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Jumlah Sampah (kg)'
        }
      }
    }
  }
});

// Initialize all features
document.addEventListener('DOMContentLoaded', function() {
    // Initialize calculator
    const calculateBtn = document.querySelector('.calculate-btn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateWaste);
    }
    
    // Initialize stats animation
    animateStats();
    
    // Initialize testimonial slider
    showSlide(0);
    
    // Add smooth scrolling
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
});