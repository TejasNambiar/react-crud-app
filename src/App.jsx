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

import React, { useEffect, useReducer, useState } from "react";

// ✅ Initial state for the reducer
const initialState = {
  users: [], // Stores the list of users retrieved from Firestore
};

// ✅ Reducer function to handle CRUD actions
const userActionReducer = (state, action) => {
  switch (action.type) {
    case "INITIALIZE":
      return { users: action.payload }; // Load users from Firestore

    case "ADD_USER":
      return { users: [...state.users, action.payload] }; // Add a new user to local state

    case "UPDATE_AGE":
      return {
        users: state.users.map((user) =>
          user.id === action.payload.id
            ? { ...user, age: action.payload.age } // Update only the matching user
            : user
        ),
      };

    case "DELETE_USER":
      return {
        users: state.users.filter((user) => user.id !== action.payload), // Remove user from state
      };

    default:
      return state; // If action type is unknown, return current state
  }
};

export const App = () => {
  // ✅ Using useReducer instead of useState for managing users efficiently
  const [state, dispatch] = useReducer(userActionReducer, initialState);

  // ✅ useState for handling form input fields (Name, Age, Country)
  const [userDetail, setUserDetail] = useState({
    name: "",
    age: "",
    country: "",
  });

  // ✅ Firestore collection reference
  const userCollectionRef = collection(db, "crud");

  // ✅ Fetch users from Firestore when the component mounts (Runs only once)
  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getDocs(userCollectionRef); // Get all users from Firestore

      // Transform Firestore documents into an array of user objects
      const usersList = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id, // Store Firestore document ID
      }));

      // Initialize users in state using useReducer
      dispatch({ type: "INITIALIZE", payload: usersList });
    };

    fetchUsers();
  }, []); // Empty dependency array ensures this runs once on component mount

  // ✅ Function to create a new user in Firestore
  const createUser = async () => {
    // 1️⃣ Prevent empty inputs
    if (!userDetail.name || !userDetail.age || !userDetail.country) {
      alert("Please fill all fields");
      return;
    }

    // 2️⃣ Create user object
    const newUser = {
      name: userDetail.name,
      age: parseInt(userDetail.age), // Ensure age is stored as a number
      country: userDetail.country,
    };

    // 3️⃣ Add user to Firestore
    const docRef = await addDoc(userCollectionRef, newUser);

    // 4️⃣ Update local state immediately after Firestore operation succeeds
    dispatch({ type: "ADD_USER", payload: { ...newUser, id: docRef.id } });

    // 5️⃣ Reset input fields
    setUserDetail({ name: "", age: "", country: "" });
  };

  // ✅ Function to update the user's age by increasing it by 5
  const updateAge = async (id, age) => {
    const usersDoc = doc(db, "crud", id); // Get reference to Firestore document
    const updatedAge = { age: age + 5 }; // Create updated age object

    await updateDoc(usersDoc, updatedAge); // Update Firestore document

    // ✅ Update local state without refetching from Firestore
    dispatch({ type: "UPDATE_AGE", payload: { id, age: age + 5 } });
  };

  // ✅ Function to delete a user from Firestore
  const deleteUser = async (id) => {
    const usersDoc = doc(db, "crud", id); // Get reference to the Firestore document
    await deleteDoc(usersDoc); // Delete the document from Firestore

    // ✅ Remove user from local state immediately after deletion
    dispatch({ type: "DELETE_USER", payload: id });
  };

  return (
    <div>
      {/* Input fields for user details */}
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
      {/* Button to create a new user */}
      <button onClick={createUser}>Create User</button>

      {/* Display user list */}
      {state.users.map((user) => (
        <div key={user.id}>
          <h1>{user.name}</h1>
          <h1>{user.age}</h1>
          {/* Button to update user age */}
          <button onClick={() => updateAge(user.id, user.age)}>
            Update Age
          </button>
          {/* Button to delete user */}
          <button onClick={() => deleteUser(user.id)}>Delete User</button>
        </div>
      ))}
    </div>
  );
};
