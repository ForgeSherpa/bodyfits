import BackButton from "./BackButton";
import GenericPreview from "./GenericPreview";

export default function GenericDetail({ name, mainUrl, children }) {
    return (
        <GenericPreview name={name + " Detail:"}>
            {children}
            <BackButton url={mainUrl} />
        </GenericPreview>
    );
}
