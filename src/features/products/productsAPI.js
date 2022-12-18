export const productsAPI = async () => {
  const res = await fetch("https://moontech-server-g4u6.onrender.com/blogs");
  const data = await res.json();
  return data.data;
};
