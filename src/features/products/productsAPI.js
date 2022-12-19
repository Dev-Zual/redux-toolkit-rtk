import axios from "../../utils/axios.config";

export const fetchProducts = async () => {
  const data = await axios.get("/blogs");

  return data.data.data;
};

export const addProductApi = async (data) => {
  await axios.post("/blog", data);
};
export const deleteProductApi = async (id) => {
  await axios.delete(`/blog/${id}`);
};
