import React, { useState } from "react";
import { IconButton, InputGroup, InputRightElement } from "@chakra-ui/react";
import TransparentInput from "./TransparentInput";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function PasswordReveal(props) {
  const [isShowed, setIsShowed] = useState(false);

  return (
    <InputGroup>
      <TransparentInput
        id="password"
        type={isShowed ? "text" : "password"}
        autoComplete="current-password"
        {...props}
      />
      <InputRightElement>
        <IconButton
          bg="transparent"
          _hover={{ color: "whitesmoke", bg: "transparent" }}
          _focus={{ ring: "none" }}
          _active={{ opacity: 0.8 }}
          color="white"
          icon={isShowed ? <FiEye /> : <FiEyeOff />}
          onClick={() => setIsShowed((prev) => !prev)}
        />
      </InputRightElement>
    </InputGroup>
  );
}
