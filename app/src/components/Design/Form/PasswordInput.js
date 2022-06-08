import Button from "../Buttons/Button";
import Input from "./Input";
import InputGroup from "./InputGroup";
import { BiShow, BiHide } from "react-icons/bi";
import { useState } from "react";

const PasswordInput = (props) => {
    const [isVisible, setIsVisible] = useState(true);

    const handleToggleClick = () => {
        setIsVisible(!isVisible);
    };

    return (
        <InputGroup>
            <Input type={isVisible ? "text" : "password"} {...props}>
                <Button color="secondary" onClick={handleToggleClick}>
                    {isVisible ? <BiHide /> : <BiShow />}
                </Button>
            </Input>
        </InputGroup>
    );
};

PasswordInput.propTypes = {
    ...Input.propTypes,
};

export default PasswordInput;
