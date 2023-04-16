import React from "react";
import PropTypes from "prop-types";
import QualitiesList from "./qualitiesList";

const UserPage = ({ user }) => {
  if (user.userExists) {
    return (
      <div>
        <h1>{user.name}</h1>
        <h2>Профессия: {user.profession.name}</h2>
        <QualitiesList qualities={user.qualities}/>
        <p>Completed Meetings: {user.completedMeetings}</p>
        <h2>Rate: {user.rate}</h2>
        <div>
          <a className="btn btn-primary" href="/users" role="button">Все пользователи</a>
        </div>
      </div>
    );
  }
  return (<h1>User Not Found</h1>);
};

UserPage.propTypes = {
  user: PropTypes.object.isRequired
};

export default UserPage;
