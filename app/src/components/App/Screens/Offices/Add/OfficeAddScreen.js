import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useMutation from "../../../../../core/hooks/useMutation";
import useTitle from "../../../../../core/hooks/useTitle";
import { OfficeRoutes, route } from "../../../../../core/routing";
import Alert from "../../../../Design/Alert";
import BackButton from "../../../../Design/Buttons/BackButton";
import PageHeader from "../../../../Design/PageHeader";
import Title from "../../../../Design/Typography/Title";
import OfficeForm from "../../../Shared/Offices/Form/OfficeForm";

const OfficeAddScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  useTitle(t("Create"));

  const { isLoading, error, mutate } = useMutation();

  const handleSubmit = (data) => {
    mutate(`${process.env.REACT_APP_API_URL}/offices`, {
      method: "POST",
      data,
      multipart: true,
      onSuccess: () => {
        navigate(OfficeRoutes.Index);
      },
    });
  };

  return (
    <>
      <BackButton href={route(OfficeRoutes.Index)} />
      <PageHeader>
        <Title>{t("Create Office")}</Title>
      </PageHeader>
      {error && <Alert color="danger">{error}</Alert>}
      <OfficeForm
        label={t("Create")}
        disabled={isLoading}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default OfficeAddScreen;
