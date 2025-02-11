import { db } from "./Firebase-Config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";

export const App = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [age, setAge] = useState(0);
  const userCollectionRef = collection(db, "crud");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);
      console.log(data);
      const docRef = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      console.log(docRef);
      setUsers(docRef);
    };
    getUsers();
  }, []);

  const createUser = async () => {
    await addDoc(userCollectionRef, { name: name, age: age, country: country });
    setAge(0);
    setCountry("");
    setAge(0);
  };

  const updateAge = async (id, age) => {
    console.log(id, age);
    const usersDoc = doc(db, "crud", id);
    const newAge = { age: age + 5 };
    await updateDoc(usersDoc, newAge);
  };

  const deletUser = async (id) => {
    const usersDoc = doc(db, "crud", id);
    console.log(id);
    await deleteDoc(usersDoc);
  };

  // console.log("users:\n", users);
  return (
    <div>
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
      <button onClick={createUser}>Create User</button>
      {users.map((user) => {
        return (
          <div>
            <h1>{user.name}</h1>
            <h1>{user.age}</h1>
            <button onClick={() => updateAge(user.id, user.age)}>
              Update Age
            </button>
            <button onClick={() => deletUser(user.id)}>Delete User</button>
          </div>
        );
      })}
    </div>
  );
};
