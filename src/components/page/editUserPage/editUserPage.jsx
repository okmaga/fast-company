import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import { useHistory } from "react-router-dom";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import { validator } from "../../../utils/validator";
const EditUserPage = ({ userId }) => {
  const [user, setUser] = useState();
  const [professions, setProfessions] = useState();
  const [qualities, setQualities] = useState({});
  const [errors, setErrors] = useState([]);
  const history = useHistory();
  const validatorConfig = {
    email: {
      isRequired: { message: "Электронная почта обязательна для заполнения" },
      isEmail: { message: "Укажите электронную почту" }
    }
  };
  useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data));
  }, []);
  useEffect(() => {
    api.professions.fetchAll().then((data) => {
      const professionsList = Object.keys(data).map((professionName) => ({
        label: data[professionName].name,
        value: data[professionName]._id
      }));
      setProfessions(professionsList);
    });
    api.qualities.fetchAll().then((data) => {
      const qualitiesList = Object.keys(data).map((optionName) => ({
        label: data[optionName].name,
        value: data[optionName]._id,
        color: data[optionName].color
      }));
      setQualities(qualitiesList);
    });
  }, []);
  useEffect(() => {
    console.log(user);
    validate();
  }, [user]);

  const validate = () => {
    const errors = validator(user, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const getProfessionById = (id) => {
    for (const prof of professions) {
      if (prof.value === id) {
        return { _id: prof.value, name: prof.label };
      }
    }
  };

  const renderUserQualities = (qualities) => {
    const qualitiesList = Object.keys(qualities).map((quality) => ({
      label: qualities[quality].name,
      value: qualities[quality]._id,
      color: qualities[quality].color
    }));
    return qualitiesList;
  };

  const getQualities = (elements) => {
    const qualitiesArray = [];
    for (const elem of elements) {
      for (const quality in qualities) {
        if (elem.value === qualities[quality].value) {
          qualitiesArray.push({
            _id: qualities[quality].value,
            name: qualities[quality].label,
            color: qualities[quality].color
          });
        }
      }
    }
    return qualitiesArray;
  };

  const handleChange = (target) => {
    const { name, value } = target;
    const newValue = name === "profession"
      ? getProfessionById(value)
      : name === "qualities"
        ? getQualities(value)
        : value;
    setUser((prev) => ({ ...prev, [name]: newValue }));
  };

  const isValid = Object.keys(errors).length === 0;
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    api.users.update(userId, user);
    history.push(`/users/${userId}`);
  };
  if (user && professions) {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-10 .offset-md-1 shadow p-4 mx-auto">
            <form onSubmit={handleSubmit}>
              <TextField
                label="Имя"
                name="name"
                value={user.name}
                onChange={handleChange}
              />
              <TextField
                label="Электронная почта"
                name="email"
                value={user.email}
                onChange={handleChange}
                error={errors.email}
              />
              <SelectField
                label="Выберите вашу профессию"
                name="profession"
                value={user.profession._id}
                onChange={handleChange}
                options={professions}
              />
              <RadioField
                options={[{ name: "Мужской", value: "male" }, { name: "Женский", value: "female" }]}
                name="sex"
                onChange={handleChange}
                value={user.sex}
                label="Выберите пол"
              />
              <MultiSelectField
                options={qualities}
                onChange={handleChange}
                name="qualities"
                label="Выберите качества"
                defaultValue={renderUserQualities(user.qualities)}
              />
              <button
                type="submit"
                className="btn btn-primary w-100 mx-auto"
                disabled={!isValid}
              >Обновить</button>
            </form>
          </div>
        </div>
      </div>
    );
  } else {
    return <p>loading...</p>;
  };
};

EditUserPage.propTypes = {
  userId: PropTypes.string
};
export default EditUserPage;
