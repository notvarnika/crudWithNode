import React, { useState } from "react";

export default function Count() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-outline-warning"
        onClick={increment}
      >
        +
      </button>
      <button
        type="button"
        className="btn btn-outline-success"
        onClick={decrement}
      >
        -
      </button>
      <h1>{count}</h1>
    </>
  );
}
