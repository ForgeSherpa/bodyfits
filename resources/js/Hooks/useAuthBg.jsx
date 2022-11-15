import { useEffect } from "react";

export default function useAuthBg() {
    useEffect(() => {
        document.body.style.background =
            "url('../images/bgLogin.jpg') no-repeat";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundAttachment = "fixed";
    }, []);
}
