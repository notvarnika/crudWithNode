import React, { useState } from "react";

function PlusTwo() {
  const [number, setNumber] = useState([1, 2, 3, 4, 5]);

  const [num2, setNum2] = useState([
    { id: 1, num2: 10 },
    { id: 2, num2: 20 },
    { id: 3, num2: 30 },
    { id: 4, num2: 40 },
  ]);
  const plustwo = () => {
    setNum2((prev) => prev.map((row) => ({ ...row, num2: row.num2 + 2 })));

    // setNumber((prev) => prev.map((value) => value + 2));
    // let temp = [...number];
    // for (let i = 0; i < number.length; i++) {
    //   temp[i] = temp[i] + 2;
    // }
    // setNumber(temp);
    // let temp = number.map((value) => value + 2);
    // setNumber(temp);
    // setNumber(number.map((value, index) => value + 2));
  };
  return (
    <>
      {/* <h1>List of numbers</h1>
      {number.map((value, index) => (
        <h2 key={index}>{value}</h2>
      ))}
      <button onClick={plustwo}>plus+2</button>
 */}

      <h1>List of objects</h1>
      {num2.map((row) => (
        <h2 key={row.id}>
          id: {row.id}, num2: {row.num2}
        </h2>
      ))}
      <button onClick={plustwo}>plus+2</button>
    </>
  );
}

export default PlusTwo;
