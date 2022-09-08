import axios, { getJWT } from "./axios";

export const getUserPortfolio = async () => {
  const headers = await getJWT();

  try {
    const response = await axios
      .get("api/v1/portfolio/get-portfolio-distribution", headers)
      .catch((error) => {
        throw new Error(error);
      });
    return response;
  } catch (error) {
    console.log(`Error thrown: `, error);
  }
};
