import useFetch from "../../../../../core/hooks/useFetch";
import { formatName } from "../../../../../core/modules/users/utils";
import Select from "../../../../Design/Form/Select";

const UserSelect = (props) => {
    const { data: users } = useFetch("/users");

    const options = users
        ? users.map((u) => ({ value: u.id, label: formatName(u) }))
        : null;

    return <Select options={options} {...props} />;
};

export default UserSelect;
