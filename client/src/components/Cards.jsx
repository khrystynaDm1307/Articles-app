import { Pagination, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { getPosts } from "../services/post.service";
import { useRouterQuery } from "../utills/hooks/useRouterQuery";
import EmptyCard from "./EmptyCard";
import { Loader } from "./Loader";
import PostCard from "./PostCard";

const SIZE = 7;

export const Cards = () => {
  const query = useRouterQuery();
  const navigate = useNavigate();
  const page = Number(query.get("page"));
  const sort = query.get("sort");
  const search = query.get("search");

  const { data, isLoading, error, refetch } = useQuery(
    "getPosts",
    () => getPosts({ page, size: SIZE, sort, search }),
    {
      keepPreviousData: true,
      staleTime: 5000,
    }
  );

  const handlePageChange = (e, newPage) => {
    const searchParam = search ? `&search=${search}` : "";
    const sortParam = sort ? `&sort=${sort}` : "";

    navigate({
      pathname: `/posts`,
      search: `?page=${newPage}${searchParam}${sortParam}`,
    });
  };

  useEffect(() => {
    if (!page) {
      navigate(`/posts?page=1`);
    }
    refetch(page);
  }, [page, refetch, navigate, sort, search]);

  if (isLoading) return <Loader />;
  if (error) return <Typography>{error.message}</Typography>;

  return (
    <Stack alignItems={"center"}>
      <Stack
        sx={{
          width: "100%",
          height: "100%",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around",
          paddingTop: 4,
        }}
      >
        <EmptyCard refetch={refetch} />
        {data &&
          data?.rows?.map((post) => (
            <PostCard post={post} key={post.id} refetch={refetch} />
          ))}
      </Stack>
      
      <Pagination
        count={Math.ceil(data?.count / SIZE)}
        color="primary"
        sx={{ mb: 2 }}
        onChange={handlePageChange}
        page={page}
      />
    </Stack>
  );
};
