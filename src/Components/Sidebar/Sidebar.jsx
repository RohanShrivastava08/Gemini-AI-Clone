import React, { useContext, useState, useEffect } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../Context/context";
import { MdDelete } from "react-icons/md";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompts, setRecentPrompt, newChat, setPrevPrompts } = useContext(Context);

  // Load previous prompts from localStorage on mount
  useEffect(() => {
    const storedPrompts = JSON.parse(localStorage.getItem("chatHistory")) || [];
    setPrevPrompts(storedPrompts);
  }, []);

  // Save to localStorage whenever prevPrompts change
  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(prevPrompts));
  }, [prevPrompts]);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  const deletePrompt = (index) => {
    const updatedPrompts = prevPrompts.filter((_, i) => i !== index);
    setPrevPrompts(updatedPrompts);
  };

  return (
    <div className={`sidebar ${extended ? "extended" : ""}`}>
      <div className="top">
        <img
          onClick={() => setExtended((prev) => !prev)}
          className="menu"
          src={assets.menu_icon}
          alt="Menu Icon"
        />
        <div onClick={newChat} className="new-chat">
          <img src={assets.plus_icon} alt="Plus Icon" />
          {extended && <p>New Chat</p>}
        </div>
        {extended && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item, index) => (
              <div key={index} className="recent-entry">
                <img src={assets.message_icon} alt="Message Icon" onClick={() => loadPrompt(item)} />
                <p onClick={() => loadPrompt(item)}>{item.slice(0, 18)}...</p>
                <MdDelete className="delete-btn" onClick={() => deletePrompt(index)} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
