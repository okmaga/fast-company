import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Pagination from "./pagination";
import paginate from "../utils/paginate";
import GroupList from "./groupList";
import api from "../api";
import SearchStatus from "./searchStatus";
import UserTable from "./usersTable";
import _ from "lodash";
import UserPage from "./userPage";

const Users = () => {
  const params = useParams();
  const { userId } = params;
  const pageSize = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
  const [userPage, setUserPage] = useState();
  const [users, setUsers] = useState();

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
  }, []);
  const handleDelete = (userId) => {
    setUsers((prev) => prev.filter((user) => user._id !== userId));
  };

  const handleToggleBookMark = (id) => {
    setUsers(
      users.map((user) => {
        if (user._id === id) {
          return { ...user, bookmark: !user.bookmark };
        }
        return user;
      })
    );
    console.log(id);
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
  }, []);

  const handleProfessionSelect = (item) => {
    setSelectedProf(item);
  };

  const handleSort = (item) => {
    setSortBy(item);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  useEffect(() => {
    setUserPage();
  }, [userId]);

  if (userId) {
    api.users.getById(userId).then((data) => {
      if (data) {
        setUserPage(data);
      } else {
        setUserPage({ name: "User Not Found" });
      };
    });
    return (userPage ? <UserPage user={userPage}/> : "loading...");
  };

  if (users) {
    const filteredUsers = selectedProf ? users.filter(user => JSON.stringify(user.profession) === JSON.stringify(selectedProf)) : users;
    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);

    const userCrop = paginate(sortedUsers, currentPage, pageSize);
    const clearFilter = () => {
      setSelectedProf();
    };

    return (
      <div className="d-flex">
        {professions && (
          <div className="d-flex flex-column flex-shrink-0-p-3">
            <GroupList
              selectedItem={selectedProf}
              items={professions}
              onItemSelect={handleProfessionSelect}
            />
            <button className="btn btn-secondary mt-2" onClick={clearFilter}>Очистить</button>
          </div>
        )}
        <div className="d-flex flex-column">
          <SearchStatus length={count} />
          {count > 0 && <UserTable
            users={userCrop}
            onSort={handleSort}
            selectedSort={sortBy}
            onToggleBookmark={handleToggleBookMark}
            onDelete={handleDelete}
          /> }
          <div className="d-flex justify-content-center">
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
  return "loading...";
};

export default Users;
