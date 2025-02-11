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

export const App = () => {
  const initialState = {
    name: "",
    age: 0,
    country: "",
  };

  // State variables for managing users and input fields
  const [userDetail, setUserDetail] = useState(initialState);

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
      // setUsers(docRef); // Update state with fetched user data
      let state = { input: docRef };
      console.log("state: \n", state);
      dispatch({ type: "INITIALIZE", payload: docRef });
    };

    getUsers();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Function to create a new user in Firestore
  const createUser = async () => {
    await addDoc(userCollectionRef, {
      name: input.name,
      age: parseInt(input.age),
      country: input.country,
    }); // Add user to Firestore
    // Reset input fields after creation
    setUserDetail(initialState);
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

  const userActionReducer = (state, action) => {
    switch (action.type) {
      case "INITIALIZE":
        return { input: action.payload };
      case "CREATE":
        return createUser();
      case "UPDATE":
        return updateAge(action.payload.id, action.payload.age);
      case "DELETE":
        return deletUser(action.payload.id);
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(userActionReducer, userCollectionRef);

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
      <button onClick={() => dispatch({ type: "CREATE" })}>Create User</button>

      {/* Display user list */}
      {state.input?.map((user) => {
        return (
          <div key={user.id}>
            <h1>{user.name}</h1>
            <h1>{user.age}</h1>
            {/* Button to update user age */}
            <button
              onClick={() =>
                dispatch({
                  type: "UPDATE",
                  payload: { id: user.id, age: user.age },
                })
              }
            >
              Update Age
            </button>
            {/* Button to delete user */}
            <button
              onClick={() =>
                dispatch({ type: "DELETE", payload: { id: user.id } })
              }
            >
              Delete User
            </button>
          </div>
        );
      })}
    </div>
  );
};
