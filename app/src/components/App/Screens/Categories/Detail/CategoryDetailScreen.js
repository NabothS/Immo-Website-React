import { useTranslation } from "react-i18next";
import { Link, useOutletContext } from "react-router-dom";
import useTitle from "../../../../../core/hooks/useTitle";
import { CategoryRoutes, route } from "../../../../../core/routing";
import BackButton from "../../../../Design/Buttons/BackButton";
import PageHeader from "../../../../Design/PageHeader";
import Title from "../../../../Design/Typography/Title";

const CategoryDetailScreen = () => {
  const { t } = useTranslation();
  const { category } = useOutletContext();

  useTitle(category ? category.name : "");

  return (
    <>
      <BackButton href={route(CategoryRoutes.Index)} />
      <PageHeader>
        <Title>{category.name}</Title>
      </PageHeader>
      <Link to={route(CategoryRoutes.Edit, { id: category.id })}>
        {t("Edit")}
      </Link>
    </>
  );
};

export default CategoryDetailScreen;
