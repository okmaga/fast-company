import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import api from "../../api";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";

const RegisterForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    profession: "",
    sex: "male",
    qualities: [],
    license: false
  });
  const [errors, setErrors] = useState([]);
  const [professions, setProfessions] = useState();
  const [qualities, setQualities] = useState({});
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

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };
  const validatorConfig = {
    email: {
      isRequired: { message: "Электронная почта обязательна для заполнения" },
      isEmail: { message: "Укажите электронную почту" }
    },
    password: {
      isRequired: { message: "Пароль обязателен для заполнения" },
      isCapitalSymbol: { message: "Пароль должен содержать хотя бы одну заглавную букву" },
      isContainDigit: { message: "Пароль должен содержать хотя бы одну цифру" },
      min: { message: "Пароль должен содержать не менее 8 символов", value: 8 }
    },
    profession: {
      isRequired: { message: "Обязательно выберите профессию" }
    },
    sex: {
      isRequired: { message: "Обязательно выберите свой пол" }
    },
    license: {
      isRequired: { message: "Для продолжения необходимо принять условия лицензионного соглашения" }
    }
  };

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const { profession, qualities } = data;
    console.log({
      ...data,
      profession: getProfessionById(profession),
      qualities: getQualities(qualities)
    });
  };

  const getProfessionById = (id) => {
    for (const prof of professions) {
      if (prof.value === id) {
        return { _id: prof.value, name: prof.label };
      }
    }
  };
  const getQualities = (elements) => {
    console.log("elements", elements);
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

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Электронная почта"
          name="email"
          value={data.email}
          onChange={handleChange}
          error={errors.email}
        />
        <TextField
          label="Пароль"
          type="password"
          name="password"
          value={data.password}
          onChange={handleChange}
          error={errors.password}
        />
        <SelectField
          label="Выберите вашу профессию"
          value={data.profession}
          name="profession"
          onChange={handleChange}
          defaultOption="Choose..."
          options={professions}
          error={errors.profession}
        />
        <RadioField
          options={[{ name: "Мужской", value: "male" }, { name: "Женский", value: "female" }]}
          name="sex"
          label="Выберите ваш пол"
          onChange={handleChange}
          value={data.sex}
          error={errors.sex}
        />
        <MultiSelectField
          options={qualities}
          onChange={handleChange}
          defaultValue={data.qualities}
          name="qualities"
          label="Выберите ваши качества"
        />
        <CheckBoxField
          name="license"
          value={data.license}
          onChange={handleChange}
          error={errors.license}
        >Я согласен с <a>лицензионным соглашением</a></CheckBoxField>
        <button type="submit" disabled={!isValid} className="btn btn-primary w-100 mx-auto">Submit</button>
      </form>
    </div>
  );
};

export default RegisterForm;
