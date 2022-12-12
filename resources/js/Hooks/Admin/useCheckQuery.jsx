import Link from "@/Components/Link";
import query from "@/Utils/query";
import { Alert, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function useCheckQuery() {
    const [invalidPage, setInvalidPage] = useState(null);

    // check query from
    const checkFromQuery = async () => {
        try {
            const res = await fetch(
                route("admin.lessons.check", { from: query("from") }),
                {
                    Accept: "application/json",
                }
            );
            const json = await res.json();
            setInvalidPage(json.check);
        } catch (err) {
            console.error(err);
            setInvalidPage(false);
        }
    };

    useEffect(() => {
        checkFromQuery();
    }, []);

    let element = null;

    if (invalidPage === null) {
        element = <Spinner />;
    } else if (!invalidPage) {
        element = (
            <Alert status="error">
                Something went wrong: From Query is Invalid or Missing.
                <Link ml={1} to="admin.courses.index" color="blue">
                    Go Back
                </Link>
            </Alert>
        );
    } else {
        element = null;
    }

    return { element };
}
