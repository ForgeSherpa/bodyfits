import { makeToast, toast } from "@/Utils/toast";
import { usePage } from "@inertiajs/inertia-react";
import { useEffect } from "react";

export default function useToast() {
    const { flash } = usePage().props;

    useEffect(() => {
        if (!Object.values(flash).some((item) => item === null)) {
            makeToast(flash.message, flash.status);
        }
    }, [flash]);
}
