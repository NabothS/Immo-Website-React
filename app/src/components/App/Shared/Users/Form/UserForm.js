import Button from "../../../../Design/Buttons/Button";
import FormGroup from "../../../../Design/Form/FormGroup";
import Input from "../../../../Design/Form/Input";
import Label from "../../../../Design/Form/Label";
import * as yup from "yup";
import useForm from "../../../../../core/hooks/useForm";
import { useTranslation } from "react-i18next";
import PasswordInput from "../../../../Design/Form/PasswordInput";
import OfficeSelect from "../../Offices/Select/OfficeSelect";
import { useUser } from "../../../Auth/AuthProvider";
import useFetch from "../../../../../core/hooks/useFetch";

// dynamic schema

const getSchema = (isUpdate) => {
  return yup.object().shape({
    name: yup.string().required(),
    surname: yup.string().required(),
    email: yup.string().email().required(),
    password: isUpdate ? yup.string() : yup.string().required(),
    role: yup.string(),
    officeId: yup.number().nullable(),
  });
};

const transformValues = (values) => {
  // don't send password if it's empty
  if (values.password.length === 0) {
    const { password, ...rest } = values; // or use "delete" keyword
    values = rest;
  }
  return values;
};

const UserForm = ({ initialData = {}, disabled, onSubmit, label }) => {
  const {
    data: user,
    // refresh,
  } = useFetch(`/users/${useUser().id}`);

  const { t } = useTranslation();
  const isUpdate = !!initialData.id;
  const { values, errors, handleChange, handleSubmit } = useForm(
    getSchema(isUpdate),
    {
      name: "",
      surname: "",
      email: "",
      password: "",
      role: "",
      officeId: null,
      ...initialData,
    }
  );

  let form;
  let roleSelect;

  if (user) {
    if (values.role === "REALTOR") {
      form = (
        <FormGroup>
          <OfficeSelect
            name="officeId"
            value={values.officeId}
            onChange={handleChange}
            error={errors.officeId}
          />
        </FormGroup>
      );

      roleSelect = (
        <FormGroup>
          <select
            name="role"
            onChange={handleChange}
            value={values.role}
            error={errors.officeId}
          >
            <option value="USER">User</option>
            <option value="REALTOR">Makelaar</option>
            <option value="ADMIN">Admin</option>
          </select>
        </FormGroup>
      );
    } else {
      values.officeId = null;
      form = "";
    }

    console.log(user);

    if (user.role === "REALTOR") {
      form = "";
      roleSelect = "";
      values.role = "REALTOR";
      values.officeId = user.office.id;
    }
  }

  const handleData = (values) => {
    onSubmit(transformValues(values));
  };

  return (
    <form onSubmit={handleSubmit(handleData)} noValidate={true}>
      <FormGroup>
        <Label htmlFor="name">{t("Name")}</Label>
        <Input
          name="name"
          value={values.name}
          disabled={disabled}
          onChange={handleChange}
          error={errors.name}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="surname">{t("Surname")}</Label>
        <Input
          name="surname"
          value={values.surname}
          disabled={disabled}
          onChange={handleChange}
          error={errors.surname}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="email">{t("Email")}</Label>
        <Input
          name="email"
          value={values.email}
          disabled={disabled}
          onChange={handleChange}
          error={errors.email}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="password">{t("Password")}</Label>
        <PasswordInput
          name="password"
          value={values.password}
          disabled={disabled}
          onChange={handleChange}
          error={errors.password}
        />
        {isUpdate && (
          <p className="text-muted">{t("users.edit.password_print")}</p>
        )}
      </FormGroup>

      {roleSelect}

      {form}

      <Button type="submit" disabled={disabled}>
        {label}
      </Button>
    </form>
  );
};

export default UserForm;
