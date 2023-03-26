import React from "react";
import Quality from "./qualities";
import Bookmark from "./bookmark";
import PropTypes from "prop-types";

const User = ({ user, handleDelete, handleToggleBookmark }) => {
  return (
    <tr key={user._id}>
      <td>{user.name} </td>

      <td>
        {user.qualities.map((quality) => (
          <Quality key={quality._id} {...quality} />
        ))}
      </td>

      <td>{user.profession.name}</td>

      <td>{user.completedMeetings}</td>
      <td>{user.rate} / 5</td>
      <td>
        <Bookmark
          status={user.bookmark}
          {...user}
          handleToggleBookmark={handleToggleBookmark}
        />
      </td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => handleDelete(user._id)}
        >
          delete
        </button>
      </td>
    </tr>
  );
};

User.propTypes = {
  key: PropTypes.number.isRequired,
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    profession: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired,
    qualities: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired
    })).isRequired,
    completedMeetings: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    bookmark: PropTypes.bool.isRequired
  }).isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleToggleBookmark: PropTypes.func.isRequired
};

export default User;
