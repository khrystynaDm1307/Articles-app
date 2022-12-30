import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import { useFormik } from "formik";
import { useMutation } from "react-query";
import { createPost, editPost } from "../services/post.service";
import validationSchema from "../utills/validators/post.schema";
import { Input } from "./Input";
import _ from "lodash";

const initialValues = {
  title: "",
  creator: "",
  contentSnippet: "",
  link: "",
  image: "",
};

export function PostForm({ handleClose, refetch, post }) {
  const createPostMutation = useMutation(createPost);
  const editPostMutation = useMutation(editPost);

  const handleSubmit = (values, formik) => {
    post
      ? editPostMutation.mutate(
          { postData: values, id: post.id },
          {
            onSuccess: () => {
              handleClose();
              refetch();
            },
          }
        )
      : createPostMutation.mutate(values, {
          onSuccess: () => {
            handleClose();
            refetch();
          },
          onError: (err) => {
            formik.setFieldError("contentSnippet", err.message);
          },
        });
  };

  const postFieldsToEdit = _.pick(post, [
    "title",
    "creator",
    "contentSnippet",
    "link",
    "image",
  ]);

  const formik = useFormik({
    initialValues: post ? postFieldsToEdit : initialValues,
    onSubmit: handleSubmit,
    validationSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={2}>
        <Input formik={formik} name="title" />
        <Input formik={formik} name="creator" />

        <Input
          formik={formik}
          name="link"
          label="Link to read more"
          multiline
          rows={3}
        />
        <Input
          formik={formik}
          name="image"
          label="Link to image"
          multiline
          rows={3}
        />

        <Input
          formik={formik}
          name="contentSnippet"
          label="Content snippet"
          multiline
          rows={6}
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Save
        </Button>
      </Stack>
    </form>
  );
}
