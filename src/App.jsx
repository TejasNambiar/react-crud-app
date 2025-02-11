// Import Firebase functions for Firestore database operations
import { db } from "./Firebase-Config";
import {
  addDoc, // Function to add a new document to Firestore
  collection, // Function to reference a collection in Firestore
  deleteDoc, // Function to delete a document from Firestore
  doc, // Function to get a reference to a specific document
  getDocs, // Function to retrieve documents from Firestore
  updateDoc, // Function to update a document in Firestore
} from "firebase/firestore";

import React, { useEffect, useState } from "react";

export const App = () => {
  // State variables for managing users and input fields
  const [users, setUsers] = useState([]); // Stores user data from Firestore
  const [name, setName] = useState(""); // Stores input for name
  const [country, setCountry] = useState(""); // Stores input for country
  const [age, setAge] = useState(0); // Stores input for age

  // Reference to the Firestore collection "crud"
  const userCollectionRef = collection(db, "crud");

  // Fetch users from Firestore when the component mounts
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef); // Retrieve all documents from Firestore
      console.log(data);

      // Map documents into an array of objects with document data and ID
      const docRef = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      console.log(docRef);
      setUsers(docRef); // Update state with fetched user data
    };

    getUsers();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Function to create a new user in Firestore
  const createUser = async () => {
    await addDoc(userCollectionRef, {
      name: name,
      age: parseInt(age),
      country: country,
    }); // Add user to Firestore
    setName(""); // Reset input fields after creation
    setCountry("");
    setAge(0);
  };

  // Function to update the user's age by increasing it by 5
  const updateAge = async (id, age) => {
    console.log(id, age);
    const usersDoc = doc(db, "crud", id); // Get reference to the specific document
    const newAge = { age: age + 5 }; // New age object to update Firestore
    await updateDoc(usersDoc, newAge); // Update Firestore document
  };

  // Function to delete a user from Firestore
  const deletUser = async (id) => {
    const usersDoc = doc(db, "crud", id); // Get reference to the document
    console.log(id);
    await deleteDoc(usersDoc); // Delete the document from Firestore
  };

  return (
    <div>
      {/* Input fields for user details */}
      <input
        type="text"
        placeholder="Name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Age..."
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <input
        type="text"
        placeholder="Country..."
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />
      {/* Button to create a new user */}
      <button onClick={createUser}>Create User</button>

      {/* Display user list */}
      {users.map((user) => {
        return (
          <div key={user.id}>
            <h1>{user.name}</h1>
            <h1>{user.age}</h1>
            {/* Button to update user age */}
            <button onClick={() => updateAge(user.id, user.age)}>
              Update Age
            </button>
            {/* Button to delete user */}
            <button onClick={() => deletUser(user.id)}>Delete User</button>
          </div>
        );
      })}
    </div>
  );
};
