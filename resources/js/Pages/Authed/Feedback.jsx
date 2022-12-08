import WhiteText from "@/Components/WhiteText";
import useCustomBg from "@/Hooks/useCustomBg";
import { COLORS } from "@/Utils/colors";
import { Box, Button } from "@chakra-ui/react";
import { Head, useForm, usePage } from "@inertiajs/inertia-react";
import { useState, useEffect } from "react";
import TopBar from "@/Components/Topbar/Topbar";
import WhiteDivider from "@/Components/WhiteDivider";
import FormControlInput from "@/Components/FormControlInput";
import FormControlTextarea from "@/Components/FormControlTextArea";
import { toast } from "@/Utils/toast";

const initialErrorState = {
    title: false,
    status: false,
};

export default function Feedback({ auth }) {
    useCustomBg();

    const { flash } = usePage().props;

    const { data, setData, post, processing, reset } = useForm({
        title: "",
        content: "",
    });

    useEffect(() => {
        if (!Object.values(flash).some((item) => item === null)) {
            toast({
                position: "top-right",
                title: flash.message,
                status: flash.status,
                duration: 9000,
                isClosable: true,
            });
        }
    }, [flash]);

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
                    setError((prev) => ({
                        ...prev,
                        content: data.content,
                    }));
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
                                color: COLORS.putih,
                            }}
                            validation={error.content}
                        >
                            please leave your feedback here :
                        </FormControlTextarea>
                        <Button
                            data={{
                                title: data.title,
                                content: data.content,
                            }}
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
