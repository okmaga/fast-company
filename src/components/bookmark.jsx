import React from "react";
import PropTypes from "prop-types";

const BookMark = ({ status, ...rest }) => {
  return (
    <i
      className={`bi bi-bookmark${status ? "-heart-fill" : ""}`}
      onClick={() => rest.handleToggleBookmark(rest._id)}g
    ></i>
  );
};

BookMark.propTypes = {
  status: PropTypes.bool.isRequired
};
export default BookMark;
