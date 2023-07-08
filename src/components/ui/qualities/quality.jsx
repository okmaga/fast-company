import React from "react";
import PropTypes from "prop-types";

const Quality = ({ color, name, _id }) => {
  return (
    <span className={`badge m-1 text-bg-${color}` } key={_id} >
      {name}
    </span>
  );
};

Quality.propTypes = {
  color: PropTypes.string,
  name: PropTypes.string,
  _id: PropTypes.string
};
export default Quality;
