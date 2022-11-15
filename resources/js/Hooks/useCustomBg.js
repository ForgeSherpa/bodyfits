import { COLORS } from "@/Utils/colors";
import { useEffect } from "react";

export default function useCustomBg() {
    useEffect(() => {
        document.body.style.backgroundColor = COLORS.itemTerang;
    }, []);
}
