import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import EditUserPage from "../components/page/editUserPage";

const Users = () => {
  const params = useParams();
  const { userId, action } = params;

  if (action === "edit") return <EditUserPage userId={userId} />;
  return (
    <>
      { userId ? <UserPage userId={ userId } /> : <UsersListPage /> }
    </>
  );
};

export default Users;
