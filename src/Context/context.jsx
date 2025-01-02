// context.jsx
import React, { createContext, useState } from "react";
import run from "../config/gemini"; // Ensure the correct path to gemini.js

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");          // Input state for prompt
  const [recentPrompt, setRecentPrompt] = useState(""); // Recent prompt stored
  const [prevPrompts, setPrevPrompts] = useState([]);  // List of previous prompts
  const [showResult, setShowResult] = useState(false); // Flag to show/hide result
  const [loading, setLoading] = useState(false);      // Flag for loading state
  const [resultData, setResultData] = useState("");   // Data for the response

  // Delay to simulate typing effect for response display
  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 75 * index); // Adjust time as needed for smoother effect
  };

  // Reset the chat for a new conversation
  const newChat = () => {
    setLoading(false);
    setShowResult(false);
    setInput("");
    setResultData("");
  };

  // Handle the sending of the prompt
  const onSent = async (prompt) => {
    setResultData("");          // Clear previous result data
    setLoading(true);           // Set loading state to true
    setShowResult(true);        // Show result section

    try {
      let response;
      
      // Check if the prompt is undefined or empty, use input from the state
      if (prompt !== undefined) {
        response = await run(prompt); // Call the API with the provided prompt
        setRecentPrompt(prompt);      // Store the recent prompt
      } else {
        setPrevPrompts((prev) => [...prev, input]); // Store previous prompt in the history
        setRecentPrompt(input);
        response = await run(input); // Call the API with the input value
      }

      // Validate response and process it
      if (!response || typeof response !== "string") {
        throw new Error("Invalid response from the generative AI service");
      }

      // Format response (splitting and making parts bold as needed)
      const responseArray = response.split("**");
      const formattedResponse = responseArray
        .map((part, i) => (i % 2 === 1 ? `<b>${part}</b>` : part)) // Bold odd parts
        .join("")
        .replace(/\*/g, "<br>"); // Replace asterisks with line breaks

      // Split the response into words and simulate typing effect
      const responseWords = formattedResponse.split(" ");
      responseWords.forEach((word, i) => {
        delayPara(i, word + " "); // Apply typing delay for each word
      });

    } catch (error) {
      console.error("Error in onSent:", error);
      setResultData("An error occurred. Please try again later."); // Error message
    } finally {
      setLoading(false);    // Turn off loading state
      setInput("");         // Reset input field after submission
    }
  };

  // Provide context values to the component tree
  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
