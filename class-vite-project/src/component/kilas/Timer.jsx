import React, { useEffect, useState } from "react";

export default function Timer() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: "10px",
        right: "20px",
        backgroundColor: "#282c34",
        color: "white",
        padding: "8px 16px",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <label style={{ marginRight: "8px", fontWeight: "bold" }}>🕒 Time:</label>
      <span>{time}</span>
    </div>
  );
}
