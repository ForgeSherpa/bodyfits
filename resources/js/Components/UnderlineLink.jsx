import WhiteLink from "./Topbar/WhiteLink";

export default function UnderlineLink({ to, children, ...props }) {
    return (
        <WhiteLink
            to={to}
            textDecoration="underline"
            _hover={{
                textShadow: "0 0 10px #ffffff",
            }}
            {...props}
        >
            {children}
        </WhiteLink>
    );
}
