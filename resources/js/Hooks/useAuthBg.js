import { useEffect } from "react";

export default function useAuthBg() {
    useEffect(() => {
        document.body.style.background =
            "url('/storage/images/bgLogin.webp') no-repeat";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundAttachment = "fixed";
    }, []);
}
