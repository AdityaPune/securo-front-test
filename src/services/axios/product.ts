import axios, { getJWT } from "./axios";

export const findProducts = async () => {
  const header = await getJWT();
  return await axios.get("/api/v1/product/get-products", header);
};
