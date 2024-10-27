import React, { useState, useEffect } from "react";
import "./incoming.css";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabase: SupabaseClient = createClient(
  "https://gldvgrcsiwscznrzcgxe.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdsZHZncmNzaXdzY3pucnpjZ3hlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk5NzYzMTQsImV4cCI6MjA0NTU1MjMxNH0.YAhY2yXpVLxRFErP2XS-4FhRGfFZ2BSgdSXuLdQql3U"
);

interface Table {
  id: number;
  created_at: string;
  status: boolean;
}

function App() {
  const [isAnswering, setIsAnswering] = useState(false);
  const [isDeclining, setIsDeclining] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [data, setData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: result, error } = await supabase
          .from("callstatus")
          .select()
          .eq("id", 1);

        if (error) {
          console.error("Error fetching data:", error);
        } else {
          setData(result[0].status);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData(); // Initial fetch

    const interval = setInterval(fetchData, 1000); // Fetch every second

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  const handleAnswer = () => {
    setIsAnswering(true);
    setTimeout(() => setShowControls(false), 300);
  };

  const handleDecline = () => {
    setIsDeclining(true);
    setTimeout(() => setShowControls(false), 300);
  };

  return (
    <div className="call-screen">
      <div className="name">+1 (437) 887 2659</div>
      <div className="name2">{data ? "Scam/Spam" : "Not Scam/Spam"}</div>
      <div className="bottom-container">
        <div className="options">
          <div className="option">
            <div className="remind">
              <img src="alarm-clock.png" className="icon3" />
            </div>
            <span>Remind Me</span>
          </div>
          <div className="option">
            <div className="remind">
              <img src="speech-bubble.png" className="icon3" />
            </div>
            <span>Message</span>
          </div>
        </div>
        <div className="options">
          <div className="option">
            <div className="button decline" onClick={handleDecline}>
              <img src="decline.png" className="icon2" />
            </div>
            <span>Decline</span>
          </div>
          <div className="option">
            <div className="button accept" onClick={handleAnswer}>
              <img src="phone-call.png" className="icon" />
            </div>
            <span>Accept</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
