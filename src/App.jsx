import { db } from "./Firebase-Config";
import { addDoc, collection, getDocs } from "firebase/firestore";
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
    setAge("");
    setCountry("");
    setAge(0);
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
          </div>
        );
      })}
    </div>
  );
};
