import React from "react";
import { Input } from "@chakra-ui/react";

export default function TransparentInput({ children, ...rest }) {
  return (
    <Input
      border="none"
      bg="rgba(255, 255, 255, 0.37)"
      borderRadius={10}
      color="white"
      _focus={{
        border: "none",
      }}
      {...rest}
    />
  );
}
