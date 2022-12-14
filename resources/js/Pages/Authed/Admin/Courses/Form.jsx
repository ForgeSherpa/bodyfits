import BackButton from "@/Components/Admin/BackButton";
import Button from "@/Components/Admin/Button";
import FormInput from "@/Components/Admin/FormInput";
import FormTextarea from "@/Components/Admin/FormTextarea";
import GenericPreview from "@/Components/Admin/GenericPreview";
import SelectAutocomplete from "@/Components/Admin/SelectAutocomplete";
import TwoColumn from "@/Components/Admin/TwoColumn";
import Image from "@/Components/Image";
import { Box, Progress, Text } from "@chakra-ui/react";
import { useForm } from "@inertiajs/inertia-react";

export default function Form({ course, trainers, categories }) {
    const initial = {
        title: course ? course.title : "",
        trainer_id: course ? course.trainer_id : 0,
        category_id: course ? course.category_id : 0,
        description: course ? course.description : "",
        _method: course ? "put" : "post",
    };

    const { data, errors, post, processing, setData, progress } =
        useForm(initial);

    const inputChangeHandler = (e) => {
        setData(e.target.name, e.target.value);
    };

    const onTrainerChange = (value) => {
        setData("trainer_id", value.id);
    };

    const onCategoryChange = (value) => {
        setData("category_id", value.id);
    };

    const onPhotoChange = (e) => {
        setData("photo", e.target.files[0]);
    };

    const submitHandler = (e) => {
        e.preventDefault();

        post(
            route(
                !course ? "admin.courses.store" : "admin.courses.update",
                course ? course.id : ""
            ),
            {
                forceFormData: true,
            }
        );

        if (!errors) {
            setData(initial);
        }
    };

    return (
        <GenericPreview name={`${course ? "Edit" : "Create"} Course`}>
            <Head title={`${course ? "Edit" : "Create"} Course`} />
            <form id="formcourse" onSubmit={submitHandler}>
                <Text>{course ? "Current" : "Preview"} Photo</Text>
                <Image
                    outSide={
                        (data.photo && URL.createObjectURL(data.photo)) ||
                        (course
                            ? route("image", course.photo)
                            : route("image", "fallback.webp"))
                    }
                />
                <FormInput
                    title="Photo"
                    placeholder="Your photo"
                    name="name"
                    onChange={onPhotoChange}
                    mt={3}
                    type="file"
                    error={errors.photo}
                />
                {progress && (
                    <Progress colorScheme="yellow" size="xs" isIndeterminate />
                )}
                <TwoColumn gap={3} mt={5}>
                    <FormInput
                        title="Title"
                        placeholder="Course title"
                        value={data.title}
                        name="title"
                        onChange={inputChangeHandler}
                        mt={3}
                        error={errors.title}
                    />
                    <SelectAutocomplete
                        data={trainers}
                        title="name"
                        heading="Trainer"
                        onChange={onTrainerChange}
                        initialData={
                            course ? course.trainer.name : "SELECT TRAINER"
                        }
                        value={data.trainer_id}
                        name="trainer_id"
                        error={errors.trainer_id}
                    />
                    <SelectAutocomplete
                        data={categories}
                        title="name"
                        heading="Category"
                        onChange={onCategoryChange}
                        initialData={
                            course ? course.categories.name : "SELECT CATEGORY"
                        }
                        value={data.category_id}
                        name="category_id"
                        error={errors.category_id}
                    />
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
