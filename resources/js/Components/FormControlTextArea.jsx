import { FormControl, FormErrorMessage, Textarea } from "@chakra-ui/react";
import WhiteText from "./WhiteText";

export default function FormControlTextarea({
    formControlProps = {},
    textProps = {},
    inputProps = {},
    validation,
    children,
}) {
    return (
        <FormControl {...formControlProps} isInvalid={validation}>
            <WhiteText {...textProps}>{children}</WhiteText>
            <Textarea {...inputProps} />
            {validation && <FormErrorMessage>{validation}</FormErrorMessage>}
        </FormControl>
    );
}
