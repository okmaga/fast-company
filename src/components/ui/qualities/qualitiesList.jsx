import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { getQualitiesByIds, getQualitiesLoadingStatus, loadQualitiesList } from "../../../store/qualities";
import { useDispatch, useSelector } from "react-redux";

const QualitiesList = ({ qualities }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getQualitiesLoadingStatus());
  const qualitiesList = useSelector(getQualitiesByIds(qualities));
  useEffect(() => {
    dispatch(loadQualitiesList());
  }, []);

  if (isLoading) return "Loading...";

  return (
    <>
      {qualitiesList.map((quality) => (
        <Quality key={quality._id} {...quality} />
      ))}
    </>
  );
};

QualitiesList.propTypes = {
  qualities: PropTypes.array
};
export default QualitiesList;
