// Global state
let currentUser = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Check for saved user
    const savedUser = localStorage.getItem('travelUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showScreen('dashboard'); // Assuming 'dashboard' is the next screen after loading for a returning user
        updateDashboard(); // Assuming this function updates the dashboard content
    } else {
        // Start loading sequence
        startLoadingSequence();
    }
    
    // Initialize event listeners (only those relevant to the splash screen or initial app load)
    // No specific event listeners are directly tied to the splash screen itself,
    // but the `initializeApp` function is called on DOMContentLoaded.
}

function startLoadingSequence() {
    showScreen('loading-screen');
    
    const progressFill = document.querySelector('#loading-screen .progress-fill');
    const progressText = document.querySelector('#loading-screen .progress-text');
    
    let progress = 0;
    const progressTexts = [
        "Analyzing your personality...",
        "Finding perfect destinations...",
        "Creating magical experiences...",
        "Almost ready for adventure!"
    ];
    
    const progressInterval = setInterval(() => {
        progress += 1;
        progressFill.style.width = progress + '%';
        
        if (progress < 30) {
            progressText.textContent = progressTexts[0];
        } else if (progress < 60) {
            progressText.textContent = progressTexts[1];
        } else if (progress < 90) {
            progressText.textContent = progressTexts[2];
        } else {
            progressText.textContent = progressTexts[3];
        }
        
        if (progress >= 100) {
            clearInterval(progressInterval);
            setTimeout(() => {
                showScreen('home-page'); // Transition to the home page after loading
            }, 1000);
        }
    }, 30);
}

function showScreen(screenId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show target screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }
    
    // No other screen-specific initializations are needed for the splash screen itself.
    // The switch statement in the original `showScreen` function handles other screens.
}

// Placeholder for functions called by initializeApp or showScreen that are not part of the splash screen logic
function updateDashboard() {
    // This function is called if a user is saved, but its implementation is not part of the splash screen.
    // It would typically update the dashboard UI.
}
