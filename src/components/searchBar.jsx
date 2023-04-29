import React from "react";
import TextField from "./textField";
import PropTypes from "prop-types";

const SearchBar = ({ onChange, value }) => {
  return (
    <TextField
      label=""
      type="text"
      name="search"
      onChange={onChange}
      value={value}
    ></TextField>
  );
};

SearchBar.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string
};
export default SearchBar;
