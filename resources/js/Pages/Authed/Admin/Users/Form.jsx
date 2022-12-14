import BackButton from "@/Components/Admin/BackButton";
import Button from "@/Components/Admin/Button";
import FormInput from "@/Components/Admin/FormInput";
import FormSelect from "@/Components/Admin/FormSelect";
import GenericPreview from "@/Components/Admin/GenericPreview";
import TwoColumn from "@/Components/Admin/TwoColumn";
import Image from "@/Components/Image";
import { Alert, Box, Progress, Text } from "@chakra-ui/react";
import { Head, useForm } from "@inertiajs/inertia-react";

export default function Form({ user }) {
    const { data, errors, post, processing, progress, setData } = useForm({
        name: user ? user.name : "",
        role: user ? user.role : "user",
        email: user ? user.email : "",
        photo: "",
        password: "",
        password_confirmation: "",
        _method: user ? "put" : "post",
    });

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
                !user ? "admin.users.store" : "admin.users.update",
                user ? user.id : ""
            ),
            {
                forceFormData: true,
            }
        );

        if (!errors) {
            setData({
                name: "",
                role: "user",
                email: "",
                photo: "",
                password: "",
                password_confirmation: "",
            });
        }
    };

    return (
        <GenericPreview name={`${user ? "Edit" : "Create"} User`}>
            <Head title={`${user ? "Edit" : "Create"} User`} />
            <form id="formUser" onSubmit={submitHandler}>
                <Text>{user ? "Current" : "Preview"} Photo</Text>
                <Image
                    outSide={
                        (data.photo && URL.createObjectURL(data.photo)) ||
                        (user
                            ? route("image", user.photo)
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
                        title="Email"
                        placeholder="Your email"
                        value={data.email}
                        name="email"
                        onChange={inputChangeHandler}
                        mt={3}
                        error={errors.email}
                    />
                    {user && (
                        <>
                            <Alert>
                                Empty Password if you don't want to update it.
                            </Alert>
                            <Box></Box>
                        </>
                    )}
                    <FormInput
                        title="Password"
                        placeholder="Your password"
                        value={data.password}
                        type="password"
                        name="password"
                        onChange={inputChangeHandler}
                        mt={3}
                        error={errors.password}
                    />
                    <FormInput
                        title="Password Confirmation"
                        placeholder="Your password confirmation"
                        value={data.password_confirmation}
                        type="password"
                        name="password_confirmation"
                        onChange={inputChangeHandler}
                        mt={3}
                        error={errors.password_confirmation}
                    />
                    <FormSelect
                        title="Role"
                        value={data.role}
                        onChange={inputChangeHandler}
                        name="role"
                    >
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </FormSelect>
                </TwoColumn>
            </form>
            <Box mt={5}>
                <Button
                    isLoading={processing}
                    mr={3}
                    form="formUser"
                    type="submit"
                >
                    Submit
                </Button>
                <BackButton
                    disabled={processing}
                    variant="clear"
                    url="admin.users.index"
                />
            </Box>
        </GenericPreview>
    );
}
