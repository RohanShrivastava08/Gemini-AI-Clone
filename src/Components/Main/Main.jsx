import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../Context/context";


const Main = () => {

  const {onSent,recentPrompt,showResult,loading,resultData,setInput,input} = useContext(Context)

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">

      {!showResult
      ? <>
          <div className="greet">
          <p><span>Hello, Rohan</span></p>
          <p>How can I help you today?</p>
        </div>
        <div className="cards">
          <div className="card">
            <p>Help me pick a movie to watch based on a genre</p>
            <img src={assets.compass_icon} alt="" />
          </div>
          <div className="card">
            <p>Provide questions to help me prepare for an interview</p>
            <img src={assets.bulb_icon} alt="" />
          </div>
          <div className="card">
            <p>Help me get organized with a list of 10 tips</p>
            <img src={assets.message_icon} alt="" />
          </div>
          <div className="card">
            <p>Help me incorporate more plant-based options in my diet</p>
            <img src={assets.code_icon} alt="" />
          </div>
        </div>
      </>
      :<div className='result'>
        <div className="result-title">
          <img src={assets.user_icon} alt="" />
          <p>{recentPrompt}</p>
        </div>
        <div className="result-data">
          <img src={assets.gemini_icon} alt="" />
          {loading
          ?
          <div className="loader">
            <hr />
            <hr />
            <hr />
          </div>
          :
          <p dangerouslySetInnerHTML={{__html:resultData}}></p>
          }
         
        </div>
      </div>
      }

        
        <div className="main-bottom">
          <div className="search-box">
            <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder="Enter a prompt here" />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
             {input?<img onClick={()=>onSent()} src={assets.send_icon} alt="" />:null} 
            </div>
          </div>
          <p className="bottom-info">
          Gemini may display inaccurate info, including about people, so double-check its responses. <a href="#"> Your privacy & Gemini Apps </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Main;
