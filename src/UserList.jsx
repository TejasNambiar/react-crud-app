import React from "react";
import "./styles/UserList.css";

const UserList = ({ users, onUpdateAge, onDeleteUser }) => {
  return (
    <div className="user-table-container">
      <table className="user-table table-bordered">
        <thead>
          <tr>
            <th>Sr.No.</th>
            <th>Name</th>
            <th>Age</th>
            <th>Country</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="user-table-body">
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>{user.country}</td>
              <td className="action-buttons">
                <button onClick={() => onUpdateAge(user.id, user.age)}>
                  Update Age
                </button>
                <button onClick={() => onDeleteUser(user.id)}>
                  Delete User
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
