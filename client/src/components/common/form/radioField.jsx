import React from "react";
import PropTypes from "prop-types";

const RadioField = ({ options, name, onChange, value, label, error }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };
  const getInputClasses = () => {
    return "form-check form-check-inline" + (error ? " is-invalid" : "");
  };

  return (
    <div className="mb-4">
      <label className="form-label">{label}</label>
      <div>
        {options.map(option => <div
          className={getInputClasses()}
          key={option.name + "_" + option.value}
        >
          <input
            className="form-check-input"
            type="radio"
            name={name}
            id={option.name + "_" + option.value}
            checked={option.value === value}
            value={option.value}
            onChange={handleChange}
          />
          <label
            className="form-check-label"
            htmlFor={option.name + "_" + option.value}>
            {option.name}
          </label>
        </div>)}
        {error && <div className="invalid-feedback">
          {error}
        </div>}
      </div>
    </div>
  );
};

RadioField.propTypes = {
  options: PropTypes.array,
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string
};

export default RadioField;
