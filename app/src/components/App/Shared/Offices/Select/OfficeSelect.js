import useFetch from "../../../../../core/hooks/useFetch";
import Select from "../../../../Design/Form/Select";

const OfficeSelect = (props) => {
    const { data: offices } = useFetch("/offices");

    const options = offices
        ? offices.map((c) => ({ value: c.id, label: c.name }))
        : null;

    return <Select options={options} {...props} />;
};

export default OfficeSelect;
