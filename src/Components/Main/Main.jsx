import React, { useContext, useEffect } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../Context/context";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
    prevPrompts,
    setPrevPrompts,
  } = useContext(Context);

  // Load chat history from localStorage on component mount
  useEffect(() => {
    const storedPrompts = JSON.parse(localStorage.getItem("chatHistory")) || [];
    setPrevPrompts(storedPrompts);
  }, []);

  // Update localStorage whenever prevPrompts change
  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(prevPrompts));
  }, [prevPrompts]);

  // Function to send predefined prompt when a card is clicked
  const handleCardClick = (prompt) => {
    setInput(prompt);
    onSent(prompt);
  };

  // Handle Enter key to send messages
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      onSent();
    }
  };

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="User Icon" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Rohan</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div
                className="card"
                onClick={() =>
                  handleCardClick(
                    "Help me pick a movie to watch based on a genre"
                  )
                }
              >
                <p>Help me pick a movie to watch based on a genre</p>
                <img src={assets.compass_icon} alt="Compass Icon" />
              </div>
              <div
                className="card"
                onClick={() =>
                  handleCardClick(
                    "Provide questions to help me prepare for an interview"
                  )
                }
              >
                <p>Provide questions to help me prepare for an interview</p>
                <img src={assets.bulb_icon} alt="Bulb Icon" />
              </div>
              <div
                className="card"
                onClick={() =>
                  handleCardClick(
                    "Help me get organized with a list of 10 tips"
                  )
                }
              >
                <p>Help me get organized with a list of 10 tips</p>
                <img src={assets.message_icon} alt="Message Icon" />
              </div>
              <div
                className="card"
                onClick={() =>
                  handleCardClick(
                    "Help me incorporate more plant-based options in my diet"
                  )
                }
              >
                <p>Help me incorporate more plant-based options in my diet</p>
                <img src={assets.code_icon} alt="Code Icon" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="User Icon" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="Gemini Icon" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}
        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a prompt here"
              onKeyDown={handleKeyDown} // Enable sending on Enter key
            />
            <div className="search-box-icons">
              <img
                src={assets.gallery_icon}
                alt="Gallery Icon"
                className="search-box-icon"
              />
              <img
                src={assets.mic_icon}
                alt="Mic Icon"
                className="search-box-icon"
              />
              {input ? (
                <img
                  onClick={() => onSent()}
                  src={assets.send_icon}
                  alt="Send Icon"
                  className="send-button search-box-icon"
                />
              ) : null}
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so
            double-check its responses.{" "}
            <a href="#">Your privacy & Gemini Apps</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
