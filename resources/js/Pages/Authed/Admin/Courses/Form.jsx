import BackButton from "@/Components/Admin/BackButton";
import Button from "@/Components/Admin/Button";
import FormInput from "@/Components/Admin/FormInput";
import FormSelect from "@/Components/Admin/FormSelect";
import FormTextarea from "@/Components/Admin/FormTextarea";
import GenericPreview from "@/Components/Admin/GenericPreview";
import TwoColumn from "@/Components/Admin/TwoColumn";
import { Box } from "@chakra-ui/react";
import { useForm } from "@inertiajs/inertia-react";

export default function Form({ course, trainers, categories }) {
    const initial = {
        title: course ? course.title : "",
        trainer_id: course ? course.trainer_id : "",
        category_id: course ? course.category_id : "",
        description: course ? course.description : "",
    };

    const { data, errors, post, put, processing, setData } = useForm(initial);

    const inputChangeHandler = (e) => {
        setData(e.target.name, e.target.value);
    };

    const submitHandler = (e) => {
        e.preventDefault();

        if (course) {
            put(route("admin.courses.update", course.id));
        } else {
            post(route("admin.courses.store"));
        }

        if (!errors) {
            setData(initial);
        }
    };

    return (
        <GenericPreview name={`${course ? "Edit" : "Create"} course`}>
            <form id="formcourse" onSubmit={submitHandler}>
                <TwoColumn gap={3}>
                    <FormInput
                        title="Title"
                        placeholder="Course title"
                        value={data.title}
                        name="title"
                        onChange={inputChangeHandler}
                        mt={3}
                        error={errors.title}
                    />
                    <FormSelect
                        title="Trainer"
                        value={data.trainer_id}
                        name="trainer_id"
                        onChange={inputChangeHandler}
                    >
                        {trainers.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </FormSelect>
                    <FormSelect
                        title="Category"
                        value={data.category_id}
                        name="category_id"
                        onChange={inputChangeHandler}
                    >
                        {categories.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </FormSelect>
                </TwoColumn>
                <FormTextarea
                    title="Description"
                    placeholder="Your description"
                    value={data.description}
                    name="description"
                    onChange={inputChangeHandler}
                    error={errors.description}
                />
            </form>
            <Box mt={5}>
                <Button
                    isLoading={processing}
                    mr={3}
                    form="formcourse"
                    type="submit"
                >
                    Submit
                </Button>
                <BackButton
                    disabled={processing}
                    variant="clear"
                    url="admin.courses.index"
                />
            </Box>
        </GenericPreview>
    );
}
