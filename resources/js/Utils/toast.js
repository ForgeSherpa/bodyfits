import { createStandaloneToast } from "@chakra-ui/react";

export const { ToastContainer, toast } = createStandaloneToast();

export const makeToast = (content, status, message = null) =>
    toast({
        position: "top-right",
        title: content,
        status: status,
        description: message,
        duration: 5000,
        isClosable: true,
    });
