import React from "react";

export default function ButtonHandling() {
  const clickMe = () => {
    alert("hi");
  };
  return (
    <>
      {/* function address should be passed for event handling */}
      {/* //clickme is address clickMe() is function calling */}
      <button onClick={clickMe}>hi</button>
      <button
        onClick={() => {
          alert("hi 2");
        }}
      >
        click me 2
      </button>
    </>
  );
}
