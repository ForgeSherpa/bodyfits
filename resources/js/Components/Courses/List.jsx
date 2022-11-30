import { Box, Grid } from "@chakra-ui/react";
import Course from "../Home/Course";
import WhiteDivider from "../WhiteDivider";
import WhiteText from "../WhiteText";

export default function List() {
    return (
        <>
            <WhiteDivider />
            <Box my={7} px="10">
                <WhiteText fontWeight={700} fontSize={48}>
                    Playlist
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
                    <Course />
                    <Course />
                    <Course />
                    <Course />
                    <Course />
                    <Course />
                    <Course />
                    <Course />
                    <Course />
                </Grid>
            </Box>
            <WhiteDivider />
        </>
    );
}
