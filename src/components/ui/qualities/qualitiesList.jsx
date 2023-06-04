import React from "react";
import PropTypes from "prop-types";
import Quality from "./qualities";
import { useQuality } from "../../../hooks/useQuality";

const QualitiesList = ({ qualitiesArray }) => {
  const { isLoading, qualities } = useQuality();
  const qualitiesToRender = qualities.filter(quality => qualitiesArray.includes(quality._id));
  if (!isLoading) {
    return (
      <>
        {qualitiesToRender.map((quality) => (
          <Quality
            _id={quality._id}
            name={quality.name}
            key={quality._id}
            color={quality.color}
          />
        ))}
      </>
    );
  } else {
    return "loading...";
  };
};

QualitiesList.propTypes = {
  qualitiesArray: PropTypes.array
};
export default QualitiesList;
