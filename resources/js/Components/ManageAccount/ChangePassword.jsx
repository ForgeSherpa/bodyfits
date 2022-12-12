import FormControlTextarea from "@/Components/FormControlTextArea";
import { Box } from "@chakra-ui/react";
import WhiteText from "@/Components/WhiteText";
import { WrapItem, Wrap, Button } from "@chakra-ui/react";

export default function ChangePassword({ Auth }) {
    return (
        <>
            <Box
                mb={10}
                maxW={1144}
                display="block"
                mx="auto"
                rounded={10}
                bg={COLORS.ijoSoft}
                py={5}
            >
                <WhiteText
                    mt={7}
                    textAlign="center"
                    fontSize={36}
                    fontWeight={700}
                >
                    Change My Password
                </WhiteText>
                <FormControlTextarea
                    formControlProps={{
                        mt: 3,
                        maxW: 620,
                        mx: "auto",
                    }}
                    textProps={{
                        mt: 30,
                        textAlign: "left",
                        fontSize: 16,
                        fontWeight: 500,
                    }}
                    inputProps={{
                        textAlign: "left",
                        bg: COLORS.putihTransparan,
                        rows: 10,
                        placeholder: "Enter your email",
                        name: "content",
                        color: COLORS.putih,
                    }}
                >
                    Email
                </FormControlTextarea>
                <FormControlTextarea
                    formControlProps={{
                        mt: 3,
                        maxW: 620,
                        mx: "auto",
                    }}
                    textProps={{
                        mt: 30,
                        textAlign: "left",
                        fontSize: 16,
                        fontWeight: 500,
                    }}
                    inputProps={{
                        textAlign: "left",
                        bg: COLORS.putihTransparan,
                        rows: 10,
                        placeholder: "Enter a password",
                        name: "content",
                        color: COLORS.putih,
                    }}
                >
                    New Password
                </FormControlTextarea>
                <FormControlTextarea
                    formControlProps={{
                        mt: 3,
                        maxW: 620,
                        mx: "auto",
                    }}
                    textProps={{
                        mt: 30,
                        textAlign: "left",
                        fontSize: 16,
                        fontWeight: 500,
                    }}
                    inputProps={{
                        textAlign: "left",
                        bg: COLORS.putihTransparan,
                        rows: 10,
                        placeholder: "Confirmation password",
                        name: "content",
                        color: COLORS.putih,
                    }}
                >
                    Confirm Password
                </FormControlTextarea>
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    width="100%"
                    py={12}
                    bgPosition="center"
                    bgRepeat="no-repeat"
                    mb={2}
                >
                    <Wrap spacing={4}>
                        <WrapItem>
                            <Button colorScheme="blue">Change</Button>
                        </WrapItem>
                    </Wrap>
                </Box>
            </Box>
        </>
    );
}
