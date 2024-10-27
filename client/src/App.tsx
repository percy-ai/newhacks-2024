import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Incoming from "./incoming/incoming";
import Voicemail from "./voicemail/voicemail";
import Numpad from "./numpad/numpad";
import RealTimeComponent from "./websockets/websockets";
import Incall from "./incall/incall";

function App() {
  const [clicked, setClicked] = useState(false);
  return (
    <div className="app">
      <Router>
        <nav className="app" hidden={clicked}>
          <ul>
            <li>
              <Link to="/numpad" onClick={(e) => setClicked(true)}>
                Numpad
              </Link>
            </li>
            <li>
              <Link to="/incoming" onClick={(e) => setClicked(true)}>
                incoming
              </Link>
            </li>
            <li>
              <Link to="/voicemail" onClick={(e) => setClicked(true)}>
                voicemail
              </Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/"></Route>
          <Route path="/incoming" element={<Incoming></Incoming>}></Route>
          <Route path="/voicemail" element={<Voicemail></Voicemail>}></Route>
          <Route path="/numpad" element={<Numpad></Numpad>}></Route>
          <Route
            path="/real"
            element={<RealTimeComponent></RealTimeComponent>}
          ></Route>
          <Route path="/call" element={<Incall></Incall>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
