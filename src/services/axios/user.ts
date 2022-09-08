import { IUser } from "../../interfaces/user";
import axios, { getJWT } from "./axios";

export const registerUser = async (
  emailAddress: string,
  password: string,
  firstName: string
) => {
  return await axios.post("/api/v1/user/register", {
    emailAddress,
    password,
    firstName,
  });
};

export const getProfile = async () => {
  const headers = await getJWT();

  try {
    const response = await axios
      .get("/api/v1/user/get-profile", headers)
      .catch((error) => {
        throw new Error(error);
      });
    return response;
  } catch (error) {
    console.log(`Error thrown: `, error);
  }
};

export const getBuinessProfile = async (userID: any) => {
  const headers = await getJWT();

  try {
    const response = await axios
      .post("/api/v1/business-user/get-profile", { userID: userID }, headers)
      .catch((error) => {
        throw new Error(error);
      });

    return response;
  } catch (error) {
    console.log(`Error thrown: `, error);
  }
};
