import useFetch from "../../../../../core/hooks/useFetch";
import Select from "../../../../Design/Form/Select";

const CategorySelect = (props) => {
  const { data: categories } = useFetch("/categories");

  const options = categories
    ? categories.map((c) => ({ value: c.id, label: c.name }))
    : null;

  return <Select options={options} {...props} />;
};

export default CategorySelect;
