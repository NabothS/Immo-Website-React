import Button from "../../../../Design/Buttons/Button";
import FormGroup from "../../../../Design/Form/FormGroup";
import Label from "../../../../Design/Form/Label";
import * as yup from "yup";
import useForm from "../../../../../core/hooks/useForm";
import Textarea from "../../../../Design/Form/Textarea";
import { useTranslation } from "react-i18next";
import LogTimeInput from "./LogTimeInput";
import Input from "../../../../Design/Form/Input";
import UserSelect from "../../Users/Select/UserSelect";
import { format } from "date-fns";
import { DATE_API_FORMAT } from "../../../../../core/modules/logs/constants";
import BuildingSelect from "../../Buildings/Select/BuildingSelect";

const schema = yup.object().shape({
  date: yup.string().required(),
  time: yup.number().nullable().min(1).required(),
  description: yup.string().required(),
  projectId: yup.number().nullable().required(),
  userId: yup.number().nullable().required(),
});

const transformInitialData = (initialData) => {
  if (initialData.user) {
    initialData = {
      ...initialData,
      userId: initialData.user.id,
    };
  }
  if (initialData.project) {
    initialData = {
      ...initialData,
      projectId: initialData.project.id,
    };
  }
  return initialData;
};

const defaultData = {
  date: format(new Date(), DATE_API_FORMAT),
  projectId: null,
  userId: null,
  time: null,
  description: "",
};

const defaultOptions = {
  showUser: true,
  showProject: true,
};

const LogForm = ({
  initialData = {},
  disabled,
  onSubmit,
  label,
  options = {},
}) => {
  const { t } = useTranslation();
  const { values, errors, handleChange, handleSubmit } = useForm(schema, {
    ...defaultData,
    ...transformInitialData(initialData),
  });

  const handleData = (values) => {
    onSubmit(values);
  };

  options = { ...defaultOptions, ...options };

  return (
    <form onSubmit={handleSubmit(handleData)} noValidate={true}>
      <FormGroup>
        <Label htmlFor="date">{t("fields.date")}</Label>
        <Input
          name="date"
          value={values.date}
          onChange={handleChange}
          error={errors.date}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="time">{t("fields.time")}</Label>
        <LogTimeInput
          name="time"
          value={values.time}
          onChange={handleChange}
          error={errors.time}
        />
      </FormGroup>
      {options.showProject && (
        <FormGroup>
          <Label htmlFor="buildingId">{t("fields.project")}</Label>
          <BuildingSelect
            name="buildingId"
            value={values.projectId}
            onChange={handleChange}
            error={errors.projectId}
          />
        </FormGroup>
      )}
      {options.showUser && (
        <FormGroup>
          <Label htmlFor="userId">{t("fields.user")}</Label>
          <UserSelect
            name="userId"
            value={values.userId}
            onChange={handleChange}
            error={errors.userId}
          />
        </FormGroup>
      )}
      <FormGroup>
        <Label htmlFor="description">{t("fields.description")}</Label>
        <Textarea
          name="description"
          value={values.description}
          onChange={handleChange}
          error={errors.description}
        />
      </FormGroup>
      <Button type="submit" disabled={disabled}>
        {label}
      </Button>
    </form>
  );
};

export default LogForm;
