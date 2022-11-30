import { Box, Grid } from "@chakra-ui/react";
import Course from "../Home/Course";
import WhiteDivider from "../WhiteDivider";
import WhiteText from "../WhiteText";

export default function List({ item }) {
    if (item.courses.length <= 0) {
        return (
            <>
                <Box my={7} px="10">
                    <WhiteText fontWeight={700} fontSize={48}>
                        {item.name}
                    </WhiteText>
                    <WhiteText
                        textAlign="center"
                        fontWeight="bold"
                        fontSize={36}
                    >
                        Coming Soon
                    </WhiteText>
                </Box>
                <WhiteDivider />
            </>
        );
    }

    return (
        <>
            <Box my={7} px="10">
                <WhiteText fontWeight={700} fontSize={48}>
                    {item.name}
                </WhiteText>
                <Grid
                    gridAutoFlow="column"
                    overflowX="auto"
                    gap={35}
                    css={{
                        "&::-webkit-scrollbar": {
                            display: "none",
                        },
                    }}
                >
                    {item.courses.map((item) => (
                        <Course key={item.id} item={item} />
                    ))}
                </Grid>
            </Box>
            <WhiteDivider />
        </>
    );
}
