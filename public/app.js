// Neuro Real Estate Agent JavaScript functions

// DOM elements
const chatContainer = document.getElementById('chatContainer');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');
const chatToggle = document.getElementById('chatToggle');
const closeChat = document.getElementById('closeChat');
const fsboForm = document.querySelector('.fsbo-form');
const annualIncome = document.getElementById('annualIncome');
const monthlyDebts = document.getElementById('monthlyDebts');
const downPayment = document.getElementById('downPayment');
const downPaymentType = document.getElementById('downPaymentType');
const interestRate = document.getElementById('interestRate');
const loanTerm = document.getElementById('loanTerm');
const affordabilityResult = document.getElementById('affordabilityResult');

// Toggle chat visibility
function toggleChat() {
    chatContainer.classList.toggle('active');
}

// Event to close chat when X is clicked
if (closeChat) {
    closeChat.addEventListener('click', () => {
        chatContainer.classList.remove('active');
    });
}

// Toggle chat with floating button
if (chatToggle) {
    chatToggle.addEventListener('click', toggleChat);
}

// Add message to chat
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(`${sender}-message`);
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Send message function
function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;
    // display user message
    addMessage(message, 'user');
    chatInput.value = '';
    setTimeout(() => {
        processUserMessage(message);
    }, 500);
}

// Process user message and respond
function processUserMessage(message) {
    const lower = message.toLowerCase();
    if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
        addMessage("Hi there! \ud83d\udc4b I'm your Neuro AI Real Estate Assistant for Philadelphia homes. I can connect you with top agents, calculate your affordability, help with FSBO listings, and get you pre-approved. How can I help you today?", 'bot');
    } else if (lower.includes('help')) {
        addMessage("I can help you with: \n\n\u2022 Connect you with top real estate agents in Philadelphia\n\u2022 Calculate how much home you can afford\n\u2022 Get pre-approved with multiple lenders\n\u2022 List your property as FSBO\n\u2022 Direct contact with sellers and buyers\n\u2022 MLS property updates\n\nJust tell me what you need!", 'bot');
    } else if (lower.includes('agent') || lower.includes('representative') || lower.includes('realtor')) {
        addMessage("I'll connect you with the best real estate agent for your needs! Are you looking to buy or sell? What neighborhood are you interested in? Tell me about your ideal home and I'll match you with the perfect agent.", 'bot');
    } else if (lower.includes('afford') || lower.includes('how much') || lower.includes('budget')) {
        addMessage("Let's see how much home you can afford! I'll need:\n\n1. Your annual gross income\n2. Your monthly debt payments\n3. Your desired down payment\n4. Estimated interest rate\n\nWould you like me to walk you through the calculation now? Or would you prefer to fill out the form on the page?", 'bot');
    } else if (lower.includes('pre-approv') || lower.includes('preapproval')) {
        addMessage("I can help you get pre-approved! We have partnerships with multiple lenders in Philadelphia offering competitive rates. To start, I'll need:\n\n\u2022 Your credit score range\n\u2022 Employment information\n\u2022 Down payment amount\n\u2022 Desired loan term\n\nWould you like me to initiate the pre-approval process for you?", 'bot');
    } else if (lower.includes('fsbo') || lower.includes('for sale by owner') || lower.includes('sell myself')) {
        addMessage("Great! Selling your home without an agent saves you commission fees. I'll help you create a professional listing that gets seen by thousands of buyers through our MLS integration. Would you like to submit your FSBO listing now? I can guide you through it step-by-step.", 'bot');
    } else if (lower.includes('direct contact') || lower.includes('talk to seller') || lower.includes('talk to buyer')) {
        addMessage("Yes! Our platform enables direct communication between buyers and sellers. When you find a property you're interested in, you can request direct contact with the seller or their representative. We ensure privacy and security while facilitating smooth communication.", 'bot');
    } else if (lower.includes('lender') || lower.includes('mortgage') || lower.includes('financing')) {
        addMessage("We work with over 20 lenders and brokerages in Philadelphia to give you the best options. Whether you need conventional, FHA, VA, or jumbo loans, we can match you with the best lender based on your credit profile and goals. Would you like to compare current rates?", 'bot');
    } else if (lower.includes('thank')) {
        addMessage("You're welcome! Let me know if you need anything else. I'm here to make your home buying or selling experience seamless and stress-free. \ud83d\ude0a", 'bot');
    } else if (lower.includes('yes') && (lower.includes('want') || lower.includes('need'))) {
        addMessage("Great! Could you please provide your full name, email address, and phone number so I can get everything started for you? I'll also need to know if you're buying or selling and your preferred neighborhood.", 'bot');
    } else if (lower.includes('name') || lower.includes('email') || lower.includes('phone')) {
        addMessage("I'm collecting your information to connect you with the best services. Could you please provide:\n\n1. Full name\n2. Email address\n3. Phone number\n4. Are you buying or selling?\n5. Preferred neighborhood in Philadelphia\n\nI'll use this to generate personalized recommendations and next steps.", 'bot');
    } else if (lower.includes('property') || lower.includes('house') || lower.includes('home')) {
        addMessage("I'd love to help you find your perfect Philadelphia home! To get started, could you tell me:\n\n- Are you buying or selling?\n- Your ideal neighborhood?\n- Price range?\n- Number of bedrooms/bathrooms?\n- Any special features you want (garden, garage, modern kitchen, etc.)?\n\nI'll pull current MLS listings and match you with the best options!", 'bot');
    } else if (lower.includes('document') || lower.includes('paperwork') || lower.includes('forms')) {
        addMessage("Don't worry about paperwork! As your Neuro AI assistant, I'll automatically collect all your information and generate:\n\n\u2022 Pre-qualification letter\n\u2022 Financial summary\n\u2022 Property comparison reports\n\u2022 Purchase agreement drafts\n\nJust answer a few questions, and I'll handle the rest. You'll receive everything via email and can sign electronically!", 'bot');
    } else if (lower.includes('bye') || lower.includes('goodbye')) {
        addMessage("Thank you for chatting with Neuro AI Real Estate Assistant! If you need help finding your Philadelphia home, just reach out anytime. Have a wonderful day! \ud83c\udfe1", 'bot');
    } else {
        addMessage("I'm your Neuro AI Real Estate Assistant specialized in Philadelphia homes. I can connect you with top agents, calculate affordability, help with FSBO listings, and get you pre-approved. How can I assist you today?", 'bot');
    }
}

// Attach event listeners for sending messages
if (sendBtn) {
    sendBtn.addEventListener('click', sendMessage);
}
if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

// FSBO form submission handling
if (fsboForm) {
    fsboForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const data = {
            name: formData.get('fsboName'),
            email: formData.get('fsboEmail'),
            phone: formData.get('fsboPhone'),
            address: formData.get('fsboAddress'),
            price: formData.get('fsboPrice'),
            beds: formData.get('fsboBeds'),
            baths: formData.get('fsboBaths'),
            description: formData.get('fsboDescription'),
        };
        alert(`Thank you, ${data.name}! Your FSBO listing has been submitted successfully.\n\nProperty: ${data.address}\nPrice: $${data.price}\n\nYour listing will be active within 24 hours and will appear on all major Philadelphia real estate platforms.`);
        this.reset();
    });
}

// Calculate affordability function
function calculateAffordability() {
    const income = parseFloat(annualIncome?.value) || 100000;
    const debts = parseFloat(monthlyDebts?.value) || 1500;
    const interest = parseFloat(interestRate?.value) || 6.5;
    const term = parseInt(loanTerm?.value) || 30;
    let downAmount;
    if (downPaymentType?.value === 'percent') {
        downAmount = ((parseFloat(downPayment?.value) || 20) / 100);
    } else {
        downAmount = parseFloat(downPayment?.value) || 50000;
    }
    const maxMonthly = (income / 12) * 0.28;
    const monthlyInterestRate = interest / 100 / 12;
    const numberOfPayments = term * 12;
    const denominator = Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1;
    const numerator = monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments);
    const maxLoan = maxMonthly / (numerator / denominator);
    let maxHomePrice;
    if (downPaymentType?.value === 'percent') {
        maxHomePrice = maxLoan / (1 - downAmount);
    } else {
        maxHomePrice = maxLoan + downAmount;
    }
    const dti = (debts / (income / 12)) * 100;
    if (affordabilityResult) {
        affordabilityResult.textContent = '$' + (Math.round(maxHomePrice / 1000) * 1000).toLocaleString();
    }
    addMessage(`Based on your inputs:\n\n- Annual income: $${income.toLocaleString()}\n- Monthly debts: $${debts.toLocaleString()}\n- DTI ratio: ${dti.toFixed(1)}%\n- Interest rate: ${interest}%\n- Loan term: ${term} years\n\nYou can afford a home priced around ${affordabilityResult?.textContent}. This assumes a 28% housing expense to income ratio and a 36% total debt-to-income ratio, which are industry standards for mortgage approval.`, 'bot');
}

// Attach change event listeners to recalculate affordability
if (annualIncome) annualIncome.addEventListener('change', calculateAffordability);
if (monthlyDebts) monthlyDebts.addEventListener('change', calculateAffordability);
if (downPayment) downPayment.addEventListener('change', calculateAffordability);
if (downPaymentType) downPaymentType.addEventListener('change', calculateAffordability);
if (interestRate) interestRate.addEventListener('change', calculateAffordability);
if (loanTerm) loanTerm.addEventListener('change', calculateAffordability);

// Perform initial calculation on page load
if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
        calculateAffordability();
    });
}
