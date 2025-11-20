// ====================================
// AniStream - JavaScript File (FIXED)
// ====================================

// Global Variables 


const animeImages = {
    "Demon Slayer": "/images/demon-slayer.jpg",
    "Naruto": "/images/naruto.jpg",
    "Attack on Titan": "/images/attack-on-titan.jpg",
    "Jujutsu Kaisen": "/images/jujutsu-kaisen.jpg",
    "My Hero Academia": "/images/my-hero-academia.jpg",
    "Chainsaw Man": "/images/chainsaw-man.jpg",
    "Spy x Family": "/images/spy-family.jpg",
    "One Piece": "/images/one-piece.jpg",
    "Tokyo Revengers": "/images/tokyo-revengers.jpg",
    "Sword Art Online": "/images/sao.jpg",
    "One Punch Man": "/images/one-punch-man.jpg",
    "Your Name": "/images/your-name.jpg"
};




let watchlist = [];
let currentAnime = {};

// ====================================
// Initialize on Page Load
// ====================================
document.addEventListener('DOMContentLoaded', function() {
    loadWatchlist();
    initializeEventListeners();
    
    // Load watchlist page if on that page
    if (document.getElementById('watchlistGrid')) {
        displayWatchlist();
    }
});

// ====================================
// Event Listeners
// ====================================
function initializeEventListeners() {
    // Modal close button
    const closeBtn = document.querySelector('.close-modal');
    if (closeBtn) {
        closeBtn.onclick = closeModal;
    }
    
    // Close modal when clicking outside
    window.onclick = function(event) {
        const modal = document.getElementById('animeModal');
        if (event.target === modal) {
            closeModal();
        }
    };
    
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
    
    // Genre filter
    const genreFilter = document.getElementById('genreFilter');
    if (genreFilter) {
        genreFilter.addEventListener('change', handleGenreFilter);
    }
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
    
    // Login/Signup buttons
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            alert('Login feature coming soon! This is a demo project.');
        });
    }
    
    if (signupBtn) {
        signupBtn.addEventListener('click', function() {
            alert('Sign up feature coming soon! This is a demo project.');
        });
    }
    
    // AI Converter Demo
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const resetBtn = document.getElementById('resetBtn');
    
    if (uploadArea && fileInput) {
        uploadArea.addEventListener('click', () => fileInput.click());
        fileInput.addEventListener('change', handleImageUpload);
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', resetConverter);
    }
}

// ====================================
// Modal Functions
// ====================================
function openModal(title, genre, description) {
    currentAnime = { title, genre, description };
    
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalGenre').textContent = genre;
    document.getElementById('modalDescription').textContent = description;
    
    const modal = document.getElementById('animeModal');
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('animeModal');
    modal.style.display = 'none';
}

// ====================================
// Watchlist Functions (FIXED VERSION)
// ====================================
function addToWatchlist() {
    if (!currentAnime.title) {
        alert('No anime selected!');
        return;
    }
    
    // Check if already in watchlist
    const exists = watchlist.some(anime => anime.title === currentAnime.title);
    
    if (exists) {
        alert('This anime is already in your watchlist!');
        return;
    }
    
    // Add to watchlist
    watchlist.push(currentAnime);
    saveWatchlist(); // Save to localStorage
    
    alert(`✅ ${currentAnime.title} has been added to your watchlist!`);
    closeModal();
}

function removeFromWatchlist(title) {
    if (confirm(`Remove "${title}" from watchlist?`)) {
        watchlist = watchlist.filter(anime => anime.title !== title);
        saveWatchlist(); // Save changes
        displayWatchlist(); // Refresh display
        alert('Removed from watchlist!');
    }
}

function saveWatchlist() {
    // Save to localStorage so it persists
    localStorage.setItem('anistream_watchlist', JSON.stringify(watchlist));
    console.log('✅ Watchlist saved:', watchlist);
}

function loadWatchlist() {
    // Load from localStorage
    const saved = localStorage.getItem('anistream_watchlist');
    if (saved) {
        watchlist = JSON.parse(saved);
        console.log('✅ Watchlist loaded:', watchlist);
    } else {
        watchlist = [];
        console.log('📋 Starting with empty watchlist');
    }
}

function displayWatchlist() {
    const watchlistGrid = document.getElementById('watchlistGrid');
    const watchlistCount = document.getElementById('watchlistCount');
    
    if (!watchlistGrid) return;
    
    if (watchlist.length === 0) {
        watchlistGrid.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📺</div>
                <h3>Your watchlist is empty</h3>
                <p>Start adding anime to keep track of what you want to watch</p>
                <a href="anime-list.html" class="btn-primary">Browse Anime</a>
            </div>
        `;
        if (watchlistCount) {
            watchlistCount.textContent = 'You have 0 anime in your watchlist';
        }
        return;
    }
    
    // Update count
    if (watchlistCount) {
        watchlistCount.textContent = `You have ${watchlist.length} anime in your watchlist`;
    }
    
    // Display watchlist items
    watchlistGrid.innerHTML = watchlist.map(anime => {
    const imgSrc = animeImages[anime.title] || "/images/hero-banner.jpg";
    return `
        <div class="anime-card">
            <img src="${imgSrc}" alt="${anime.title}">
            <div class="anime-info">
                <h3>${anime.title}</h3>
                <p>${anime.genre}</p>
                <button class="btn-secondary full-width" onclick="removeFromWatchlist('${anime.title.replace(/'/g, "\\'")}')">
                    Remove
                </button>
            </div>
        </div>
    `;
}).join('');
    
    console.log('✅ Displayed', watchlist.length, 'anime in watchlist');
}

// ====================================
// Search Functionality
// ====================================
function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    const animeCards = document.querySelectorAll('.anime-card');
    
    animeCards.forEach(card => {
        const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
        
        if (title.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// ====================================
// Genre Filter
// ====================================
function handleGenreFilter(event) {
    const selectedGenre = event.target.value;
    const animeCards = document.querySelectorAll('.anime-card');
    
    animeCards.forEach(card => {
        const cardGenre = card.getAttribute('data-genre');
        
        if (selectedGenre === 'all' || cardGenre === selectedGenre) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function filterByGenre(genre) {
    // Redirect to anime list page with genre filter
    window.location.href = `anime-list.html?genre=${genre}`;
}

// ====================================
// Contact Form
// ====================================
function handleContactSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Hide form, show success message
    const form = document.getElementById('contactForm');
    const successMsg = document.getElementById('formSuccess');
    
    form.style.display = 'none';
    successMsg.style.display = 'block';
    
    // Log form data (in real project, would send to backend)
    console.log('Form submitted:', { name, email, subject, message });
    
    // Reset form after 3 seconds
    setTimeout(() => {
        form.reset();
        form.style.display = 'block';
        successMsg.style.display = 'none';
    }, 3000);
}

// ====================================
// AI Image Converter Demo
// ====================================
function handleImageUpload(event) {
    const file = event.target.files[0];
    
    if (!file) return;
    
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const uploadArea = document.getElementById('uploadArea');
        const conversionResult = document.getElementById('conversionResult');
        const originalImage = document.getElementById('originalImage');
        const animeImage = document.getElementById('animeImage');
        
        // Hide upload area, show result
        uploadArea.style.display = 'none';
        conversionResult.style.display = 'block';
        
        // Set original image
        originalImage.src = e.target.result;
        
        // Simulate AI conversion with anime-style placeholder
        setTimeout(() => {
            animeImage.src = 'https://via.placeholder.com/250/9333ea/ffffff?text=Anime+Style+✨';
        }, 1000);
    };
    
    reader.readAsDataURL(file);
}

function resetConverter() {
    const uploadArea = document.getElementById('uploadArea');
    const conversionResult = document.getElementById('conversionResult');
    const fileInput = document.getElementById('fileInput');
    
    // Reset file input
    fileInput.value = '';
    
    // Show upload area, hide result
    uploadArea.style.display = 'block';
    conversionResult.style.display = 'none';
}

// ====================================
// Utility Functions
// ====================================
function showNotification(message, type = 'info') {
    // Simple notification function
    alert(message);
}

// ====================================
// Clear Watchlist Function (Optional)
// ====================================
function clearWatchlist() {
    if (confirm('Are you sure you want to clear your entire watchlist?')) {
        watchlist = [];
        saveWatchlist();
        displayWatchlist();
        alert('Watchlist cleared!');
    }
}

// Console welcome message
console.log('%cWelcome to AniStream! 🎬', 'color: #7c3aed; font-size: 24px; font-weight: bold;');
console.log('%cThis is a demo project for educational purposes.', 'color: #a78bfa; font-size: 14px;');
console.log('%c✅ Watchlist system: ACTIVE with localStorage', 'color: #10b981; font-size: 14px; font-weight: bold;');
