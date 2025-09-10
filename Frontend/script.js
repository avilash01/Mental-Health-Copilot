// DOM Elements
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const dashboard = document.getElementById('dashboard');
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const companionQuery = document.getElementById('companion-query');

// Sample responses for the chatbot
const botResponses = {
    greeting: ["Hello! How are you feeling today?", "Hi there! What's on your mind?", "Hello! I'm here to listen. How are you doing?"],
    stress: ["I'm sorry to hear you're feeling stressed. Have you tried deep breathing exercises?", "Stress can be challenging. Would you like to try a quick mindfulness exercise?", "I understand stress can be difficult. Remember to take breaks and be kind to yourself."],
    sad: ["I'm here for you. It's okay to feel sad sometimes. Would talking about it help?", "I'm sorry you're feeling down. Remember that feelings are temporary, and it's okay to not be okay.", "Would you like to try a grounding exercise to help with these feelings?"],
    anxious: ["Anxiety can be tough. Let's try a quick breathing exercise together.", "I understand anxiety can be overwhelming. Would you like me to guide you through a relaxation technique?", "When feeling anxious, sometimes focusing on your senses can help. Would you like to try a 5-4-3-2-1 exercise?"],
    default: ["I'm here to listen. Can you tell me more about how you're feeling?", "Thank you for sharing. How has that been affecting you?", "I appreciate you opening up. Would you like to try a coping strategy that might help?"]
};

// Modal functions
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function switchAuthModal(fromId, toId) {
    closeModal(fromId);
    openModal(toId);
}

// Auth functions
function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    if (!email || !password) {
        alert('Please enter both email and password');
        return;
    }
    
    // Simulate login process
    document.getElementById('user-name').textContent = email.split('@')[0];
    closeModal('loginModal');
    showDashboard();
}

function register() {
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    
    if (!name || !email || !password) {
        alert('Please fill all fields');
        return;
    }
    
    // Simulate registration process
    document.getElementById('user-name').textContent = name;
    closeModal('registerModal');
    showDashboard();
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    window.location.href = 'auth.html';
}

function showDashboard() {
    document.querySelector('header').style.display = 'none';
    document.querySelector('.hero').style.display = 'none';
    document.querySelector('.ai-companion').style.display = 'none';
    document.querySelector('.features').style.display = 'none';
    document.querySelector('footer').style.display = 'none';
    dashboard.style.display = 'block';
}

// Mood journal functions
function selectMood(element, moodValue) {
    // Remove selected class from all options
    const options = document.querySelectorAll('.mood-option');
    options.forEach(opt => opt.classList.remove('selected'));
    
    // Add selected class to clicked option
    element.classList.add('selected');
}

function saveJournalEntry() {
    const selectedMood = document.querySelector('.mood-option.selected');
    const journalText = document.querySelector('.journal-textarea').value;
    
    if (!selectedMood) {
        alert('Please select a mood first');
        return;
    }
    
    // Simulate saving entry
    alert('Journal entry saved successfully!');
    document.querySelector('.journal-textarea').value = '';
    selectedMood.classList.remove('selected');
}

// Exercise functions
function startExercise(type) {
    const exercises = {
        breathing: 'Deep Breathing Exercise: Inhale for 4 counts, hold for 4, exhale for 6. Repeat for 5 minutes.',
        mindfulness: 'Mindfulness Meditation: Focus on your breath and observe your thoughts without judgment for 10 minutes.',
        grounding: '5-4-3-2-1 Grounding: Notice 5 things you see, 4 things you feel, 3 things you hear, 2 things you smell, and 1 thing you taste.'
    };
    
    alert(Starting ${type} exercise:\n\n${exercises[type]});
}

function showTherapistReferral() {
    alert('Therapist referral feature would connect you with licensed mental health professionals in your area.');
}

// Chatbot functions
function sendMessage() {
    const message = userInput.value.trim();
    if (message === '') return;
    
    // Add user message to chat
    addMessage(message, 'user');
    userInput.value = '';
    
    // Simulate AI thinking
    setTimeout(() => {
        // Generate bot response based on user input
        let response;
        if (message.toLowerCase().includes('stress') || message.toLowerCase().includes('stressed')) {
            response = getRandomResponse(botResponses.stress);
        } else if (message.toLowerCase().includes('sad') || message.toLowerCase().includes('down') || message.toLowerCase().includes('depress')) {
            response = getRandomResponse(botResponses.sad);
        } else if (message.toLowerCase().includes('anxious') || message.toLowerCase().includes('anxiety') || message.toLowerCase().includes('worry')) {
            response = getRandomResponse(botResponses.anxious);
        } else if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi') || message.toLowerCase().includes('hey')) {
            response = getRandomResponse(botResponses.greeting);
        } else {
            response = getRandomResponse(botResponses.default);
        }
        
        addMessage(response, 'bot');
    }, 1000);
}

function addMessage(text, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(sender + '-message');
    messageElement.textContent = text;
    
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// AI Companion functions
function usePrompt(prompt) {
    companionQuery.value = prompt;
}

function sendCompanionQuery() {
    const query = companionQuery.value.trim();
    if (query === '') return;
    
    // Show loading state
    companionQuery.value = 'Thinking...';
    companionQuery.disabled = true;
    
    // Simulate AI processing
    setTimeout(() => {
        companionQuery.disabled = false;
        companionQuery.value = '';
        
        // Show response based on query
        let response;
        if (query.includes('anxious')) {
            response = "I understand anxiety can be challenging. Have you tried the 4-7-8 breathing technique? Inhale for 4 seconds, hold for 7, exhale for 8. Repeat 4 times. This can help calm your nervous system.";
        } else if (query.includes('breathing')) {
            response = "I recommend the box breathing technique: Inhale for 4 counts, hold for 4, exhale for 4, hold for 4. Repeat 4-5 times. This is great for reducing stress and improving focus.";
        } else if (query.includes('mood')) {
            response = "To track your mood, you can use our mood journal feature. Simply select an emoji that represents how you're feeling and add any notes about what's affecting your mood. Over time, you'll see patterns in your mood fluctuations.";
        } else if (query.includes('resources')) {
            response = "I can suggest several mental health resources: 1) Mindfulness apps like Headspace or Calm, 2) Online therapy platforms like BetterHelp or Talkspace, 3) Mental health hotlines for immediate support. Would you like more information about any of these?";
        } else {
            response = "I'm here to support your mental health journey. You can ask me about coping strategies, mood tracking, breathing exercises, or mental health resources. How can I help you today?";
        }
        
        // Show response in an alert (in a real app, this would be displayed in the UI)
        alert("MindfulMate AI Response:\n\n" + response);
    }, 1500);
}

function handleCompanionKeyPress(event) {
    if (event.key === 'Enter') {
        sendCompanionQuery();
    }
}

function scrollToFeatures() {
    document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
}

function scrollToCompanion() {
    document.getElementById('companion').scrollIntoView({ behavior: 'smooth' });
}

// Close modal if clicked outside
window.onclick = function(event) {
    if (event.target === loginModal) {
        closeModal('loginModal');
    }
    if (event.target === registerModal) {
        closeModal('registerModal');
    }
};

// Check authentication on page load
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
        if (!localStorage.getItem('isLoggedIn')) {
            window.location.href = 'auth.html';
        } else {
            const userEmail = localStorage.getItem('userEmail');
            if (userEmail) {
                const userName = userEmail.split('@')[0];
                document.getElementById('user-name').textContent = userName;
                document.getElementById('header-user-name').textContent = userName;
            }
        }
    }
});