import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

export default function useAlert() {
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    let timer;
    if (alert) {
      timer = setTimeout(() => {
        setAlert(false);
      }, 2500);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [alert]);

  const AlertElement = (props) => {
    if (alert) {
      return (
        <Alert rounded="lg" my={3} status={alert.status} {...props}>
          <AlertIcon />
          <AlertTitle>{alert.value}</AlertTitle>
        </Alert>
      );
    }
    return <></>;
  };

  return {
    alert,
    setAlert,
    AlertElement,
  };
}
