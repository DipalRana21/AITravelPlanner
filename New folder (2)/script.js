// Global variables
let currentUser = null;
let currentQuestionIndex = 0;
let personalityAnswers = [];
let personalityResult = null;
let travelHistory = {};
let destinationData = {};

// Personality test questions
const personalityQuestions = [
    {
        question: "When planning a vacation, you prefer to:",
        options: [
            { text: "Plan every detail in advance", type: "planner" },
            { text: "Have a rough outline and be spontaneous", type: "flexible" },
            { text: "Book the flight and figure it out when you get there", type: "spontaneous" },
            { text: "Let someone else plan everything", type: "follower" }
        ]
    },
    {
        question: "Your ideal accommodation is:",
        options: [
            { text: "A luxury resort with all amenities", type: "luxury" },
            { text: "A boutique hotel with character", type: "culture" },
            { text: "A cozy Airbnb in a local neighborhood", type: "authentic" },
            { text: "A hostel where you can meet other travelers", type: "social" }
        ]
    },
    {
        question: "When it comes to trying new foods:",
        options: [
            { text: "I'll try anything once!", type: "adventurous" },
            { text: "I like to research local specialties first", type: "cautious" },
            { text: "I prefer familiar foods with maybe one new dish", type: "conservative" },
            { text: "I stick to what I know I like", type: "safe" }
        ]
    },
    {
        question: "Your ideal travel pace is:",
        options: [
            { text: "Packed schedule - see everything possible", type: "active" },
            { text: "Balanced mix of activities and relaxation", type: "balanced" },
            { text: "Slow and relaxed - really soak in the experience", type: "relaxed" },
            { text: "Completely flexible based on how I feel", type: "spontaneous" }
        ]
    },
    {
        question: "When choosing activities, you gravitate toward:",
        options: [
            { text: "Museums, historical sites, and cultural experiences", type: "culture" },
            { text: "Adventure sports and outdoor activities", type: "adventure" },
            { text: "Shopping, dining, and nightlife", type: "urban" },
            { text: "Beaches, spas, and relaxation", type: "relaxation" }
        ]
    },
    {
        question: "Your travel budget philosophy is:",
        options: [
            { text: "Splurge on experiences, save on accommodation", type: "experience" },
            { text: "Comfort is worth the extra cost", type: "comfort" },
            { text: "Find the best deals and stretch every dollar", type: "budget" },
            { text: "Money is no object for the perfect trip", type: "luxury" }
        ]
    },
    {
        question: "When traveling with others, you:",
        options: [
            { text: "Take charge and organize everything", type: "leader" },
            { text: "Contribute ideas but share planning duties", type: "collaborative" },
            { text: "Go with the flow and follow others' plans", type: "follower" },
            { text: "Prefer to travel solo", type: "independent" }
        ]
    },
    {
        question: "Your ideal trip duration is:",
        options: [
            { text: "Long weekend (2-4 days)", type: "short" },
            { text: "One week", type: "week" },
            { text: "Two weeks or more", type: "extended" },
            { text: "As long as possible", type: "nomadic" }
        ]
    },
    {
        question: "When something goes wrong during travel, you:",
        options: [
            { text: "Stay calm and find creative solutions", type: "adaptable" },
            { text: "Get stressed but work through it systematically", type: "systematic" },
            { text: "Look for help from locals or other travelers", type: "social" },
            { text: "Panic a little but usually figure it out", type: "anxious" }
        ]
    },
    {
        question: "Your main motivation for traveling is:",
        options: [
            { text: "Learning about different cultures and history", type: "educational" },
            { text: "Adventure and pushing personal boundaries", type: "thrill" },
            { text: "Relaxation and escape from daily stress", type: "escape" },
            { text: "Creating memories and experiences to share", type: "social" }
        ]
    }
];

// Sample destinations with events (in real app, this would come from APIs)
const sampleDestinations = {
    "paris": {
        name: "Paris, France",
        weather: "Partly cloudy, 18°C",
        events: [
            { name: "Louvre Night Tours", date: "2025-01-15", type: "cultural" },
            { name: "Seine River Jazz Cruise", date: "2025-01-16", type: "entertainment" },
            { name: "Montmartre Art Festival", date: "2025-01-17", type: "cultural" }
        ]
    },
    "tokyo": {
        name: "Tokyo, Japan",
        weather: "Clear, 12°C",
        events: [
            { name: "Cherry Blossom Festival", date: "2025-01-15", type: "cultural" },
            { name: "Robot Restaurant Show", date: "2025-01-16", type: "entertainment" },
            { name: "Tsukiji Fish Market Tour", date: "2025-01-17", type: "culinary" }
        ]
    },
    "new york": {
        name: "New York, USA",
        weather: "Cold, 5°C",
        events: [
            { name: "Broadway Show: Hamilton", date: "2025-01-15", type: "entertainment" },
            { name: "MoMA Special Exhibition", date: "2025-01-16", type: "cultural" },
            { name: "Central Park Winter Festival", date: "2025-01-17", type: "outdoor" }
        ]
    }
};

// Utility functions
function showModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function showLogin() {
    showModal('loginModal');
}

function showSignup() {
    showModal('signupModal');
}

function switchToSignup() {
    closeModal('loginModal');
    showModal('signupModal');
}

function switchToLogin() {
    closeModal('signupModal');
    showModal('loginModal');
}

function scrollToFeatures() {
    document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
}

function startJourney() {
    if (!currentUser) {
        showSignup();
    } else {
        showApp();
    }
}

// Authentication functions
function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Simulate login (in real app, this would be API call)
    currentUser = {
        email: email,
        name: email.split('@')[0]
    };
    
    closeModal('loginModal');
    showApp();
}

function handleSignup(event) {
    event.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    
    // Simulate signup (in real app, this would be API call)
    currentUser = {
        email: email,
        name: name
    };
    
    closeModal('signupModal');
    showApp();
}

// App navigation functions
function showApp() {
    document.getElementById('appContainer').style.display = 'block';
    document.querySelector('.hero').style.display = 'none';
    document.querySelector('.features').style.display = 'none';
    document.querySelector('.how-it-works').style.display = 'none';
    
    // Start with personality test
    showPersonalityTest();
}

function showPersonalityTest() {
    hideAllSections();
    document.getElementById('personalityTest').style.display = 'block';
    loadQuestion();
}

function showTravelHistory() {
    hideAllSections();
    document.getElementById('travelHistory').style.display = 'block';
}

function showDestinationSelection() {
    hideAllSections();
    document.getElementById('destinationSelection').style.display = 'block';
}

function showItinerary() {
    hideAllSections();
    document.getElementById('itineraryDisplay').style.display = 'block';
}

function hideAllSections() {
    const sections = document.querySelectorAll('.app-section');
    sections.forEach(section => section.style.display = 'none');
}

// Personality test functions
function loadQuestion() {
    const question = personalityQuestions[currentQuestionIndex];
    const container = document.getElementById('questionContainer');
    
    container.innerHTML = `
        <div class="question">
            <h3>${question.question}</h3>
            <div class="options">
                ${question.options.map((option, index) => `
                    <div class="option" onclick="selectOption(${index})" data-index="${index}">
                        ${option.text}
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    updateProgress();
    updateNavigationButtons();
}

function selectOption(optionIndex) {
    // Remove previous selection
    document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
    
    // Add selection to clicked option
    document.querySelector(`[data-index="${optionIndex}"]`).classList.add('selected');
    
    // Store answer
    const question = personalityQuestions[currentQuestionIndex];
    personalityAnswers[currentQuestionIndex] = {
        questionIndex: currentQuestionIndex,
        selectedOption: optionIndex,
        type: question.options[optionIndex].type
    };
    
    // Enable next button
    document.getElementById('nextBtn').disabled = false;
}

function nextQuestion() {
    if (currentQuestionIndex < personalityQuestions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        // Test completed
        calculatePersonalityResult();
        showTravelHistory();
    }
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
        
        // Restore previous selection if exists
        if (personalityAnswers[currentQuestionIndex]) {
            const selectedIndex = personalityAnswers[currentQuestionIndex].selectedOption;
            document.querySelector(`[data-index="${selectedIndex}"]`).classList.add('selected');
            document.getElementById('nextBtn').disabled = false;
        }
    }
}

function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / personalityQuestions.length) * 100;
    document.getElementById('progressFill').style.width = `${progress}%`;
    document.getElementById('progressText').textContent = `Question ${currentQuestionIndex + 1} of ${personalityQuestions.length}`;
}

function updateNavigationButtons() {
    document.getElementById('prevBtn').disabled = currentQuestionIndex === 0;
    document.getElementById('nextBtn').disabled = !personalityAnswers[currentQuestionIndex];
    
    if (currentQuestionIndex === personalityQuestions.length - 1) {
        document.getElementById('nextBtn').textContent = 'Complete Test';
    } else {
        document.getElementById('nextBtn').textContent = 'Next';
    }
}

function calculatePersonalityResult() {
    // Count personality types
    const typeCounts = {};
    personalityAnswers.forEach(answer => {
        const type = answer.type;
        typeCounts[type] = (typeCounts[type] || 0) + 1;
    });
    
    // Find dominant type
    const dominantType = Object.keys(typeCounts).reduce((a, b) => 
        typeCounts[a] > typeCounts[b] ? a : b
    );
    
    // Define personality profiles
    const profiles = {
        planner: "The Organized Explorer - You love detailed itineraries and well-planned adventures",
        spontaneous: "The Free Spirit - You thrive on unexpected discoveries and last-minute decisions",
        luxury: "The Comfort Seeker - You appreciate the finer things and premium experiences",
        culture: "The Cultural Enthusiast - You're drawn to history, art, and local traditions",
        adventure: "The Thrill Seeker - You crave excitement and physical challenges",
        social: "The People Connector - You love meeting new people and sharing experiences",
        relaxed: "The Zen Traveler - You prefer slow travel and peaceful experiences",
        authentic: "The Local Experience Seeker - You want to live like a local wherever you go"
    };
    
    personalityResult = {
        type: dominantType,
        description: profiles[dominantType] || "The Unique Explorer - You have a distinctive travel style",
        traits: typeCounts
    };
}

// Travel history functions
function saveHistory() {
    travelHistory = {
        frequency: document.getElementById('travelFrequency').value,
        accommodations: Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value),
        budget: document.getElementById('budgetRange').value,
        lovedDestinations: document.getElementById('lovedDestinations').value
    };
    
    showDestinationSelection();
}

// Destination and itinerary functions
function generateItinerary() {
    destinationData = {
        destination: document.getElementById('destination').value,
        startDate: document.getElementById('startDate').value,
        endDate: document.getElementById('endDate').value,
        travelers: document.getElementById('travelers').value
    };
    
    // Generate AI-powered itinerary based on personality and preferences
    const itinerary = createPersonalizedItinerary();
    displayItinerary(itinerary);
    showItinerary();
}

function createPersonalizedItinerary() {
    const destination = destinationData.destination.toLowerCase();
    const startDate = new Date(destinationData.startDate);
    const endDate = new Date(destinationData.endDate);
    const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
    
    // Get destination info (in real app, this would be API calls)
    const destInfo = sampleDestinations[destination] || {
        name: destinationData.destination,
        weather: "Pleasant, 20°C",
        events: []
    };
    
    // Generate activities based on personality
    const activities = generateActivitiesForPersonality(personalityResult.type, destInfo);
    
    // Create day-by-day itinerary
    const itinerary = {
        destination: destInfo.name,
        dates: `${formatDate(startDate)} - ${formatDate(endDate)}`,
        travelers: destinationData.travelers,
        personalityType: personalityResult.description,
        days: []
    };
    
    for (let i = 0; i < days; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);
        
        itinerary.days.push({
            day: i + 1,
            date: formatDate(currentDate),
            weather: destInfo.weather,
            activities: activities[i % activities.length] || activities[0]
        });
    }
    
    return itinerary;
}

function generateActivitiesForPersonality(personalityType, destInfo) {
    const baseActivities = {
        culture: [
            [
                { time: "9:00 AM", title: "Museum Visit", description: "Explore the local history museum" },
                { time: "1:00 PM", title: "Traditional Lunch", description: "Try authentic local cuisine" },
                { time: "3:00 PM", title: "Historical Walking Tour", description: "Guided tour of historic district" },
                { time: "7:00 PM", title: "Cultural Performance", description: "Traditional music and dance show" }
            ]
        ],
        adventure: [
            [
                { time: "7:00 AM", title: "Hiking Adventure", description: "Early morning hike to scenic viewpoint" },
                { time: "12:00 PM", title: "Adventure Lunch", description: "Picnic with a view" },
                { time: "2:00 PM", title: "Water Sports", description: "Kayaking or rafting experience" },
                { time: "6:00 PM", title: "Sunset Photography", description: "Capture the perfect sunset shot" }
            ]
        ],
        luxury: [
            [
                { time: "10:00 AM", title: "Spa Treatment", description: "Relaxing massage and wellness session" },
                { time: "1:00 PM", title: "Fine Dining", description: "Michelin-starred restaurant experience" },
                { time: "4:00 PM", title: "Private Shopping", description: "Personal shopping with local guide" },
                { time: "8:00 PM", title: "Rooftop Cocktails", description: "Premium drinks with city views" }
            ]
        ],
        social: [
            [
                { time: "10:00 AM", title: "Local Market Tour", description: "Meet vendors and try local foods" },
                { time: "1:00 PM", title: "Cooking Class", description: "Learn to cook with locals" },
                { time: "4:00 PM", title: "Community Visit", description: "Visit local community center" },
                { time: "7:00 PM", title: "Group Dinner", description: "Shared meal with other travelers" }
            ]
        ]
    };
    
    // Default activities if personality type not found
    const defaultActivities = [
        [
            { time: "9:00 AM", title: "City Exploration", description: "Discover the main attractions" },
            { time: "1:00 PM", title: "Local Lunch", description: "Try recommended local restaurant" },
            { time: "3:00 PM", title: "Afternoon Activity", description: "Based on your interests" },
            { time: "7:00 PM", title: "Evening Entertainment", description: "Local nightlife or cultural event" }
        ]
    ];
    
    return baseActivities[personalityType] || defaultActivities;
}

function displayItinerary(itinerary) {
    const container = document.getElementById('itineraryContent');
    
    container.innerHTML = `
        <div class="itinerary-summary" style="padding: 2rem; background: #f8fafc; border-bottom: 1px solid #e5e7eb;">
            <h3 style="color: #1f2937; margin-bottom: 1rem;">Trip to ${itinerary.destination}</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1rem;">
                <div><strong>Dates:</strong> ${itinerary.dates}</div>
                <div><strong>Travelers:</strong> ${itinerary.travelers}</div>
                <div><strong>Your Style:</strong> ${itinerary.personalityType}</div>
            </div>
        </div>
        ${itinerary.days.map(day => `
            <div class="day-card">
                <div class="day-header">
                    <h3 class="day-title">Day ${day.day} - ${day.date}</h3>
                    <div class="weather-info">
                        <i class="fas fa-cloud-sun"></i>
                        <span>${day.weather}</span>
                    </div>
                </div>
                <div class="activities">
                    ${day.activities.map(activity => `
                        <div class="activity">
                            <div class="activity-time">${activity.time}</div>
                            <div class="activity-details">
                                <h4>${activity.title}</h4>
                                <p>${activity.description}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('')}
    `;
}

// Itinerary action functions
function downloadItinerary() {
    // Create downloadable content
    const itineraryText = generateItineraryText();
    const blob = new Blob([itineraryText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${destinationData.destination}-itinerary.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('Itinerary downloaded successfully!');
}

function shareItinerary() {
    if (navigator.share) {
        navigator.share({
            title: `My ${destinationData.destination} Trip Itinerary`,
            text: 'Check out my personalized travel itinerary created by TravelMind AI!',
            url: window.location.href
        });
    } else {
        // Fallback: copy to clipboard
        const itineraryText = generateItineraryText();
        navigator.clipboard.writeText(itineraryText).then(() => {
            showNotification('Itinerary copied to clipboard!');
        });
    }
}

function saveItinerary() {
    // Save to localStorage (in real app, this would be saved to user account)
    const savedItineraries = JSON.parse(localStorage.getItem('savedItineraries') || '[]');
    const newItinerary = {
        id: Date.now(),
        destination: destinationData.destination,
        dates: destinationData.startDate + ' to ' + destinationData.endDate,
        createdAt: new Date().toISOString(),
        personalityType: personalityResult.type
    };
    
    savedItineraries.push(newItinerary);
    localStorage.setItem('savedItineraries', JSON.stringify(savedItineraries));
    
    showNotification('Itinerary saved to your account!');
}

// Utility functions
function formatDate(date) {
    return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

function generateItineraryText() {
    const container = document.getElementById('itineraryContent');
    return container.innerText || container.textContent;
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
        style.remove();
    }, 3000);
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for navigation links
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
    
    // Set minimum date for date inputs to today
    const today = new Date().toISOString().split('T')[0];
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');
    
    if (startDateInput) startDateInput.min = today;
    if (endDateInput) endDateInput.min = today;
    
    // Update end date minimum when start date changes
    if (startDateInput && endDateInput) {
        startDateInput.addEventListener('change', function() {
            endDateInput.min = this.value;
            if (endDateInput.value && endDateInput.value < this.value) {
                endDateInput.value = this.value;
            }
        });
    }
});

// Initialize app
console.log('TravelMind AI Travel Itinerary Personality Matcher loaded successfully!');