import React, { useEffect, useContext, useState } from "react";
import PropTypes from "prop-types";
import userService from "../services/user.service";
import { toast } from "react-toastify";
import { useAuth } from "./useAuth";

const UserContext = React.createContext();

export const useUser = () => {
  return useContext(UserContext);
};

const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    getUsers();
  }, []);
  async function getUsers() {
    try {
      const { content } = await userService.get();
      setUsers(content);
      setIsLoading(false);
    } catch (error) {
      errorCatcher(error);
    };
  };

  useEffect(() => {
    if (!isLoading) {
      const newUsers = [...users];
      const indexUser = newUsers.findIndex(u => u._id === currentUser._id);
      newUsers[indexUser] = currentUser;
      setUsers(newUsers);
    };
  }, [currentUser]);

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
  };
  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    };
  }, [error]);

  function getUserById(userId) {
    return users.find(user => user._id === userId);
  };
  return (
    <UserContext.Provider value={{ users, getUserById }}>
      {!isLoading ? children : "loading..."}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
export default UserProvider;
