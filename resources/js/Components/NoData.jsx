import WhiteText from "./WhiteText";

export default function NoData({
    children,
    modifier,
    fallbackTitle,
    ...props
}) {
    return modifier.length > 0 ? (
        children
    ) : (
        <WhiteText textAlign="center" fontSize="2xl" {...props}>
            {fallbackTitle}
        </WhiteText>
    );
}
