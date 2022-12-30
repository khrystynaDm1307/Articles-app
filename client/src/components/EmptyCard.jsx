import * as React from "react";
import { Stack } from "@mui/material";
import { useState } from "react";
import { BasicModal } from "./Modal";

export default function EmptyCard({refetch}) {
  const [open, setOpen] = useState(false);
  const openModal = () => {
    setOpen(true);
  };

  return (
    <>
      <Stack
        sx={{
          width: 345,
          border: "1px solid white",
          m: 1,
          justifyContent: "center",
          alignItems: "center",
          "&:hover": {
            cursor: "pointer",
          },
          minHeight:400,
          maxHeight:600
        }}
        onClick={openModal}
      >
        Create new post +
      </Stack>
      <BasicModal open={open} setOpen={setOpen} refetch={refetch}/>
    </>
  );
}
