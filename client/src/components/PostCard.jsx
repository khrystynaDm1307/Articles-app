import * as React from "react";

import {
  Stack,
  Typography,
  Button,
  CardMedia,
  CardContent,
  CardActions,
  Card,
} from "@mui/material";
import { formatDate } from "../utills/helpers/formatDate";
import { useMutation } from "react-query";
import { deletePost } from "../services/post.service";
import { BasicModal } from "./Modal";
import { useState } from "react";

export default function PostCard({ post, refetch }) {
  const { title, creator, link, image, contentSnippet, pubDate } = post || {};
  const deleteMutation = useMutation(deletePost);

  const [open, setOpen] = useState(false);
  const openModal = () => {
    setOpen(true);
  };

  const handleDeletePost = () => {
    deleteMutation.mutate(post.id, {
      onSuccess: () => {
        refetch();
      },
    });
  };

  return (
    <>
      {post ? (
        <Card
          sx={{
            width: 345,
            background: "rgba(255, 255, 255, 0.39)",
            m: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            pb: 2,
          }}
        >
          <Stack>
            {image && <CardMedia sx={{ height: 240 }} image={image} />}

            <CardContent>
              <Stack
                flexDirection={"row"}
                justifyContent="space-between"
                mb={2}
              >
                <Typography color="text.secondary" variant="body2">
                  {creator || ""}
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  {formatDate(pubDate)}
                </Typography>
              </Stack>
              <Typography gutterBottom variant="h5" component="div">
                {title || ""}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {contentSnippet || ""}
              </Typography>
              {link && (
                <a target="_blank" href={link} rel="noreferrer">
                  Read more ...
                </a>
              )}
            </CardContent>
          </Stack>

          <CardActions>
            <Button size="small" onClick={openModal} variant="contained">
              Edit
            </Button>
            <Button size="small" onClick={handleDeletePost} variant="contained">
              Delete
            </Button>
          </CardActions>
          <BasicModal
            open={open}
            setOpen={setOpen}
            refetch={refetch}
            post={post}
          />
        </Card>
      ) : (
        <></>
      )}
    </>
  );
}
