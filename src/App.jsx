// App.jsx
import React, { useEffect, useReducer } from "react";
import {
  fetchUsers,
  createUser,
  updateAge,
  deleteUser,
} from "./services/UserServices";
import { initialState, userActionReducer } from "./reducers/UserReducer";
import UserForm from "./UserForm";
import UserList from "./UserList";

export const App = () => {
  // ✅ useReducer for state management
  const [state, dispatch] = useReducer(userActionReducer, initialState);

  // ✅ Fetch users when component mounts
  useEffect(() => {
    const getUsers = async () => {
      const usersList = await fetchUsers();
      dispatch({ type: "INITIALIZE", payload: usersList });
    };
    getUsers();
  }, []);

  // ✅ Handle user creation
  const handleCreateUser = async (userDetail) => {
    const newUser = await createUser(userDetail);
    dispatch({ type: "ADD_USER", payload: newUser });
  };

  // ✅ Handle user age update
  const handleUpdateAge = async (id, age) => {
    await updateAge(id, age);
    dispatch({ type: "UPDATE_AGE", payload: { id, age: age + 5 } });
  };

  // ✅ Handle user deletion
  const handleDeleteUser = async (id) => {
    await deleteUser(id);
    dispatch({ type: "DELETE_USER", payload: id });
  };

  return (
    <div>
      <UserForm onCreateUser={handleCreateUser} />
      <UserList
        users={state.users}
        onUpdateAge={handleUpdateAge}
        onDeleteUser={handleDeleteUser}
      />
    </div>
  );
};
