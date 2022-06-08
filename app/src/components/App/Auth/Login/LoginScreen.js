import useForm from "../../../../core/hooks/useForm";
import useMutation from "../../../../core/hooks/useMutation";
import Alert from "../../../Design/Alert";
import Button from "../../../Design/Buttons/Button";
import Container from "../../../Design/Container";
import FormGroup from "../../../Design/Form/FormGroup";
import Input from "../../../Design/Form/Input";
import Label from "../../../Design/Form/Label";
import { useAuthContext } from "../AuthProvider";
import * as yup from "yup";
import { useTranslation } from "react-i18next";

import { useLocation, useNavigate } from "react-router-dom";

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
});

const defaultData = {
    email: "",
    password: "",
};

const LoginScreen = () => {
    const { t } = useTranslation();
    const { login } = useAuthContext();
    const { isLoading, error, mutate } = useMutation();
    const  navigation  = useNavigate();
    const { values, errors, handleChange, handleSubmit } = useForm(schema, {
        ...defaultData,
    });

    const handleData = (values) => {
        mutate(`${process.env.REACT_APP_API_URL}/login`, {
            method: "POST",
            data: values,
            onSuccess: (data) => {
                login(data);
            },
        });
    };

    const handleRegister = () => {
        navigation("/register");
    }

     return (
        <Container>
            <h1>{t("Login")}</h1>
            <form onSubmit={handleSubmit(handleData)} noValidate={true}>
                {error && <Alert color="danger">{error}</Alert>}
                <FormGroup>
                    <Label htmlFor="email">{t("Email")}</Label>
                    <Input
                        name="email"
                        value={values.email}
                        error={errors.email}
                        disabled={isLoading}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">{t("Password")}</Label>
                    <Input
                        name="password"
                        type="password"
                        value={values.password}
                        error={errors.password}
                        disabled={isLoading}
                        onChange={handleChange}
                    />
                </FormGroup>
                <Button type="submit" disabled={isLoading}>
                    {t("Login")}
                </Button>

            </form>

            <Button type="submit" color="tertiary" disabled={isLoading} onClick={handleRegister}>
                {t("Register")}
            </Button>

        </Container>
    );
};

export default LoginScreen;
