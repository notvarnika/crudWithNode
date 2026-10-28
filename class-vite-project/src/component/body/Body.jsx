import React from "react";
import Student from "./student/Student";

export default function Body() {
  const students = [
    { id: 1, name: "Alice", marks: 85, section: "A" },
    { id: 2, name: "Bob", marks: 92, section: "B" },
    { id: 3, name: "Charlie", marks: 78, section: "A" },
  ];

  return (
    <table border="1">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Marks</th>
          <th>Section</th>
        </tr>
      </thead>
      <tbody>
        {students.map((stu) => (
          <Student
            key={stu.id}
            id={stu.id}
            name={stu.name}
            marks={stu.marks}
            section={stu.section}
          />
        ))}
      </tbody>
    </table>
  );
}
