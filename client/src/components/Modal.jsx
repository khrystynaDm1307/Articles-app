import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, CardActions, CardContent } from "@mui/material";
import { PostForm } from "./PostForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 13,
  p: 4,
  borderRadius: 2,
};

export function BasicModal({ open, setOpen, refetch, post }) {
  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {post ? "Edit post" : "Create post"}
        </Typography>
        <CardContent>
          <PostForm handleClose={handleClose} refetch={refetch} post={post} />
        </CardContent>
        <CardActions>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
        </CardActions>
      </Box>
    </Modal>
  );
}
