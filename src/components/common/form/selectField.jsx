import React from "react";
import PropTypes from "prop-types";

const SelectField = ({ label, name, value, onChange, disabledDefault, defaultOption, error, options }) => {
  const getInputClasses = () => {
    return "form-select" + (error ? " is-invalid" : "");
  };
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };
  const optionsArray = (!Array.isArray(options) && typeof options === "object")
    ? Object.values(options)
    : options;
  return (
    <div className="mb-4">
      <label htmlFor={name} className="form-label">{label}</label>
      <select
        className={getInputClasses()}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
      >
        {defaultOption && <option disabled={disabledDefault} value="">{defaultOption}</option>}
        {optionsArray && optionsArray.map(option => <option
          key={option.value}
          value={option.value}
        >
          {option.label}
        </option>)}
      </select>
      {error && <div className="invalid-feedback">
        {error}
      </div>}
    </div>
  );
};

SelectField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  defaultOption: PropTypes.string,
  error: PropTypes.string,
  disabledDefault: PropTypes.bool,
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

SelectField.defaultProps = {
  disabledDefault: true
};

export default SelectField;
