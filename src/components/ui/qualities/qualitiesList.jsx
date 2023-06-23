import React from "react";
import PropTypes from "prop-types";
import Quality from "./qualities";
import { useQuality } from "../../../hooks/useQuality";

const QualitiesList = ({ qualities }) => {
  const { isLoading } = useQuality();
  if (!isLoading) {
    return (
      <>
        {qualities.map((quality) => (
          <Quality key={quality} id={quality} />
        ))}
      </>
    );
  } else {
    return "loading...";
  };
};

QualitiesList.propTypes = {
  qualities: PropTypes.array
};
export default QualitiesList;
