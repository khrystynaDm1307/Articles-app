import { CircularProgress, Stack } from "@mui/material";

export const Loader = () => {
  <Stack
    sx={{
      width: "100%",
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <CircularProgress />
  </Stack>;
};
