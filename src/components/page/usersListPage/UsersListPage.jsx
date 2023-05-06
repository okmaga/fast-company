import React, { useState, useEffect } from "react";
import Pagination from "../../common/pagination";
import paginate from "../../../utils/paginate";
import GroupList from "../../common/groupList";
import api from "../../../api";
import SearchStatus from "../../ui/searchStatus";
import UserTable from "../../ui/usersTable";
import _ from "lodash";
import SearchBar from "../../ui/searchBar";

const UsersListPage = () => {
  const pageSize = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
  const [users, setUsers] = useState();
  const [searchQuery, setSearchQuery] = useState("");

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
    setSearchQuery("");
  };

  const handleSort = (item) => {
    setSortBy(item);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  const handleSearch = (target) => {
    const query = target.value.toString().toLowerCase();
    setSelectedProf();
    setSearchQuery(query);
  };

  if (users) {
    const filteredUsers =
      selectedProf
        ? users.filter(user => JSON.stringify(user.profession) === JSON.stringify(selectedProf))
        : searchQuery
          ? users.filter(user => user.name.toString().toLowerCase().includes(searchQuery))
          : users;
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
          <SearchBar onChange={handleSearch} value={searchQuery}/>
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

export default UsersListPage;
