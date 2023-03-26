import React, { useState } from "react";
import api from "./api";
import Users from "./components/Users";
import SearchStatus from "./components/searchStatus";

const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

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
      <SearchStatus length={users.length} />
      <Users
        users={users}
        handleDelete={handleDelete}
        handleToggleBookmark={handleToggleBookmark}
      />
    </>
  );
};

export default App;
