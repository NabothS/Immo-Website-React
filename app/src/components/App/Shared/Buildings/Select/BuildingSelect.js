import useFetch from "../../../../../core/hooks/useFetch";
import Select from "../../../../Design/Form/Select";

const BuildingSelect = (props) => {
    const { data: projects } = useFetch("/buildings");

    const options = projects
        ? projects.map((p) => ({ value: p.id, label: p.name }))
        : null;

    return <Select options={options} {...props} />;
};

export default BuildingSelect;
