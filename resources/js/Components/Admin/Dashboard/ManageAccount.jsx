import { GridItem, Progress, Text } from "@chakra-ui/react";
import { useForm } from "@inertiajs/inertia-react";
import { useEffect } from "react";
import Image from "../../Image";
import Button from "../Button";
import OutlineInput from "../OutlineInput";
import ShadowBox from "../ShadowBox";
import TwoColumn from "../TwoColumn";
import ChangePassword from "./ChangePassword";

export default function ManageAccount({ auth }) {
    // kita ga pake reset ygy, soalnya nanti balik ke initial.
    const { data, processing, setData, post, errors, progress } = useForm({
        name: auth.user.name,
        email: auth.user.email,
        photo: "",
        _method: "put",
    });

    useEffect(() => {
        console.log(errors);
    }, [errors]);

    const profileChangeHandler = (e) => {
        e.preventDefault();

        console.log(data);

        post(route("admin.dashboard"), {
            forceFormData: true,
        });
        setData("photo", "");
    };

    const inputChangeHandler = (e) => {
        setData(e.target.name, e.target.value);
    };

    const onPhotoChange = (e) => {
        setData("photo", e.target.files[0]);
    };

    return (
        <ShadowBox header="Accounts" body="Manage Account">
            <form id="manageAccount" onSubmit={profileChangeHandler}>
                <TwoColumn gap={3}>
                    <GridItem>
                        <OutlineInput
                            placeholder="Your new name"
                            value={data.name}
                            name="name"
                            onChange={inputChangeHandler}
                            error={errors.name}
                        />
                    </GridItem>
                    <GridItem>
                        <OutlineInput
                            placeholder="Your new email"
                            type="email"
                            name="email"
                            onChange={inputChangeHandler}
                            value={data.email}
                            error={errors.email}
                        />
                    </GridItem>
                    <GridItem>
                        <Text>{data.photo ? "Preview" : "Current"} Photo:</Text>
                        <Image
                            outSide={
                                (data.photo &&
                                    URL.createObjectURL(data.photo)) ||
                                route("image", auth.user.photo)
                            }
                        />
                        <OutlineInput
                            mt={5}
                            placeholder="Your new photo"
                            type="file"
                            name="photo"
                            onChange={onPhotoChange}
                            error={errors.photo}
                        />
                        {progress && (
                            <Progress
                                colorScheme="yellow"
                                size="xs"
                                isIndeterminate
                            />
                        )}
                    </GridItem>
                </TwoColumn>
            </form>
            <ChangePassword />
            <Button form="manageAccount" type="submit" isLoading={processing}>
                Submit
            </Button>
        </ShadowBox>
    );
}
