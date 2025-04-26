const API_KEY = 'AIzaSyB8CR8XdP9Rf1JM_pfAOgDvCVeSNbUJ54s'; 
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

const phaseOne = document.querySelector('.lebron-james-js');
const suggestion = document.querySelectorAll('.suggestion');
const phaseTwo = document.querySelector('.micheal-jordan-js');
const userInput = document.querySelector('.prompt-input');
const userInputSection  = document.querySelector('.prompt-input-section'); 
const displayInput = document.querySelector('.user-input-js');
const layoutConversation = document.querySelector('.conversation-js');
const apiResponseContainer = document.querySelector('.api-response-js'); 
const geminiText = document.querySelector('.gemini-text');

let promptHistory = []; // Store conversation history
let currentSession = 0;
let chatMessages = JSON.parse(localStorage.getItem('chatMessages')) || []; // Load from localStorage

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

        const phaseTwoInputs = document.querySelectorAll('.phaseTwo-input-container');
        phaseTwoInputs.forEach(container => container.remove());

        phaseOne.style.display = '';
        currentSession++;
        phaseTwo.classList.remove('micheal-jordan');
        phaseTwo.style.display = 'none';

        
        // if (!phaseOne.contains(userInputSection)) {
        //     phaseOne.appendChild(userInputSection);
        // }

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

// let userIsScrolling = false;

// layoutConversation.addEventListener('scroll', () => {
//     const distanceFromBottom = layoutConversation.scrollHeight - layoutConversation.scrollTop - layoutConversation.clientHeight;
    
//     // If the user is 150px or more away from bottom, assume manual scrolling
//     if (distanceFromBottom > 150) {
//         userIsScrolling = true;
//     } 
//     // If the user scrolls back near the bottom manually, reset
//     else if (distanceFromBottom < 50) {
//         userIsScrolling = false;
//     }
// });



let isTyping = false;
//function to display the text with an animation that types it out in real time
function typeText(element,text,speed = 15){
    let index = 0;
    isTyping = true;
    function type(){
        if(index < text.length){
            element.textContent += text[index];
            index++;
            // if (!userIsScrolling) {
            //     layoutConversation.scrollTop = layoutConversation.scrollHeight;
            // }
            setTimeout(type,speed);
        }
        else{
            isTyping = false;
        }
    }
    type();
}



let phaseTwoInput;

// Function to show phaseTwo and allow continuous conversation
function showConversation(userText, isSuggestionClick = false) {
  if (phaseTwo) {
      phaseOne.style.display = 'none';
      phaseTwo.classList.add('micheal-jordan');
      phaseTwo.style.display = 'flex';


      if (!document.querySelector('.phaseTwo-input')) {
        // Create input container to maintain proper spacing
        const inputContainer = document.createElement('div');
        inputContainer.classList.add('phaseTwo-input-container');
        inputContainer.style.marginTop = '40px'; // Add spacing
        
        phaseTwoInput = document.createElement('input');
        phaseTwoInput.placeholder = 'Enter a prompt here';
        phaseTwoInput.classList.add('phaseTwo-input');
        
        inputContainer.appendChild(phaseTwoInput);
        
        // Append at the bottom of phaseTwo *after* the conversation div
        phaseTwo.appendChild(inputContainer);

        // Add enter key listener to phaseTwoInput
phaseTwoInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' && phaseTwoInput.value.trim() !== "") {
        if (isTyping) {
            event.preventDefault(); // prevent sending
            console.log('Please wait for the AI to finish responding.');
            return;
        }
        const userText = phaseTwoInput.value.trim();
        phaseTwoInput.value = "";  // Clear input after sending
        showConversation(userText);
    }
});
    }


 // Reset background color
      // Move input section inside phaseTwo dynamically
    //   if (!phaseTwo.contains(userInputSection)) {
    //       phaseTwo.appendChild(userInputSection);
    //   }
    
    //   userInputSection.style.display = 'flex'; // Make sure it's visible
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



// const promptIcon = document.querySelector('.right-icon');
// promptIcon.addEventListener('click', function () {
//    if(lastAiResponse.trim()){
//     playTTS(lastAiResponse);
//    }
//    else{
//     console.log('No AI response to play.');
//    }
// });

  
// async function playTTS(text) {
//     try {
//       const response = await fetch('http://localhost:3000/tts', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ text })
//       });
  
//       if (!response.ok) throw new Error("TTS failed");
  
//       const audioBlob = await response.blob();
//       const audioUrl = URL.createObjectURL(audioBlob);
  
//       const audio = new Audio(audioUrl);
//       audio.play();
//     } catch (error) {
//       console.error("Audio Playback Error:", error);
//     }
//   }
 

//   let lastAiResponse = ''; 
// //this is for the elevenlabs API
// import dotenv from 'dotenv';
// dotenv.config();

// import { ElevenLabsClient } from "elevenlabs";
// import fs from 'fs';
// import { buffer } from 'stream/consumers';

// const client = new ElevenLabsClient({
//   apiKey: "sk_a55e052e791f8187ee970aeac19099e32c09e9f7291f8062"
// });

// const audioStream = await client.textToSpeech.convert("JBFqnCBsd6RMkjVDRZzb", {
//   text: aiText,
//   model_id: "eleven_multilingual_v2",
//   output_format: "mp3_44100_128",
// });


// // Convert stream to buffer
// const audioBuffer = await buffer(audioStream);

// // Save to file
// fs.writeFileSync('output.mp3', audioBuffer);
// console.log('✅ Audio saved as output.mp3 — go play it!');




// This is for the Google Gemini API

// import { GoogleGenerativeAI } from "@google/generative-ai";

// // Replace with your actual API key
//
// const genAI = new GoogleGenerativeAI(API_KEY);

// async function getGeminiResponse(prompt) {
//   try {
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//     const result = await model.generateContent(prompt);
//     const response = await result.response.text();
//     console.log("Gemini Response:", response);
//   } catch (error) {
//     console.error("Error fetching response:", error);
//   }
// }

// // Example usage
// const userPrompt = "Explain how AI works in simple terms.";
// getGeminiResponse(userPrompt);


