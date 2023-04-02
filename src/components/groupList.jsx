import React from "react";
import PropTypes from "prop-types";

const GroupList = ({ items, valueProperty, contentProperty, onItemSelect, selectedItem }) => {
  const isItemsArray = Array.isArray(items);

  if (isItemsArray) {
    return (
      <ul className="list-group">
        {items.map((item) => {
          return (<li
            className={"list-group-item" + (item === selectedItem ? " active" : "")}
            key={item[valueProperty]}
            onClick={() => onItemSelect(item)}
            role="button"
          >{item[contentProperty]}</li>);
        })}
      </ul>
    );
  } else {
    return (
      <ul className="list-group">
        {Object.keys(items).map((item) => {
          return (<li
            className={"list-group-item" + (items[item] === selectedItem ? " active" : "")}
            key={items[item][valueProperty]}
            onClick={() => onItemSelect(items[item])}
            role="button"
          >{items[item][contentProperty]}</li>);
        })}
      </ul>
    );
  }
};

GroupList.defaultProps = {
  valueProperty: "_id",
  contentProperty: "name"
};

GroupList.propTypes = {
  items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  valueProperty: PropTypes.string.isRequired,
  contentProperty: PropTypes.string.isRequired,
  onItemSelect: PropTypes.func.isRequired,
  selectedItem: PropTypes.object
};

export default GroupList;
