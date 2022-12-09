import React, { useEffect, useState } from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head, useForm } from "@inertiajs/inertia-react";
import WhiteText from "@/Components/WhiteText";
import Link from "@/Components/Link";
import { Checkbox, Flex } from "@chakra-ui/react";
import BaseAuth from "./BaseAuth";
import useAuthBg from "@/Hooks/useAuthBg";
import resetter from "@/Utils/Resetter";
import useToast from "@/Hooks/useToast";

export default function Login() {
    useAuthBg();
    useToast();
    
    const { data, setData, post, processing, reset } = useForm({
        email: "",
        password: "",
    });

    const [emailHasError, setEmailHasError] = useState(false);
    const [passwordHasError, setPasswordHasError] = useState(false);

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const emailChangeHandler = (event) => {
        setData("email", event.target.value);
    };

    const passwordChangeHandler = (event) => {
        setData("password", event.target.value);
    };

    const loginHandler = (e) => {
        e.preventDefault();
        resetter(false, setEmailHasError, setPasswordHasError);

        post(route("login"), {
            onError: (data) => {
                if ("email" in data) {
                    setEmailHasError(data.email);
                }
                if ("password" in data) {
                    setPasswordHasError(data.password);
                }
            },
        });
    };

    return (
        <BaseAuth
            title="Welcome Back"
            description="Welcome Back! Please enter your details."
            onSubmit={loginHandler}
            watch={processing}
            formHandler={{
                email: data.email,
                onEmail: emailChangeHandler,
                password: data.password,
                onPass: passwordChangeHandler,
            }}
            errorHandler={{
                emailError: emailHasError,
                passwordError: passwordHasError,
            }}
        >
            <Head title="Login" />
            <Flex mt={3} ml={1} justifyContent="space-between">
                <Checkbox color="white" colorScheme="whiteAlpha">
                    Remember for 30 days
                </Checkbox>
                <WhiteText>Forgot Password?</WhiteText>
            </Flex>
            <PrimaryButton
                isLoading={processing}
                w="full"
                mt="14"
                py="5"
                type="submit"
            >
                Sign In
            </PrimaryButton>
            <WhiteText textAlign="center" mt={1}>
                Don't have an account?{" "}
                <Link to="register" fontWeight="bold">
                    Register
                </Link>
            </WhiteText>
        </BaseAuth>
    );
}
