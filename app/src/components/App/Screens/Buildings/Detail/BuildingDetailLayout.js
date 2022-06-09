import { Outlet, useParams } from "react-router-dom";
import useFetch from "../../../../../core/hooks/useFetch";
import Alert from "../../../../Design/Alert";
import LoadingIndicator from "../../../Shared/Generic/LoadingIndicator/LoadingIndicator";

const BuildingDetailLayout = () => {
  const { id } = useParams();

  const {
    isLoading,
    error,
    invalidate,
    data: building,
    // refresh,
  } = useFetch(`/buildings/${id}`);

  const handleUpdate = () => {
    invalidate();
  };

  if (error) {
    return <Alert color="danger">{error}</Alert>;
  }

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return <Outlet context={{ building, onBuildingUpdate: handleUpdate }} />;
};

export default BuildingDetailLayout;
