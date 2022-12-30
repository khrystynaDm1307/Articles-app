import { Paper } from "@mui/material";
import { Container } from "@mui/system";

export const AuthLayout = ({ children }) => {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Paper
        sx={{
          width: "100%",
          maxWidth: "500px",
          padding: "50px 30px",
          background: "rgba(255, 255, 255, 0.39)",
          borderRadius: "16px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.03)",
        }}
      >
        {children}
      </Paper>
    </Container>
  );
};
