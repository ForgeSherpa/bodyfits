import { FormControl, FormErrorMessage } from "@chakra-ui/react";
import TransparentInput from "./TransparentInput";
import WhiteText from "./WhiteText";

export default function FormControlInput({
    formControlProps = {},
    textProps = {},
    inputProps = {},
    validation,
    children,
}) {
    return (
        <FormControl {...formControlProps} isInvalid={validation}>
            <WhiteText {...textProps}>{children}</WhiteText>
            <TransparentInput {...inputProps} />
            {validation && <FormErrorMessage>{validation}</FormErrorMessage>}
        </FormControl>
    );
}
