import React from "react";
import PropTypes from "prop-types";
import Bookmark from "../common/bookmark";
import Qualities from "./qualities";
import Table from "../common/table";
import { Link } from "react-router-dom";
import Profession from "./profession";

const UserTable = ({ users, onSort, selectedSort, onToggleBookmark, ...rest }) => {
  const columns = {
    name: { path: "name", name: "Имя", component: (user) => (<Link to={`/users/${user._id}`} >{user.name}</Link>) },
    qualities: { name: "Качества", component: (user) => (<Qualities qualities={user.qualities}/>) },
    profession: { name: "Профессия", component: (user) => (<Profession id={user.profession}/>) },
    completedMeetings: { path: "completedMeetings", name: "Встретился, раз" },
    rate: { path: "rate", name: "Оценка" },
    bookmark: {
      path: "bookmark",
      name: "Избранное",
      component: (user) => (
        <Bookmark
          status={user.bookmark}
          onClick={() => onToggleBookmark(user._id)}
        />
      )
    }
  };

  return (
    <Table
      onSort={onSort}
      selectedSort={selectedSort}
      columns={columns}
      data={users}
    />
  );
};

UserTable.propTypes = {
  users: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  onToggleBookmark: PropTypes.func.isRequired
};
export default UserTable;
