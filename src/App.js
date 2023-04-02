import React, { useEffect, useState } from "react";
import api from "./api";
import Users from "./components/Users";

const App = () => {
  const [users, setUsers] = useState();

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
  }, []);
  const handleDelete = (userId) => {
    setUsers((prev) => prev.filter((user) => user._id !== userId));
  };

  const handleToggleBookmark = (userId) => {
    setUsers((prev) => {
      return prev.map((user) => {
        if (user._id === userId) {
          return { ...user, bookmark: !user.bookmark };
        } else {
          return user;
        }
      });
    });
  };

  return (
    <>
      {users && <Users
        users={users}
        handleDelete={handleDelete}
        handleToggleBookmark={handleToggleBookmark}
      />}
    </>
  );
};

export default App;
