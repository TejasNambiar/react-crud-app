import { db } from "../Firebase-Config";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";

// ✅ Firestore collection reference
const userCollectionRef = collection(db, "crud");

// ✅ Fetch all users from Firestore
export const fetchUsers = async () => {
  const data = await getDocs(userCollectionRef);
  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

// ✅ Create a new user in Firestore
export const createUser = async (userDetail) => {
  const docRef = await addDoc(userCollectionRef, userDetail);
  return { ...userDetail, id: docRef.id }; // Return user with generated ID
};

// ✅ Update a user's age in Firestore
export const updateAge = async (id, age) => {
  const usersDoc = doc(db, "crud", id);
  const updatedAge = { age: age + 5 };

  await updateDoc(usersDoc, updatedAge); // Update Firestore
  return updatedAge; // Return new age for UI update
};

// ✅ Delete a user from Firestore
export const deleteUser = async (id) => {
  const usersDoc = doc(db, "crud", id);
  await deleteDoc(usersDoc); // Remove from Firestore
};
