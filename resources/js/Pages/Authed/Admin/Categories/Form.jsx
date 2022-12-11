import BackButton from "@/Components/Admin/BackButton";
import Button from "@/Components/Admin/Button";
import FormInput from "@/Components/Admin/FormInput";
import GenericPreview from "@/Components/Admin/GenericPreview";
import TwoColumn from "@/Components/Admin/TwoColumn";
import { Box } from "@chakra-ui/react";
import { useForm } from "@inertiajs/inertia-react";

export default function Form({ category }) {
    const initial = {
        name: category ? category.name : "",
    };

    const { data, errors, post, put, processing, progress, setData } =
        useForm(initial);

    const inputChangeHandler = (e) => {
        setData(e.target.name, e.target.value);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (category) {
            put(route("admin.categories.update", category.id));
        } else {
            post(route("admin.categories.store"));
        }

        if (!errors) {
            setData(initial);
        }
    };

    return (
        <GenericPreview name={`${category ? "Edit" : "Create"} category`}>
            <form id="formcategory" onSubmit={submitHandler}>
                <TwoColumn gap={3}>
                    <FormInput
                        title="Name"
                        placeholder="Category name"
                        value={data.name}
                        name="name"
                        onChange={inputChangeHandler}
                        mt={3}
                        error={errors.name}
                    />
                </TwoColumn>
            </form>
            <Box mt={5}>
                <Button
                    isLoading={processing}
                    mr={3}
                    form="formcategory"
                    type="submit"
                >
                    Submit
                </Button>
                <BackButton
                    disabled={processing}
                    variant="clear"
                    url="admin.categories.index"
                />
            </Box>
        </GenericPreview>
    );
}
