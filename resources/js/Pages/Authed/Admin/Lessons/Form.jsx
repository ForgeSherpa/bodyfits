import Button from "@/Components/Admin/Button";
import FormInput from "@/Components/Admin/FormInput";
import FormSelect from "@/Components/Admin/FormSelect";
import GenericPreview from "@/Components/Admin/GenericPreview";
import TwoColumn from "@/Components/Admin/TwoColumn";
import query from "@/Utils/query";
import { Box, Grid, Text } from "@chakra-ui/react";
import { Head, useForm } from "@inertiajs/inertia-react";
import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import useCheckQuery from "@/Hooks/Admin/useCheckQuery";
import { COLORS } from "@/Utils/colors";

export default function Form({ lesson }) {
    const initial = {
        course_id: lesson ? lesson.course_id : query("from"),
        type: lesson ? lesson.type : "video",
        content: lesson ? lesson.content : "",
        link: lesson ? lesson.link : "",
        length: lesson ? lesson["length"] : "",
        title: lesson ? lesson.title : "",
    };

    const { data, errors, post, put, processing, setData } = useForm(initial);
    const [append, setAppend] = useState(lesson ? lesson.durationPlural : "");
    const [duration, setDuration] = useState(
        lesson ? lesson.duration : "second"
    );

    const { element } = useCheckQuery();

    if (element) return element;

    const inputChangeHandler = (e) => {
        setData(e.target.name, e.target.value);
    };

    const onDurationChange = (e) => {
        setDuration(e.target.value);
    };

    const lengthChangeHandler = (e) => {
        if (e.target.value > 1) {
            setAppend("s");
        } else {
            setAppend("");
        }

        setData("length", e.target.value);
    };

    const contentChangeHandler = (value) => {
        setData("content", value);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (lesson) {
            put(
                route("admin.lessons.update", {
                    lessons: lesson.id,
                    from: query("from"),
                }),
                {
                    data: {
                        length: `${data["length"]} ${duration}${append}`,
                    },
                }
            );
        } else {
            post(route("admin.lessons.store", { from: query("from") }));
        }

        if (!errors) {
            setData(initial);
        }
    };

    return (
        <GenericPreview name={`${lesson ? "Edit" : "Create"} Lesson`}>
            <Head title={`${lesson ? "Edit" : "Create"} Feedback`} />
            <form id="formlesson" onSubmit={submitHandler}>
                <TwoColumn gap={3}>
                    <FormInput
                        title="Title"
                        placeholder="Lesson title"
                        value={data.title}
                        type="text"
                        name="title"
                        onChange={inputChangeHandler}
                        mt={3}
                        error={errors.title}
                    />
                    <Box>
                        <Grid
                            templateColumns="1fr minmax(100px,150px)"
                            alignItems="center"
                        >
                            <FormInput
                                title="Length"
                                placeholder="Lesson length"
                                value={data["length"]}
                                type="number"
                                name="length"
                                onChange={lengthChangeHandler}
                                mt={3}
                                borderColor={
                                    errors["length"]
                                        ? "red.400"
                                        : COLORS.admin.black
                                }
                            />
                            <FormSelect
                                borderLeft="none"
                                borderColor={
                                    errors["length"]
                                        ? "red.400"
                                        : COLORS.admin.black
                                }
                                title="Duration"
                                mt={3}
                                onChange={onDurationChange}
                                value={duration}
                            >
                                <option value={`second`}>Second{append}</option>
                                <option value={`minute`}>Minute{append}</option>
                                <option value={`hour`}>Hour{append}</option>
                            </FormSelect>
                        </Grid>
                        {errors["length"] && (
                            <Text color="red.400">{errors["length"]}</Text>
                        )}
                    </Box>
                    <FormSelect
                        title="Lesson Type"
                        name="type"
                        onChange={inputChangeHandler}
                        value={data.type}
                        mb={10}
                    >
                        <option value="video">Video</option>
                        <option value="text">Text</option>
                    </FormSelect>
                </TwoColumn>
                {data.type === "video" ? (
                    <FormInput
                        title="Video Link (Youtube)"
                        placeholder="Lesson link"
                        value={data.link}
                        type="url"
                        name="link"
                        onChange={inputChangeHandler}
                        error={errors.link}
                    />
                ) : (
                    <Box>
                        <CKEditor
                            editor={ClassicEditor}
                            data={data.content}
                            onReady={() => {
                                console.log("Editor is ready to use!");
                            }}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                contentChangeHandler(data);
                            }}
                        />
                        {errors.content && (
                            <Text color="red.400">{errors.content}</Text>
                        )}
                    </Box>
                )}
            </form>
            <Box mt={5}>
                <Button
                    isLoading={processing}
                    mr={3}
                    form="formlesson"
                    type="submit"
                >
                    Submit
                </Button>
                <Button
                    disabled={processing}
                    variant="clear"
                    onClick={() => history.back()}
                >
                    <FiArrowLeft /> Back
                </Button>
            </Box>
        </GenericPreview>
    );
}
