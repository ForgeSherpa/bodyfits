import { Grid } from "@chakra-ui/react";

export default function TwoColumn(props) {
    return (
        <Grid
            {...props}
            w="full"
            templateColumns={{ base: "none", lg: "1fr 1fr" }}
        ></Grid>
    );
}
