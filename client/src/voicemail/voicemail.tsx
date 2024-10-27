import logo from './logo.svg';
import './voicemail.css';
import icon from './assets/icon.png'; // Adjust path based on location

function App() {
  return (
    <div className="voicemail-list">
      <h2 className="title">Voicemail</h2>

      <div className="voicemail-item">
        <div className="name-and-device">
          <div className="name">Scammer</div>
          <div className="device">phone</div>
        </div>
        <div className="date-duration-icon">
          <div className="date-duration">
            <div className="date">10/26/21</div>
            <div className="duration">00:44</div>
          </div>
          <div className="icon">
            <img src={icon} width={20} height="auto" alt="voicemail icon" />
          </div>
        </div>
      </div>

      <div className="voicemail-item">
        <div className="name-and-device">
          <div className="name">Scammer</div>
          <div className="device">phone</div>
        </div>
        <div className="date-duration-icon">
          <div className="date-duration">
            <div className="date">10/26/24</div>
            <div className="duration">01:29</div>
          </div>
            <img src={icon} width={30} height="auto" alt="voicemail icon" />
        </div>
      </div>
    </div>
  );
}

export default App;
