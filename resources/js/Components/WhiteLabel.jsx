import { FormLabel } from "@chakra-ui/react";
import React from "react";

export default function WhiteLabel({ children, ...rest }) {
  return (
    <FormLabel color="white" {...rest}>
      {children}
    </FormLabel>
  );
}
