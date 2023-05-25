import React from "react";
import PropTypes from "prop-types";

const TextareaField = ({ name, value, label, onChange, error }) => {
  const handleChange = (e) => {
    onChange({ name, value: e.target.value });
  };
  const getInputClasses = () => {
    return "form-control" + (error ? " is-invalid" : "");
  };
  console.log(error);
  return (
    <div className="mb-4">
      <label htmlFor={name}>{label}</label>
      <div className="input-group has-validation">
        <textarea
          className={getInputClasses()}
          value={value}
          id={name}
          name={name}
          rows="3"
          onChange={handleChange}
        ></textarea>
      </div>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TextareaField.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string
};

export default TextareaField;
