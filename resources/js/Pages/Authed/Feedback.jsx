import FormControlInput from "@/Components/FormControlInput";
import FormControlTextarea from "@/Components/FormControlTextArea";
import TopBar from "@/Components/Topbar/Topbar";
import TransparentInput from "@/Components/TransparentInput";
import WhiteDivider from "@/Components/WhiteDivider";
import WhiteText from "@/Components/WhiteText";
import useCustomBg from "@/Hooks/useCustomBg";
import { COLORS } from "@/Utils/colors";
import { Box, Button, useToast } from "@chakra-ui/react";
import { Head, useForm, usePage } from "@inertiajs/inertia-react";
import { useState } from "react";

const initialErrorState = {
    title: false,
    status: false,
};

export default function Feedback({ auth }) {
    useCustomBg();

    const { flash } = usePage().props;

    const toast = useToast();

    const { data, setData, post, processing, reset } = useForm({
        title: "",
        content: "",
    });

    if (flash) {
        toast({
            title: flash.message,
            status: flash.status,
            description: "We've created your account for you.",
            duration: 9000,
            isClosable: true,
        });
    }

    const [error, setError] = useState(initialErrorState);

    const inputChangeHandler = (e) => {
        setData(e.target.name, e.target.value);
    };

    const feedbackSubmit = (e) => {
        e.preventDefault();
        setError(initialErrorState);

        post(route("feedback"), {
            onError: (data) => {
                if ("title" in data) {
                    setError((prev) => ({ ...prev, title: data.title }));
                }

                if ("content" in data) {
                    setError((prev) => ({ ...prev, content: data.content }));
                }
            },
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <>
            <Head title="Feedback" />
            <TopBar auth={auth} />
            <Box mt={14} px={130}>
                <Box
                    mb={10}
                    maxW={1144}
                    display="block"
                    mx="auto"
                    rounded={10}
                    bg={COLORS.putihSgtTransparan}
                    py={5}
                >
                    <WhiteText
                        pt={7}
                        textAlign="center"
                        fontSize={60}
                        fontWeight={700}
                    >
                        Feedback
                    </WhiteText>
                    <WhiteDivider borderBottomWidth={3} />
                    <form onSubmit={feedbackSubmit}>
                        <FormControlInput
                            formControlProps={{
                                mx: "auto",
                                mt: 3,
                                maxW: 620,
                            }}
                            textProps={{
                                mt: 50,
                                textAlign: "center",
                                fontWeight: 500,
                            }}
                            inputProps={{
                                name: "title",
                                onChange: inputChangeHandler,
                                value: data.title,
                                placeholder: "Write Here",
                            }}
                            validation={error.title}
                        >
                            What is your opinion about the website?
                        </FormControlInput>
                        <FormControlTextarea
                            formControlProps={{
                                mt: 3,
                                maxW: 620,
                                mx: "auto",
                            }}
                            textProps={{
                                mt: 30,
                                textAlign: "center",
                                fontSize: 16,
                                fontWeight: 500,
                            }}
                            inputProps={{
                                bg: COLORS.putihTransparan,
                                rows: 10,
                                placeholder: "Write your feedback here",
                                name: "content",
                                onChange: inputChangeHandler,
                                value: data.content,
                            }}
                            validation={error.content}
                        >
                            please leave your feedback here :
                        </FormControlTextarea>
                        <Button
                            bg={COLORS.putihTransparan}
                            py={2}
                            px={16}
                            color={COLORS.putih}
                            mx="auto"
                            display="block"
                            mt={5}
                            isLoading={processing}
                            type="submit"
                        >
                            Send
                        </Button>
                    </form>
                </Box>
            </Box>
        </>
    );
}
