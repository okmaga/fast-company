import React, { useState } from "react";
import User from "./user";
import Pagination from "./pagination";
import paginate from "../utils/paginate";
import PropTypes from "prop-types";
const Users = ({ users, ...rest }) => {
  const count = users.length;
  const pageSize = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const userCrop = paginate(users, currentPage, pageSize);

  const columns = {
    name: "Имя",
    qualities: "Качества",
    profession: "Профессия",
    completedMeetings: "Встретился, раз",
    rate: "Оценка",
    favourite: "Избранное",
    deleteButton: ""
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  return (
    <>
      {count > 0 && (
        <table className="table">
          <thead>
            <tr>
              {Object.entries(columns).map((entry) => (
                <th key={entry[0]}>{entry[1]}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {userCrop.map((user) => (
              <User
                key={user._id}
                user={user}
                handleDelete={rest.handleDelete}
                handleToggleBookmark={rest.handleToggleBookmark}
              />
            ))}
          </tbody>
        </table>
      )}
      <Pagination
        itemsCount={count}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

Users.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Users;
