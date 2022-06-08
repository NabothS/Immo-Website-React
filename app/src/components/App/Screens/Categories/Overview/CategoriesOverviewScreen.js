import useFetch from "../../../../../core/hooks/useFetch";
import Alert from "../../../../Design/Alert";
import { Link } from "react-router-dom";
import { CategoryRoutes, route } from "../../../../../core/routing";
import LoadingIndicator from "../../../Shared/Generic/LoadingIndicator/LoadingIndicator";
import { useTranslation } from "react-i18next";
import Table from "../../../../Design/Table/Table";
import TableHeader from "../../../../Design/Table/TableHeader";
import TableRow from "../../../../Design/Table/TableRow";
import Title from "../../../../Design/Typography/Title";
import DeleteButton from "../../../Shared/Generic/Buttons/DeleteButton";
import PageHeader from "../../../../Design/PageHeader";
import Button from "../../../../Design/Buttons/Button";
import useTitle from "../../../../../core/hooks/useTitle";
import isVoid from "../../../../../core/helpers/isVoid";
import { getImagePath } from "../../../../../core/helpers/api";
import { useUser } from "../../../Auth/AuthProvider";

const CategoriesOverviewScreen = () => {
    const { t } = useTranslation();
    const {
        isLoading,
        data: categories,
        error,
        invalidate,
    } = useFetch("/categories");

    useTitle(t("Categories"));

    const handleCategoryDelete = () => {
        invalidate();
    };

    if (isLoading) {
        return <LoadingIndicator />;
    }
    if (error) {
        return <Alert color="danger">{error}</Alert>;
    }

    return (
        <>
            <PageHeader>
                <Title>{t("Categories")}</Title>

                <Button href={CategoryRoutes.New}>
                    {t("Create")}
                </Button>
            </PageHeader>
            <Table
                header={
                    <TableHeader>
                        <th>{t("Category")}</th>
                    </TableHeader>
                }>
                {categories.map((category) => (
                    <TableRow key={category.id}>
                        <td>
                            <Link
                                to={route(CategoryRoutes.Detail, {
                                    id: category.id,
                                })}>
                                {category.name}
                            </Link>
                        </td>
                        <td>
                            <DeleteButton
                                size="sm"
                                id={category.id}
                                scope="offices"
                                onSuccess={handleCategoryDelete}
                            />
                        </td>
                    </TableRow>
                ))}
            </Table>
        </>
    );
};

export default CategoriesOverviewScreen;
