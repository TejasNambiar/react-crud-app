import React, { useState } from "react";

const UserForm = ({ onCreateUser }) => {
  // ✅ Local state for form inputs
  const [userDetail, setUserDetail] = useState({
    name: "",
    age: "",
    country: "",
  });

  // ✅ Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page refresh

    // 1️⃣ Prevent empty input submission
    if (!userDetail.name || !userDetail.age || !userDetail.country) {
      alert("Please fill all fields");
      return;
    }

    // 2️⃣ Pass user details to parent component
    onCreateUser(userDetail);

    // 3️⃣ Reset form fields
    setUserDetail({ name: "", age: "", country: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name..."
        value={userDetail.name}
        onChange={(e) => setUserDetail({ ...userDetail, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Age..."
        value={userDetail.age}
        onChange={(e) => setUserDetail({ ...userDetail, age: e.target.value })}
      />
      <input
        type="text"
        placeholder="Country..."
        value={userDetail.country}
        onChange={(e) =>
          setUserDetail({ ...userDetail, country: e.target.value })
        }
      />
      <button type="submit">Create User</button>
    </form>
  );
};

export default UserForm;
