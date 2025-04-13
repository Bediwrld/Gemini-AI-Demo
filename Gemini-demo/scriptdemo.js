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
const phaseOne = document.querySelector('.lebron-james-js');
const suggestion = document.querySelectorAll('.suggestion');
const phaseTwo = document.querySelector('.micheal-jordan-js');

const userInput = document.querySelector('.prompt-input');
const displayInput = document.querySelector('.user-input-js');
const layoutConversation = document.querySelector('.conversation-js');
const apiResponse = document.querySelector('.api-response-js');
const submitButton = document.querySelector("#submit-button");

function showPhaseTwoAndConversation(userText) {
    if (phaseOne) {
        phaseOne.style.display = 'none';
        phaseTwo.style.display = 'flex';
    }

    if (phaseTwo) {
        layoutConversation.style.display = 'block'; //Make the conversation layout visible
        displayInput.textContent = userText;
        apiResponse.textContent = "Loading...";  // Initial loading message
    }
}


async function getApiResponse(prompt) {
    const apiKey = "AIzaSyB8CR8XdP9Rf1JM_pfAOgDvCVeSNbUJ54s"; // Replace with your actual API key!!
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }]
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        // Adapt based on the real response structure
        return data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

function updateApiResponse(response) {
    apiResponse.textContent = response;
}


function processPrompt(prompt) {
        showPhaseTwoAndConversation(prompt);

        getApiResponse(prompt)
            .then(response => {
                updateApiResponse(response); // Update with the actual response
            })
            .catch(error => {
                console.error("Error:", error);
                updateApiResponse("An error occurred while fetching the response.");
            });

        userInput.value = "";
}

document.addEventListener("DOMContentLoaded", function () {
    //Attach event listener for suggestion click
    suggestion.forEach(suggestionElement => {
        suggestionElement.addEventListener('click', () => {
            const clickedText = suggestionElement.querySelector('.suggestion-js').textContent;
            processPrompt(clickedText);
        });
    });

    // Attach event listener for 'Enter' key press
    userInput.addEventListener("keydown", function (event) {
        if (event.key === 'Enter' && userInput.value.trim() !== "") {
            processPrompt(userInput.value.trim());
            event.preventDefault(); //Prevent the default action (form submission) which can interfere with the process.
        }
    });


    submitButton.addEventListener("click", function () {
        if (userInput.value.trim() !== "") {
            processPrompt(userInput.value.trim());
        }
    });
});