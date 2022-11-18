import { COLORS } from "@/Utils/colors";
import { Card as ChakraCard } from "@chakra-ui/react";

export default function Card({ children, ...props }) {
    return (
        <ChakraCard
            backgroundColor={COLORS.ijoGelapKali}
            rounded={40}
            {...props}
        >
            {children}
        </ChakraCard>
    );
}
