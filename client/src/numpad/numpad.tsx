import React, { useState } from "react";
import logo from "./logo.svg";
import "./numpad.css";
import callIcon from "./images/call_icon.png"; // Adjust the path as needed

function App() {
  const [displayedNumber, setDisplayedNumber] = useState("");

  const handleButtonClick = (value: string) => {
    setDisplayedNumber((prevNumber) => prevNumber + value);
  };

  return (
    <div className="everything">
      <div className="whiteBox"></div>
      <div className="container">
        <div className="number_show">{displayedNumber}</div>
        <div className="keypad">
          <div className="row">
            <button
              className="circle-button"
              onClick={() => handleButtonClick("1")}
            >
              <div>
                <span className="number">1</span>
                <span className="text"></span>
              </div>
            </button>
            <button
              className="circle-button"
              onClick={() => handleButtonClick("2")}
            >
              <div>
                <span className="number">2</span>
                <span className="text">A B C</span>
              </div>
            </button>
            <button
              className="circle-button"
              onClick={() => handleButtonClick("3")}
            >
              <div>
                <span className="number">3</span>
                <span className="text">D E F</span>
              </div>
            </button>
          </div>
          <div className="row">
            <button
              className="circle-button"
              onClick={() => handleButtonClick("4")}
            >
              <div>
                <span className="number">4</span>
                <span className="text">G H I</span>
              </div>
            </button>
            <button
              className="circle-button"
              onClick={() => handleButtonClick("5")}
            >
              <div>
                <span className="number">5</span>
                <span className="text">J K L</span>
              </div>
            </button>
            <button
              className="circle-button"
              onClick={() => handleButtonClick("6")}
            >
              <div>
                <span className="number">6</span>
                <span className="text">M N O</span>
              </div>
            </button>
          </div>
          <div className="row">
            <button
              className="circle-button"
              onClick={() => handleButtonClick("7")}
            >
              <div>
                <span className="number">7</span>
                <span className="text">P Q R S</span>
              </div>
            </button>
            <button
              className="circle-button"
              onClick={() => handleButtonClick("8")}
            >
              <div>
                <span className="number">8</span>
                <span className="text">T U V</span>
              </div>
            </button>
            <button
              className="circle-button"
              onClick={() => handleButtonClick("9")}
            >
              <div>
                <span className="number">9</span>
                <span className="text">W X Y Z</span>
              </div>
            </button>
          </div>
          <div className="row">
            <button
              className="circle-button"
              onClick={() => handleButtonClick("*")}
            >
              <span className="aster">*</span>
            </button>
            <button
              className="circle-button"
              onClick={() => handleButtonClick("0")}
            >
              <div>
                <span className="number">0</span>
                <span className="text">+</span>
              </div>
            </button>
            <button
              className="circle-button"
              onClick={() => handleButtonClick("#")}
            >
              <span className="number">#</span>
            </button>
          </div>

          <a href="/accept">
            {" "}
            <button className="call">
              <img src={callIcon} width="70" height="auto" />
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
