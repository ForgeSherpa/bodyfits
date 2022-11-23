import { COLORS } from "@/Utils/colors";
import { Box, CardBody } from "@chakra-ui/react";
import Card from "../Card";
import Image from "../Image";
import UnderlineLink from "../UnderlineLink";
import WhiteText from "../WhiteText";

export default function Trainer() {
    return (
        <Card
            position="relative"
            bg={COLORS.itemSoft}
            w={431}
            h={520}
            overflow="hidden"
        >
            <CardBody>
                <Image src="trainer_no_pic.png" mx="auto" />
            </CardBody>
            <Box
                position="absolute"
                px={35}
                bg={COLORS.ijoGelapKali}
                bottom={0}
                width="full"
                textAlign="center"
                minH={127}
                py={23}
            >
                <WhiteText fontWeight={600} fontSize={32}>
                    Delvin Jason
                </WhiteText>
                <UnderlineLink to="home">see profile</UnderlineLink>
            </Box>
        </Card>
    );
}
