import { useEffect } from "react";

export default function useResetBg() {
  useEffect(() => {
    document.body.style = "";
  }, []);
}
