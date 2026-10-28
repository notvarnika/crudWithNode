import React from "react";

export default function Student({ id, name, marks, section }) {
  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{marks}</td>
      <td>{section}</td>
    </tr>
  );
}
