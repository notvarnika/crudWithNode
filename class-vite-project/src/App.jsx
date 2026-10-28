import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");

  const URL = "http://localhost:5000/users";

  // READ
  const getStudents = async () => {
    const res = await axios.get(URL);
    setStudents(res.data);
  };

  // CREATE
  const addStudent = async () => {
    await axios.post(URL, { name });
    setName("");
    getStudents();
  };

  // DELETE
  const deleteStudent = async (id) => {
    await axios.delete(`${URL}/${id}`);
    getStudents();
  };

  // UPDATE
  const updateStudent = async (student) => {
    await axios.put(`${URL}/${student.id}`, {
      ...student,
      name: student.name + " Updated",
    });
    getStudents();
  };

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <div>
      <h2>CRUD App</h2>

      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={addStudent}>Add</button>

      {students.map((s) => (
        <div key={s.id}>
          {s.name}

          <button onClick={() => updateStudent(s)}>Update</button>

          <button onClick={() => deleteStudent(s.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
