import Button from "../../../../Design/Buttons/Button";
import FormGroup from "../../../../Design/Form/FormGroup";
import Input from "../../../../Design/Form/Input";
import Label from "../../../../Design/Form/Label";
import * as yup from "yup";
import useForm from "../../../../../core/hooks/useForm";
import { useTranslation } from "react-i18next";
import OfficeSelect from "../../Offices/Select/OfficeSelect";
import FileInput from "../../../../Design/Form/FileInput";
import CategorySelect from "../../Categories/Select/CategorySelect";
import { useUser } from "../../../Auth/AuthProvider";
import useFetch from "../../../../../core/hooks/useFetch";

const schema = yup.object().shape({
    
});


const BuildingForm = ({ initialData = {}, disabled, onSubmit, label }) => {

    
    const {
        data: user,
        // refresh,
    } = useFetch(`/users/${useUser().id}`);


    const { t } = useTranslation();
    const { values, errors, handleChange, handleSubmit } = useForm(schema, {
        categoryId: "",
        size:"",
        buy_rent:"rent",
        year:"",
        street:"",
        number:"",
        city:"",
        price:"",
        officeId:"",
        ...initialData,
    });
    
    let form;

    if(user){
        if(user.role = "ADMIN"){
            form = <FormGroup>
                        <Label htmlFor="officeId">{t("Real Estate Office")}</Label>
                        <OfficeSelect
                            name="officeId"
                            value={values.officeId}
                            onChange={handleChange}
                            error={errors.officeId}
                        />
                    </FormGroup>
        }
        else {
            values.officeId = user.office.id;
            form ='';
        }

        if(user.office != null){
            values.officeId = user.office.id;
            form = '';
        }
    }



    const handleData = (values) => {
        console.log(values);
        onSubmit(values);
    };

    console.log(values);

    return (
        <form onSubmit={handleSubmit(handleData)} noValidate={true}>
            <FormGroup>
                <Label htmlFor="avatar">{t("Avatar")}</Label>
                <FileInput
                    name="avatar"
                    value={values.avatar}
                    disabled={disabled}
                    onChange={handleChange}
                    error={errors.avatar}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="categoryId">{t("Type")}</Label>
                <CategorySelect
                    name="categoryId"
                    value={values.categoryId}
                    onChange={handleChange}
                    error={errors.categoryId}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="size">{t("Size in m³")}</Label>
                <Input
                    name="size"
                    value={values.size}
                    onChange={handleChange}
                    error={errors.size}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="buy_rent">{t("For Rent / Sale")}</Label>
                <select onChange={handleChange} name="buy_rent" value={values.buy_rent}>
                    <option value="rent">{t('For Rent')}</option>
                    <option value="sale">{t('For Sale')}</option>
                </select>
            </FormGroup>
            <FormGroup>
                <Label htmlFor="year">{t("Built Year")}</Label>
                <Input
                    name="year"
                    value={values.year}
                    onChange={handleChange}
                    error={errors.year}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="street">{t("Street")}</Label>
                <Input
                    name="street"
                    value={values.street}
                    onChange={handleChange}
                    error={errors.street}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="number">{t("Number")}</Label>
                <Input
                    name="number"
                    value={values.number}
                    onChange={handleChange}
                    error={errors.number}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="city">{t("City")}</Label>
                <Input
                    name="city"
                    value={values.city}
                    onChange={handleChange}
                    error={errors.city}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="price">{t("Price Per Month")}</Label>
                <Input
                    name="price"
                    value={values.price}
                    onChange={handleChange}
                    error={errors.price}
                />
            </FormGroup>
            {form}
            <Button type="submit" disabled={disabled}>
                {label}
            </Button>
        </form>
    );
};

export default BuildingForm;
