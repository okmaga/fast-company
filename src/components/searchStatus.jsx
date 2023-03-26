import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ length }) => {
  const renderPhrase = (length) => {
    if (!length) return `Никто не тусанет с тобой сегодня`;
    return `${length} человек тусанут с тобой сегодня`;
  };

  return (
    <h2>
      <span className={`badge ${length ? "bg-primary" : "bg-danger"}`}>
        {renderPhrase(length)}
      </span>
    </h2>
  );
};

SearchStatus.propTypes = {
  length: PropTypes.number.isRequired
};
export default SearchStatus;
