import BackButton from "@/Components/Admin/BackButton";
import Button from "@/Components/Admin/Button";
import FormInput from "@/Components/Admin/FormInput";
import FormTextarea from "@/Components/Admin/FormTextarea";
import GenericPreview from "@/Components/Admin/GenericPreview";
import TwoColumn from "@/Components/Admin/TwoColumn";
import Image from "@/Components/Image";
import { Box, Progress, Text } from "@chakra-ui/react";
import { Head, useForm } from "@inertiajs/inertia-react";

export default function Form({ trainer }) {
    const initial = {
        name: trainer ? trainer.name : "",
        age: trainer ? trainer.age : 18,
        nationality: trainer ? trainer.nationality : "",
        photo: trainer ? trainer.photo : "",
        contact: trainer ? trainer.contact : "",
        description: trainer ? trainer.description : "",
        job: trainer ? trainer.job : "",
        _method: trainer ? "put" : "post",
    };

    const { data, errors, post, processing, progress, setData } =
        useForm(initial);

    const inputChangeHandler = (e) => {
        setData(e.target.name, e.target.value);
    };

    const onPhotoChange = (e) => {
        setData("photo", e.target.files[0]);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        post(
            route(
                !trainer ? "admin.trainers.store" : "admin.trainers.update",
                trainer ? trainer.id : ""
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
        <GenericPreview name={`${trainer ? "Edit" : "Create"} Trainer`}>
            <Head title={`${trainer ? "Edit" : "Create"} Trainer`} />
            <form id="formtrainer" onSubmit={submitHandler}>
                <Text>{trainer ? "Current" : "Preview"} Photo</Text>
                <Image
                    outSide={
                        (data.photo && URL.createObjectURL(data.photo)) ||
                        (trainer
                            ? route("image", trainer.photo)
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
                <TwoColumn gap={3}>
                    <FormInput
                        title="Name"
                        placeholder="Your name"
                        value={data.name}
                        name="name"
                        onChange={inputChangeHandler}
                        mt={3}
                        error={errors.name}
                    />
                    <FormInput
                        title="Age"
                        placeholder="Your age"
                        value={data.age}
                        name="age"
                        type="number"
                        onChange={inputChangeHandler}
                        mt={3}
                        error={errors.age}
                        min={18}
                    />
                    <FormInput
                        title="Nationality"
                        placeholder="Your nationality"
                        value={data.nationality}
                        name="nationality"
                        onChange={inputChangeHandler}
                        mt={3}
                        error={errors.nationality}
                    />
                    <FormInput
                        title="Primary Job"
                        placeholder="Your Primary Job"
                        value={data.job}
                        name="job"
                        onChange={inputChangeHandler}
                        mt={3}
                        error={errors.job}
                    />
                    <FormInput
                        title="Phone Number"
                        placeholder="Your Phone Number "
                        value={data.contact}
                        name="contact"
                        onChange={inputChangeHandler}
                        mt={3}
                        error={errors.contact}
                    />
                    <FormTextarea
                        title="Description"
                        placeholder="Your description"
                        value={data.description}
                        name="description"
                        onChange={inputChangeHandler}
                        mt={3}
                        error={errors.description}
                    />
                </TwoColumn>
            </form>
            <Box mt={5}>
                <Button
                    isLoading={processing}
                    mr={3}
                    form="formtrainer"
                    type="submit"
                >
                    Submit
                </Button>
                <BackButton
                    disabled={processing}
                    variant="clear"
                    url="admin.trainers.index"
                />
            </Box>
        </GenericPreview>
    );
}
