import React from "react";

const UserList = ({ users, onUpdateAge, onDeleteUser }) => {
  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <h1>{user.name}</h1>
          <h1>{user.age}</h1>
          <button onClick={() => onUpdateAge(user.id, user.age)}>
            Update Age
          </button>
          <button onClick={() => onDeleteUser(user.id)}>Delete User</button>
        </div>
      ))}
    </div>
  );
};

export default UserList;
