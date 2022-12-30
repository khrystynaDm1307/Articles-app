import { api } from "../http/api";

export const getPosts = async ({ page, size, sort, search }) => {
  const searchParam = search ? `&search=${search}` : "";
  const sortParam = sort ? `&sort=${sort}` : "";

  const response = await api.get(
    `/posts?page=${page || 1}&size=${size || 10}${searchParam}${sortParam}`
  );
  return response.data;
};

export const createPost = async (post) => {
  await api.post(`/posts`, { post });
};

export const editPost = async (post) => {
  const { id, postData } = post || {};
  await api.put(`/posts/${id}`, { post: postData });
};

export const deletePost = async (id) => {
  return api.delete(`/posts/${id}`);
};
