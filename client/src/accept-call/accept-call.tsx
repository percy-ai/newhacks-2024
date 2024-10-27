import React, { useState, useEffect } from 'react';
import './accept-call.css';

function AcceptCall() {
  const [isHangingUp, setIsHangingUp] = useState(false);
  const [seconds, setSeconds] = useState(0);

  // Function to format seconds into MM:SS format
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // Start the timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isHangingUp) {
      timer = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    // Cleanup timer when component is unmounted or when hang up is clicked
    return () => clearInterval(timer);
  }, [isHangingUp]);

  const handleHangUpClick = () => {
    setIsHangingUp(true);
    setSeconds(0); // Optionally reset the timer if desired
  };

  return (
    <div className="accept-call-container">
      <div className="call-screen">
        <div className="status-bar">
          <div>10:37</div>
          <div>📶 🔋</div>
        </div>

        <div className="call-details">
          +1 (437) 887 2659
          <div className="calling-text">{isHangingUp ? 'Call ended' : formatTime(seconds)}</div>
        </div>

        {/* Main button group with images and labels */}
        <div className="buttons">
          <div className="button-container">
            <div className="button">
              <img src="/mute.png" alt="Mute" className="button-icon" />
            </div>
            <span className="button-label">mute</span>
          </div>
          <div className="button-container">
            <div className="button">
              <img src="/dial.png" alt="Keypad" className="button-icon" />
            </div>
            <span className="button-label">keypad</span>
          </div>
          <div className="button-container">
            <div className="button">
              <img src="/speaker.png" alt="Audio" className="button-icon" />
            </div>
            <span className="button-label">audio</span>
          </div>
          <div className="button-container">
            <div className="button">
              <img src="/plus.png" alt="Add Call" className="button-icon" />
            </div>
            <span className="button-label">add call</span>
          </div>
          <div className="button-container">
            <div className="button">
              <img src="/facetime.png" alt="FaceTime" className="button-icon" />
            </div>
            <span className="button-label">FaceTime</span>
          </div>
          <div className="button-container">
            <div className="button">
              <img src="/user.png" alt="Contacts" className="button-icon" />
            </div>
            <span className="button-label">contacts</span>
          </div>
        </div>

        {/* Hang-up button positioned separately with click effect */}
        <div className="end-call-container">
          <div
            className={`button end-call ${isHangingUp ? 'end-call-clicked' : ''}`}
            onClick={handleHangUpClick}
          >
            <img src="/decline.png" alt="End Call" className="button-icon" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AcceptCall;
