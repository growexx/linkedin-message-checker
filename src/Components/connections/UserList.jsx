import React from 'react';
const UserList = (prop) => {
  const { data } = prop;
  return (
    <div className="user-list">
      {data.map((user, index) => (
        <div className="user" key={index}>
          <h2>{user.name}</h2>
          <button>Message Me</button>
        </div>
      ))}
    </div>
  );
};

export default UserList;
