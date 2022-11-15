import React from "react";
import { Text } from "@chakra-ui/react";

export default function WhiteText({ children, ...rest }) {
  return (
    <Text {...rest} color="white">
      {children}
    </Text>
  );
}
