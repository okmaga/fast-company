import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import EditUserPage from "../components/page/editUserPage";
import UserProvider from "../hooks/useUsers";

const Users = () => {
  const params = useParams();
  const { userId, action } = params;
  return (
    <>
      <UserProvider>
        { userId ? (
          action === "edit" ? (
            <EditUserPage userId={userId} />
          ) : (
            <UserPage userId={ userId } />
          )
        ) : (
          <UsersListPage />
        )}
      </UserProvider>
    </>
  );
};

export default Users;
