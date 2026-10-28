import React, { useEffect, useState } from "react";

export default function TextBox() {
  const [text, setText] = useState("");
  const [info, setInfo] = useState("");

  useEffect(() => {
    if (text.toLowerCase() === "java") {
      setInfo("☕ Java has classes");
    } else if (text.toLowerCase() === "python") {
      setInfo("🐍 Python uses indentation");
    } else if (text.toLowerCase() === "varnika") {
      setInfo("hi v");
    } else if (text.toLowerCase() === "tanya") {
      setInfo("hi T");
    } else {
      setInfo(text ? `You typed: ${text}` : "Type a language...");
    }
  }, [text]);

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "40px auto",
        padding: "20px",
        borderRadius: "10px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <label
        style={{
          display: "block",
          marginBottom: "8px",
          fontWeight: "bold",
          fontSize: "16px",
        }}
      >
        Enter a language:
      </label>
      <input
        type="text"
        placeholder="e.g. Java or Python"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          marginBottom: "15px",
          fontSize: "14px",
        }}
      />
      <p
        style={{
          backgroundColor: "#282c34",
          color: "white",
          padding: "10px",
          borderRadius: "6px",
          textAlign: "center",
          fontSize: "15px",
        }}
      >
        {info}
      </p>
    </div>
  );
}
