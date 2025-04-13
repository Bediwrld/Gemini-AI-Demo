const API_KEY = 'AIzaSyB8CR8XdP9Rf1JM_pfAOgDvCVeSNbUJ54s'; 
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

const phaseOne = document.querySelector('.lebron-james-js');
const suggestion = document.querySelectorAll('.suggestion');
const phaseTwo = document.querySelector('.micheal-jordan-js');

const userInput = document.querySelector('.prompt-input');
const displayInput = document.querySelector('.user-input-js');
const layoutConversation = document.querySelector('.conversation-js'); 
const apiResponse = document.querySelector('.api-response-js');

// Function to send API request and update response div
async function fetchAIResponse(userText) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: userText }] }] // Correct request format for Gemini
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        
        // Extract AI response (Gemini returns response in 'candidates' array)
        const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response received.";
        apiResponse.textContent = aiText; // ✅ Display AI response

    } catch (error) {
        apiResponse.textContent = "Error fetching response. Check API key or network.";
        console.error("API Error:", error);
    }
}

// Function to show conversation and handle API request
function showConversation(userText) {
    if (phaseOne) {
        phaseOne.style.display = 'none';
        phaseTwo.classList.add('micheal-jordan');
        phaseTwo.style.display = 'flex';
    }

    if (phaseTwo) {
        layoutConversation.classList.add('conversation');
        displayInput.classList.add('user-input');
        displayInput.textContent = userText;
        apiResponse.classList.add('api-response');

        // Fetch and display AI response
        fetchAIResponse(userText);
    }
}

// Event listener for clicking a suggestion
suggestion.forEach(suggestionElement => {
    suggestionElement.addEventListener('click', function () {
        const clickedText = suggestionElement.querySelector('.suggestion-js').textContent;
        showConversation(clickedText);
    });
});

// Event listener for pressing Enter
userInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' && userInput.value.trim() !== "") {
        const userText = userInput.value.trim();
        userInput.value = "";  // Clear input
        showConversation(userText);
    }
});
