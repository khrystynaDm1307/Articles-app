import { Button, CardActions, Stack } from "@mui/material";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <Stack
      sx={{
        width: "100%",
        height: "90vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CardActions>
        <Link to="/login">
          <Button variant="contained">Login</Button>
        </Link>
        <Link to="/signup">
          <Button variant="contained">Sign Up</Button>
        </Link>
      </CardActions>
    </Stack>
  );
};
