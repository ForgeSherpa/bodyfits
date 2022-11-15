import PasswordReveal from "@/Components/PasswordReveal";
import TransparentInput from "@/Components/TransparentInput";
import WhiteLabel from "@/Components/WhiteLabel";
import WhiteText from "@/Components/WhiteText";
import { Box, Flex, FormControl, FormErrorMessage } from "@chakra-ui/react";
import React from "react";

export default function BaseAuth({
    title,
    description,
    extraField = <></>,
    onSubmit,
    formHandler,
    errorHandler,
    watch,
    children,
}) {
    return (
        <Flex flexDirection="row" minH="100vh" w="full" p={0} m={0}>
            <Box
                w={{ base: "100%", md: "50%", lg: "35%" }}
                bg="rgba(20, 62, 68, 0.87)"
                m={0}
                p={20}
                position="relative"
            >
                <WhiteText
                    fontWeight={700}
                    fontSize={40}
                    position="absolute"
                    top={33}
                    left={66}
                >
                    BodyFits
                </WhiteText>
                <WhiteText mt="28" fontWeight={400} fontSize={44}>
                    {title}
                </WhiteText>
                <WhiteText fontWeight={300} fontSize={16}>
                    {description}
                </WhiteText>
                <form style={{ marginTop: 20 }} onSubmit={onSubmit}>
                    {extraField}
                    <FormControl isInvalid={errorHandler.emailError}>
                        <WhiteLabel htmlFor="email">Email</WhiteLabel>
                        <TransparentInput
                            id="email"
                            type="email"
                            name="email"
                            onChange={formHandler.onEmail}
                            value={formHandler.email}
                            autoComplete="username"
                            disabled={watch}
                        />
                        {errorHandler.emailError && (
                            <FormErrorMessage>
                                {errorHandler.emailError}
                            </FormErrorMessage>
                        )}
                    </FormControl>
                    <FormControl isInvalid={errorHandler.passwordError}>
                        <WhiteLabel htmlFor="password">Password</WhiteLabel>
                        <PasswordReveal
                            name="password"
                            onChange={formHandler.onPass}
                            value={formHandler.password}
                            disabled={watch}
                        />
                        {errorHandler.passwordError && (
                            <FormErrorMessage>
                                {errorHandler.passwordError}
                            </FormErrorMessage>
                        )}
                    </FormControl>
                    {children}
                </form>
            </Box>
            <Box
                h="full"
                w={{ base: "0%", lg: "55%" }}
                display={{ base: "none", lg: "block" }}
            ></Box>
        </Flex>
    );
}
