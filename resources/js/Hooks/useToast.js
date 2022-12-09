import { toast } from "@/Utils/toast";
import { usePage } from "@inertiajs/inertia-react";
import { useEffect } from "react";

export default function useToast() {
    const {flash} = usePage().props;

    useEffect(() => {
        if (!Object.values(flash).some((item) => item === null)) {
            toast({
                position: "top-right",
                title: flash.message,
                status: flash.status,
                duration: 4000,
                isClosable: true,
            });
        }
    }, [flash]);
}