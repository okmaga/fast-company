import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getProfession, getProfessionsLoadingStatus } from "../../store/professions";

const Profession = ({ id }) => {
  const isLoading = useSelector(getProfessionsLoadingStatus());
  const profession = useSelector(getProfession(id));
  if (!isLoading) {
    return <p>{profession ? profession.name : "Unknown"}</p>;
  } else {
    return "loading...";
  };
};

Profession.propTypes = {
  id: PropTypes.string
};
export default Profession;
