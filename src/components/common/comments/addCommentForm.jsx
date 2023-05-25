import React, { useEffect, useState } from "react";
import SelectField from "../form/selectField";
import TextareaField from "../form/textareaField";
import PropTypes from "prop-types";
import { validator } from "../../../utils/validator";
import api from "../../../api";
const initialData = { userId: "", content: "" };

const AddCommentForm = ({ onSubmit }) => {
  const [data, setData] = useState(initialData);
  const [users, setUsers] = useState({});
  const [errors, setErrors] = useState([]);
  const handleChange = (target) => {
    setData((prev) => ({
      ...prev,
      [target.name]: target.value
    }));
  };
  const validatorConfig = {
    userId: {
      isRequired: { message: "Выберите от чьего имени добавится комментарий" }
    },
    content: {
      isRequired: { message: "Сообщение не может быть пустым" }
    }
  };
  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  useEffect(() => {
    api.users.fetchAll().then(data => setUsers(data));
  }, []);
  const clearForm = () => {
    setData(initialData);
    setErrors({});
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    onSubmit(data);
    clearForm();
  };
  // useEffect(() => {
  //   validate();
  // }, [data]);

  const arrayOfUsers =
    users &&
    Object.keys(users).map((userId) => ({
      label: users[userId].name,
      value: users[userId]._id
    }));
  return (
    <>
      <h2>New comment</h2>
      <form onSubmit={handleSubmit}>
        <SelectField
          onChange={handleChange}
          options={arrayOfUsers}
          name="userId"
          value={data.userId}
          defaultOption="Выберите пользователя"
          error={errors.userId}
        />
        <TextareaField
          value={data.content}
          name="content"
          label="Сообщение"
          onChange={handleChange}
          error={errors.content}
        />
        <div className="d-flex justify-content-end">
          <button className="btn btn-primary">Опубликовать</button>
        </div>
      </form>
    </>
  );
};

AddCommentForm.propTypes = {
  onSubmit: PropTypes.func
};
export default AddCommentForm;
