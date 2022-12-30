import { Stack } from "@mui/material";
import { Cards } from "../components/Cards";
import { Sidebar } from "../components/Sidebar";

export const Dashboard = () => {
  return (
    <Stack
      sx={{
        width: "100%",
        flexDirection: "row",
      }}
      gap={2}
    >
      <Sidebar />
      <Cards />
    </Stack>
  );
};
