import { useEffect, useState } from "react";

export default function useValidate(fields = [], customValidation = null) {
  const [errors, setErrors] = useState([]);
  const [hasError, setHasError] = useState(false);

  const validate = () => {
    setErrors([]);
    for (let field of fields) {
      if (customValidation) {
        if (!customValidation(field)) {
          setErrors((prev) => [...prev, true]);
        } else {
          setErrors((prev) => [...prev, false]);
        }
      } else if (!field || field.trim() === "") {
        setErrors((prev) => [...prev, true]);
      } else {
        setErrors((prev) => [...prev, false]);
      }
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      setHasError(errors.includes(true));
    } else {
      setHasError(null);
    }
  }, [errors]);

  return { validate, errors, hasError };
}
