import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";
import { useProfessions } from "../../hooks/useProfession";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { getQualities } from "../../store/qualities";

const RegisterForm = () => {
  const history = useHistory();
  const [data, setData] = useState({
    email: "",
    name: "",
    password: "",
    profession: "",
    sex: "male",
    qualities: [],
    license: false
  });
  const { signUp } = useAuth();
  const [errors, setErrors] = useState([]);
  const qualities = useSelector(getQualities());
  const qualitiesList = qualities.map(q => ({ label: q.name, value: q._id }));
  const { professions } = useProfessions();
  const professionsList = professions.map(p => ({ label: p.name, value: p._id }));
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
    name: {
      isRequired: { message: "Имя обязательно для заполнения" },
      min: { message: "Имя не может быть менее 3 символов", value: 3 }
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const newData = { ...data, qualities: data.qualities.map(q => q.value) };
    try {
      await signUp(newData);
      history.push("/");
    } catch (error) {
      setErrors(error);
    };
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
          label="Имя"
          name="name"
          value={data.name}
          onChange={handleChange}
          error={errors.name}
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
          options={professionsList}
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
          options={qualitiesList}
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
