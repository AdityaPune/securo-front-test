import axios from "axios";

axios.defaults.baseURL = "https://test-api.securo.finance";

export const getJWT = async () => {
  const jwt = localStorage.getItem("access_token");
  return { headers: { "Authorization": `Bearer ${jwt}` } }
}

export default axios;
