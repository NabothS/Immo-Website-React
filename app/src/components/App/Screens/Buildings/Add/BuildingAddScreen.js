import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useMutation from "../../../../../core/hooks/useMutation";
import useTitle from "../../../../../core/hooks/useTitle";
import { BuildingRoutes, route } from "../../../../../core/routing";
import Alert from "../../../../Design/Alert";
import BackButton from "../../../../Design/Buttons/BackButton";
import PageHeader from "../../../../Design/PageHeader";
import Title from "../../../../Design/Typography/Title";
import BuildingForm from "../../../Shared/Buildings/Form/BuildingForm";

const BuildingAddScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { isLoading, error, mutate } = useMutation();

  useTitle(t("Add Buildings"));

  const handleSubmit = (data) => {
    mutate(`${process.env.REACT_APP_API_URL}/buildings`, {
      method: "POST",
      data,
      multipart: true,
      onSuccess: () => {
        navigate(BuildingRoutes.Index);
      },
    });
  };

  return (
    <>
      <BackButton href={route(BuildingRoutes.Index)} />
      <PageHeader>
        <Title>{t("Register a Building")}</Title>
      </PageHeader>
      {error && <Alert color="danger">{error}</Alert>}
      <BuildingForm
        label={t("Create")}
        disabled={isLoading}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default BuildingAddScreen;
