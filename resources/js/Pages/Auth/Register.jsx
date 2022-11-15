import React, { useEffect, useState } from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head, useForm } from "@inertiajs/inertia-react";
import WhiteText from "@/Components/WhiteText";
import Link from "@/Components/Link";
import TransparentInput from "@/Components/TransparentInput";
import WhiteLabel from "@/Components/WhiteLabel";
import BaseAuth from "./BaseAuth";
import { FormControl, FormErrorMessage } from "@chakra-ui/react";
import useAuthBg from "@/Hooks/useAuthBg";
import resetter from "@/Utils/Resetter";

export default function Register() {
    useAuthBg();
    const { data, setData, post, processing, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const [nameError, setNameError] = useState(false);
    const [emailHasError, setEmailHasError] = useState(false);
    const [passwordHasError, setPasswordHasError] = useState(false);

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const onChangeHandler = (event) => {
        setData(event.target.name, event.target.value);
    };

    useEffect(() => {
        setData("password_confirmation", data.password);
    }, [data.password]);

    const registerHandler = (e) => {
        e.preventDefault();
        resetter(false, setNameError, setEmailHasError, setPasswordHasError);

        post(route("register"), {
            onError: (error) => {
                if ("email" in error) {
                    setEmailHasError(error.email);
                }
                if ("password" in error) {
                    setPasswordHasError(error.password);
                }
                if ("name" in error) {
                    setNameError(error.name);
                }
                console.log(error);
            },
        });
    };

    return (
        <BaseAuth
            title="Create New Account"
            description="Please enter your desired cresidentials."
            extraField={
                <FormControl isInvalid={nameError}>
                    <WhiteLabel htmlFor="name">Name</WhiteLabel>
                    <TransparentInput
                        id="name"
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={onChangeHandler}
                        disabled={processing}
                    />
                    {nameError && (
                        <FormErrorMessage>{nameError}.</FormErrorMessage>
                    )}
                </FormControl>
            }
            onSubmit={registerHandler}
            formHandler={{
                email: data.email,
                onEmail: onChangeHandler,
                password: data.password,
                onPass: onChangeHandler,
            }}
            errorHandler={{
                emailError: emailHasError,
                passwordError: passwordHasError,
            }}
            watch={processing}
        >
            <Head title="Register" />
            <PrimaryButton
                isLoading={processing}
                w="full"
                mt="14"
                py="5"
                type="submit"
            >
                Continue
            </PrimaryButton>
            <WhiteText textAlign="center" mt={1}>
                Have an account?{" "}
                <Link to="login" fontWeight="bold">
                    Sign In
                </Link>
            </WhiteText>
        </BaseAuth>
    );
}
