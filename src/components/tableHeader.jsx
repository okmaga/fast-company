import React from "react";
import PropTypes from "prop-types";

const TableHeader = ({ onSort, selectedSort, columns }) => {
  const handleSort = (item) => {
    if (item === "qualities" || item === "deleteButton") return;
    if (selectedSort.path === item) {
      onSort({ ...selectedSort, order: selectedSort.order === "asc" ? "desc" : "asc" }
      );
    } else {
      onSort({ path: item, order: "asc" });
    };
  };
  console.log(selectedSort);
  console.log(columns);
  console.log(selectedSort === columns[name]);

  return (
    <thead>
      <tr>
        {Object.keys(columns).map((column) => (
          <th
            key={column}
            onClick={columns[column].path ? () => handleSort(columns[column].path) : undefined}
            { ...{ role: columns[column].path && "button" } }
            scope="col"
          >
            {<>
              {selectedSort.path === columns[column].path &&
                selectedSort.order === "asc" &&
                <i className="bi bi-caret-up-fill"></i>
              }
              {selectedSort.path === columns[column].path &&
                selectedSort.order === "desc" &&
                <i className="bi bi-caret-down-fill"></i>
              }
              {columns[column].name}
            </>
            }
          </th>
        ))}
      </tr>
    </thead>
  );
};

TableHeader.propTypes = {
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  columns: PropTypes.object.isRequired
};

export default TableHeader;
