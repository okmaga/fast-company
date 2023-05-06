import React from "react";
import PropTypes from "prop-types";

const CheckBoxField = ({ name, value, onChange, error, children }) => {
  const getInputClasses = () => {
    return "form-check-input" + (error ? " is-invalid" : "");
  };

  const handleChange = ({ target }) => {
    onChange({ name, value: !value });
  };

  return (
    <div className="form-check mb-4">
      <input
        className={getInputClasses()}
        type="checkbox"
        value={value}
        id={name}
        name={name}
        onChange={handleChange}
        checked={value}
      />
      <label className="form-check-label" htmlFor={name}>
        {children}
      </label>
      {error && <div className="invalid-feedback">
        {error}
      </div>
      }
    </div>
  );
};

CheckBoxField.propTypes = {
  name: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func,
  error: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default CheckBoxField;
