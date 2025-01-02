// gemini.js
/*
 * Install the Generative AI SDK
 * $ npm install @google/generative-ai
 * For documentation: https://ai.google.dev/gemini-api/docs/get-started/node
 */

import { GoogleGenerativeAI } from "@google/generative-ai";


// Ensure that you store your API key securely
const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;// Replace with your actual API key securely
const genAI = new GoogleGenerativeAI(apiKey);

// Initialize the generative model
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

// Correct generation configuration with valid parameters
const generationConfig = {
  temperature: 1,             // Control randomness (higher = more random)
  topK: 40,                  // Ensure topK is an integer (no decimals)
  topP: 0.9,                 // Controls diversity (higher = more diverse)
  maxOutputTokens: 8192,     // Maximum output token length
};

// Function to run the API call and handle response
async function run(prompt) {
  try {
    // Start the chat session with the prompt
    const chatSession = model.startChat({
      generationConfig,
      history: [], // Optionally, manage chat history if needed
    });

    // Send the prompt and get the response
    const result = await chatSession.sendMessage(prompt);
    console.log("Generated Response:", result.response.text());

    // Return the text of the response
    return result.response.text();
  } catch (error) {
    console.error("Error in generating content:", error);
    throw new Error("Error generating content, please try again.");
  }
}

export default run;