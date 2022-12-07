import { COLORS } from "@/Utils/colors";
import {
    GridItem,
    AccordionItem,
    Box,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from "@chakra-ui/react";
import WhiteText from "../WhiteText";

export default function QA({ question, answer }) {
    return (
        <GridItem>
            <AccordionItem border="none" color={COLORS.putih}>
                <AccordionButton>
                    <Box flex="1" textAlign="left">
                        <WhiteText fontWeight={700} fontSize={20}>
                            {question}
                        </WhiteText>
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                    <WhiteText>{answer}</WhiteText>
                </AccordionPanel>
            </AccordionItem>
        </GridItem>
    );
}
