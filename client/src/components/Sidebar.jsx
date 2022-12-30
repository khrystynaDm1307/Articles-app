import { Button, Divider, MenuItem, Stack, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utills/hooks/useAuth";
import { useRouterQuery } from "../utills/hooks/useRouterQuery";
import { Input } from "./Input";
import { Logout } from "./Logout.jsx";

const SORT_TYPES = [
  {
    label: "Title ASC",
    value: "title-ASC",
  },
  {
    label: "Title DESC",
    value: "title-DESC",
  },
  {
    label: "Date ASC",
    value: "pubDate-ASC",
  },
  {
    label: "Date DESC",
    value: "pubDate-DESC",
  },
];

export const Sidebar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const query = useRouterQuery();
  const sort = query.get("sort");
  const search = query.get("search");

  const handleSubmit = (values) => {
    const { search, sort } = values;

    navigate(
      `/posts?page=1${search && `&search=${search}`}${sort && `&sort=${sort}`}`
    );
  };

  const initialValues = {
    search: search || "",
    sort: sort || "pubDate-DESC",
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
  });

  return (
    <Stack
      sx={{
        p: 2,
        width: "300px",
        background: "rgba(255, 255, 255, 0.39)",
        height: "auto",
        minHeight: "100vh",
        boxSizing: "border-box",
      }}
    >
      <Typography variant="h6">{user?.email}</Typography>
      <Logout />
      <Divider />

      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={2} marginTop={2}>
          <Input size="small" name="search" formik={formik} />
          <Input
            select
            label="Sort by"
            name="sort"
            formik={formik}
            size="small"
          >
            {SORT_TYPES.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Input>

          <Button type="submit" variant="contained">
            OK
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};
