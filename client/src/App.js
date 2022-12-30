import { Login } from "./pages/Login";
import { Stack } from "@mui/material";
import { SignUp } from "./pages/SignUp";
import { Route, Routes } from "react-router-dom";
import { PrivateOutlet } from "./layouts/PrivateOutlet";
import { Dashboard } from "./pages/Dashboard";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Home } from "./pages/Home";

function App() {
  return (
    <Stack
      sx={{
        width: "100%",
        minHeight: "100vh",
      }}
    >
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/posts" element={<PrivateOutlet />}>
            <Route index element={<Dashboard />} />
          </Route>
        </Routes>
      </ErrorBoundary>
    </Stack>
  );
}

export default App;
