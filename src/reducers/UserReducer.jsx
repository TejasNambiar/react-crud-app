// ✅ Initial state: Starts with an empty user list
export const initialState = {
  users: [],
};

// ✅ Reducer function for managing user state
export const userActionReducer = (state, action) => {
  switch (action.type) {
    case "INITIALIZE":
      return { users: action.payload }; // Load users from Firestore

    case "ADD_USER":
      return { users: [...state.users, action.payload] }; // Add new user to state

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
