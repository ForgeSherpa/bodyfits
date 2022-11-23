import { COLORS } from "@/Utils/colors";
import { useEffect } from "react";

export default function useAuthBg() {
    useEffect(() => {
        document.body.style.background = "url('bgLogin.webp') no-repeat";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundAttachment = "fixed";

        return () => {
            document.body.style.background = COLORS.itemTerang;
        };
    }, []);
}
