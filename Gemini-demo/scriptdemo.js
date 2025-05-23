// const inputPrompt = document.querySelector('.demo-input-js');
// const apiResponse = document.querySelector('.api-response');

// function responseToPrompt(event){
//   if(event.key === 'Enter'){
//     apiResponse.textContent = inputPrompt.value;
//   }
// }

// document.addEventListener("DOMContentLoaded", function() {
//   const userInputElement = document.getElementById("user-input");
//   const submitButtonElement = document.getElementById("submit-button");
//   const apiResponseElement = document.getElementById("api-response");

//   submitButtonElement.addEventListener("click", function() {
//     const userPrompt = userInputElement.value;

//     if (userPrompt.trim() === "") {
//       alert("Please enter a prompt.");
//       return;
//     }

//     // Call the API
//     getApiResponse(userPrompt)
//       .then(response => {
//         apiResponseElement.textContent = response; // Update the display
//       })
//       .catch(error => {
//         console.error("Error:", error);
//         apiResponseElement.textContent = "An error occurred while fetching the response."; // Error handling
//       });

//     // Clear the input field (optional)
//     userInputElement.value = "";
//   });

//   async function getApiResponse(prompt) {
//     const apiKey = "AIzaSyB8CR8XdP9Rf1JM_pfAOgDvCVeSNbUJ54s"; // Replace with your actual API key
//     const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

//     try {
//       const response = await fetch(apiUrl, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"  // IMPORTANT: Explicitly set the content type
//         },
//         body: JSON.stringify({
//             contents: [{
//                 parts: [{ text: prompt }] //Structure according to Google's Docs. Check it!
//             }]
//         })
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       // Adapt based on the real response structure
//       return data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

//     } catch (error) {
//       console.error("Error fetching data:", error);
//       throw error; // Re-throw the error to be caught by the caller
//     }
//   }
// });






// const phaseOne = document.querySelector('.lebron-james-js');
// const suggestion = document.querySelectorAll('.suggestion');
// const phaseTwo = document.querySelector('.micheal-jordan-js');

// const userInput = document.querySelector('.prompt-input');
// const displayInput = document.querySelector('.user-input-js');
// const layoutConversation = document.querySelector('.conversation-js');
// const apiResponse = document.querySelector('.api-response-js');
// const submitButton = document.querySelector("#submit-button");

// function showPhaseTwoAndConversation(userText) {
//     if (phaseOne) {
//         phaseOne.style.display = 'none';
//         phaseTwo.style.display = 'flex';
//     }

//     if (phaseTwo) {
//         layoutConversation.style.display = 'block'; //Make the conversation layout visible
//         displayInput.textContent = userText;
//         apiResponse.textContent = "Loading...";  // Initial loading message
//     }
// }


// async function getApiResponse(prompt) {
//     const apiKey = "AIzaSyB8CR8XdP9Rf1JM_pfAOgDvCVeSNbUJ54s"; 
//     const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

//     try {
//         const response = await fetch(apiUrl, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 contents: [{
//                     parts: [{ text: prompt }]
//                 }]
//             })
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         // Adapt based on the real response structure
//         return data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

//     } catch (error) {
//         console.error("Error fetching data:", error);
//         throw error;
//     }
// }

// function updateApiResponse(response) {
//     apiResponse.textContent = response;
// }


// function processPrompt(prompt) {
//         showPhaseTwoAndConversation(prompt);

//         getApiResponse(prompt)
//             .then(response => {
//                 updateApiResponse(response); 
//             })
//             .catch(error => {
//                 console.error("Error:", error);
//                 updateApiResponse("An error occurred while fetching the response.");
//             });

//         userInput.value = "";
// }

// document.addEventListener("DOMContentLoaded", function () {
//     //Attach event listener for suggestion click
//     suggestion.forEach(suggestionElement => {
//         suggestionElement.addEventListener('click', () => {
//             const clickedText = suggestionElement.querySelector('.suggestion-js').textContent;
//             processPrompt(clickedText);
//         });
//     });

//     // Attach event listener for 'Enter' key press
//     userInput.addEventListener("keydown", function (event) {
//         if (event.key === 'Enter' && userInput.value.trim() !== "") {
//             processPrompt(userInput.value.trim());
//             event.preventDefault(); //Prevent the default action (form submission) which can interfere with the process.
//         }
//     });


//     submitButton.addEventListener("click", function () {
//         if (userInput.value.trim() !== "") {
//             processPrompt(userInput.value.trim());
//         }
//     });
// });



















const API_KEY = 'AIzaSyB8CR8XdP9Rf1JM_pfAOgDvCVeSNbUJ54s'; 
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

const phaseOne = document.querySelector('.lebron-james-js');
const suggestion = document.querySelectorAll('.suggestion');
const phaseTwo = document.querySelector('.micheal-jordan-js');

const userInput = document.querySelector('.prompt-input');
const userInputSection  = document.querySelector('.prompt-input-section') 
const displayInput = document.querySelector('.user-input-js');
const layoutConversation = document.querySelector('.conversation-js');
const apiResponseContainer = document.querySelector('.api-response-js'); 
const geminiText = document.querySelector('.gemini-text');
const promptInputDebugging = document.querySelector('.prompt-input-phaseDebugging');

let promptHistory = []; // Store conversation history
let currentSession = 0;
let chatMessages = JSON.parse(localStorage.getItem('chatMessages')) || []; // Load from localStorage



function debuggingPromptInput() {
    promptInputDebugging.classList.add('stateOne');

    if(!promptInputDebugging.classList.contains('stateOne')){
        promptInputDebugging.classList.add('stateTwo');
        console.log( promptInputDebugging);
    }
    if(promptInputDebugging.classList.contains('stateTwo')){
        userInput.style.backgroundColor = 'red';
    }
  
};
debuggingPromptInput();

if (localStorage.getItem('aiResponse')) {
    console.log(localStorage.getItem('aiResponse'));
}

geminiText.addEventListener('click', function () {
    resetToPhaseOne();
    promptHistory = [];
    chatMessages = [];
    localStorage.removeItem('aiResponse');
    localStorage.removeItem('chatMessages');

    if (!localStorage.getItem('aiResponse')) {
        console.log('working');
    }
});

function resetToPhaseOne() {
    if (phaseTwo) {
        phaseOne.style.display = '';
        currentSession++;
        phaseTwo.classList.remove('micheal-jordan');
        phaseTwo.style.display = 'none';
        //added the last 

        if (!phaseOne.contains(userInputSection)) {
            phaseOne.appendChild(userInputSection);
        }

        layoutConversation.innerHTML = '';
        userInput.value = '';
        history.pushState({ phase: 'phaseOne' }, '', '#phaseOne'); 
    }
}

async function fetchAIResponse(userText, isSuggestionClick = false) {
    const sessionIdAtCallTime = currentSession;

    try {
        let maxTokens = 1000;
        let briefInstruction = "Give a brief, direct answer in 2-3 sentences maximum.";

        const detailedKeywords = [
            "explain in detail", "in detail", "summarize in detail", "elaborate",
            "tell me more", "detailed response", "comprehensive", "can you make it longer",
            "go deeper", "expand", "more thorough", "add more"
        ];

        const wantsDetailed = detailedKeywords.some(keyword =>
            userText.toLowerCase().includes(keyword)
        );

        if (wantsDetailed) {
            maxTokens = 3000;
            briefInstruction = "Write a detailed answer in 250-500 words.";
        }

        if(isSuggestionClick){
            maxTokens = Math.random() > 0.5 ? 750 :  1500; // Randomly choose between 750 and 1500 tokens for suggestions
            // briefInstruction = "Provide a concise response in 1-2 sentences.";
            console.log(maxTokens);

        }
       
        chatMessages.push({ role: 'user', content: userText });

        // Limit history to 12 most recent entries
        const trimmedMessages = chatMessages.slice(-12);

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: trimmedMessages.map(m => ({
                    role: m.role,
                    parts: [{ text: m.content }]
                })),
                generationConfig: {
                    maxOutputTokens: maxTokens,
                    temperature: 0.4
                }
            })
        });

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response received.";

        if (sessionIdAtCallTime !== currentSession) {
            console.warn("Stale response discarded due to session reset.");
            return;
        }

        appendMessage("ai", aiText);
        localStorage.setItem('aiResponse', aiText); // Last AI response
        localStorage.setItem('chatMessages', JSON.stringify(chatMessages)); // Full conversation

        chatMessages.push({ role: 'model', content: aiText });
        promptHistory.push({ prompt: userText, response: aiText });
        console.log(promptHistory);

        console.log(aiText);
    } catch (error) {
        if (sessionIdAtCallTime === currentSession) {
            appendMessage("ai", "Error fetching response. Check API key or network.");
        }
        console.error("API Error:", error);
    }
}




// Function to append messages dynamically
function appendMessage(sender, text) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add(sender === "user" ? "user-message" : "ai-message"); 

  if (sender === "ai") {
      typeText(messageDiv, text); // Use typing animation for AI response
  } else {
      messageDiv.textContent = text; // Instantly show user message
  }

  layoutConversation.appendChild(messageDiv);
  layoutConversation.scrollTop = layoutConversation.scrollHeight;
}

//function to display the text with an animation that types it out in real time
function typeText(element,text,speed = 15){
    let index = 0;
    function type(){
        if(index < text.length){
            element.textContent += text[index];
            index++;
            setTimeout(type,speed);
        }
    }
    type();
}




// Function to show phaseTwo and allow continuous conversation
function showConversation(userText, isSuggestionClick = false) {
  if (phaseOne) {
      phaseOne.style.display = 'none';
      phaseTwo.classList.add('micheal-jordan');
      phaseTwo.style.display = 'flex';

      // Move input section inside phaseTwo dynamically
      if (!phaseTwo.contains(userInputSection)) {
          phaseTwo.appendChild(userInputSection);
          debuggingPromptInput();
      }

      userInputSection.style.display = 'flex'; // Make sure it's visible
  }

  appendMessage("user", userText);
  fetchAIResponse(userText,isSuggestionClick);
  history.pushState({ phase: 'phaseTwo' }, '', '#phaseTwo'); //change URL hash
}


// Event listener for clicking a suggestion
suggestion.forEach(suggestionElement => {
    suggestionElement.addEventListener('click', function () {
        const clickedText = suggestionElement.querySelector('.suggestion-js').textContent;
        showConversation(clickedText, true);
    });
});



// Event listener for pressing Enter
userInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' && userInput.value.trim() !== "") {
        const userText = userInput.value.trim();
        userInput.value = "";  // Clear input after sending
        showConversation(userText);
    }
});
 

const changePfp = document.querySelector('.change-pfp-js');
const changePfpText = document.querySelector('.changePfp-text');
const imageInput = document.getElementById('profilePicInput');
const profilePic = document.querySelector('.profile-picture');
const body = document.body;

// Hide the file input initially
imageInput.style.display = 'none';

// Show/Hide the Change PFP popup
function toggleChangePfp() {
    if (!changePfp.classList.contains('change-pfp')) {
        changePfp.classList.add('change-pfp');
        body.classList.add('blurred-background');
        changePfpText.innerHTML = 'Change profile picture';
        imageInput.style.display = 'block';
    } else {
        changePfp.classList.remove('change-pfp');
        body.classList.remove('blurred-background');
        changePfpText.innerHTML = '';
        imageInput.style.display = 'none';
    }
}

// Open popup section when clicking the profile picture
profilePic.addEventListener('click', toggleChangePfp);

// Handle file selection and update profile picture
imageInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            profilePic.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
    toggleChangePfp(); // Close popup after selecting an image
});


// Close popup when clicking outside
document.addEventListener('click', function(event) {
    if (!changePfp.contains(event.target) && event.target !== profilePic) {
        changePfp.classList.remove('change-pfp');
        body.classList.remove('blurred-background');
        changePfpText.innerHTML = '';
        imageInput.style.display = 'none';
    }
});
