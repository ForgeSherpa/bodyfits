import { Box, CardBody } from "@chakra-ui/react";
import Card from "../Card";
import Image from "../Image";
import UnderlineLink from "../UnderlineLink";
import WhiteText from "../WhiteText";

export default function Course() {
    return (
        <Card w={582} h={342}>
            <CardBody py={2} px={1}>
                <Image
                    src="courses/example.jpg"
                    query="fit=crop-top&crop=577,159&w=577&h=159"
                    rounded={40}
                    borderBottomRadius={0}
                />
                <Box position="relative" px={35} py={3}>
                    <WhiteText fontWeight="bold" fontSize={36}>
                        Chest
                    </WhiteText>
                    <WhiteText>
                        Bulking your half by doing 3-4 weeks exercises
                    </WhiteText>
                    <UnderlineLink
                        to="home"
                        fontWeight="bold"
                        fontSize={36}
                        position="absolute"
                        right={10}
                        bottom={-14}
                    >
                        Go
                    </UnderlineLink>
                </Box>
            </CardBody>
        </Card>
    );
}
