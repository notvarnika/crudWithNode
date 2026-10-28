// import { useState } from "react";

// const Display = ({ user, pwd, age }) => {
//   return (
//     <div className="mt-4 p-3 border rounded bg-light">
//       <h4>Submitted Details:</h4>
//       <p className="mb-1"><strong>User:</strong> {user}</p>
//       <p className="mb-1"><strong>Password:</strong> {pwd}</p>
//       <p className="mb-0"><strong>Age:</strong> {age}</p>
//     </div>
//   );
// };

// const Registration = () => {
//   const [user, setUser] = useState("");
//   const [pwd, setPwd] = useState("");
//   const [age, setAge] = useState(0);
//   const [submittedData, setSubmittedData] = useState(null);

//   const submitValue = (e) => {
//     e.preventDefault();
//     setSubmittedData({ user, pwd, age });
//   };

//   return (
//     <div className="container mt-4" style={{ maxWidth: "400px" }}>
//       <h2 className="bg-warning text-center p-2 rounded">Registration Form</h2>
//       <form className="d-flex flex-column gap-3 mt-3" onSubmit={submitValue}>
//         <input
//           type="text"
//           name="user"
//           value={user}
//           onChange={(e) => setUser(e.target.value)}
//           className="form-control"
//           placeholder="Enter user name"
//         />
//         <input
//           type="password"
//           name="pwd"
//           value={pwd}
//           onChange={(e) => setPwd(e.target.value)}
//           className="form-control"
//           placeholder="Enter password"
//         />
//         <input
//           type="number"
//           name="age"
//           value={age}
//           onChange={(e) => setAge(e.target.value)}
//           className="form-control"
//           placeholder="Enter age"
//         />
//         <button type="submit" className="btn btn-primary w-25 align-self-center">
//           Register
//         </button>
//       </form>

//       {submittedData && <Display {...submittedData} />}
//     </div>
//   );
// };

// export default Registration;

import { useState } from "react";

// Component to display the list of submitted users
const DisplayList = ({ items }) => {
  return (
    <div className="mt-4 p-3 border rounded bg-light">
      <h4>Registered Users:</h4>
      {items.map((item, index) => (
        <div key={index} className="p-2 border-bottom last-border-0">
          <p className="mb-1">
            <strong>User:</strong> {item.user}
          </p>
          <p className="mb-1">
            <strong>Password:</strong> {item.pwd}
          </p>
          <p className="mb-0">
            <strong>Age:</strong> {item.age}
          </p>
        </div>
      ))}
    </div>
  );
};

const Registration = () => {
  // Single state object for form fields
  const [regInfo, setRegInfo] = useState({
    user: "",
    pwd: "",
    age: "",
  });

  // Array state to hold all submitted users
  const [submittedList, setSubmittedList] = useState([]);

  // Generic handler to update fields based on input name attributes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitValue = (e) => {
    e.preventDefault();

    // Add current form info to the items array
    setSubmittedList((prev) => [...prev, regInfo]);

    // Reset form fields
    setRegInfo({ user: "", pwd: "", age: "" });
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "400px" }}>
      <h2 className="bg-warning text-center p-2 rounded">Registration Form</h2>

      <form className="d-flex flex-column gap-3 mt-3" onSubmit={submitValue}>
        <input
          type="text"
          name="user"
          value={regInfo.user}
          onChange={handleChange}
          className="form-control"
          placeholder="Enter user name"
          required
        />
        <input
          type="password"
          name="pwd"
          value={regInfo.pwd}
          onChange={handleChange}
          className="form-control"
          placeholder="Enter password"
          required
        />
        <input
          type="number"
          name="age"
          value={regInfo.age}
          onChange={handleChange}
          className="form-control"
          placeholder="Enter age"
          required
        />
        <button
          type="submit"
          className="btn btn-primary w-25 align-self-center"
        >
          Register
        </button>
      </form>

      {/* Renders the list only if items have been submitted */}
      {submittedList.length > 0 && <DisplayList items={submittedList} />}
    </div>
  );
};

export default Registration;
