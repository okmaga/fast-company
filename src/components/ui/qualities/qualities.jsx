import React from "react";
import PropTypes from "prop-types";

const Quality = ({ color, name, _id }) => {
  return (
    <span className={`badge m-1 text-bg-${color}`}>
      {name}
    </span>
  );
};

Quality.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired
};
export default Quality;
