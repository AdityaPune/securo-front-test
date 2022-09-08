import axios, { getJWT } from "./axios";

export const userUpdateData = async (data: any) => {
  const {
    firstName,
    lastName,
    dateofBirth,
    street,
    city,
    state,
    country,
    postalCode,
  } = data;

  const headers = await getJWT();

  try {
    const response = await axios
      .post(
        "/api/v1/user/update-profile",
        {
          firstName,
          lastName,
          dateofBirth,
          street,
          city,
          state,
          country,
          postalCode,
        },
        headers
      )
      .catch((error) => {
        throw new Error(error);
      });
    return response;
  } catch (error) {
    console.log(`Error thrown: `, error);
  }
};

export const businessUserUpdateData = async (data: any) => {
  const {
    businessIncorporationDate,
    businessName,
    companyJurisdictionCode,
    companyName,
    contactName,
    companyRegistrationNumber,
    country,
    postalCode,
    state
  } = data;


  const headers = await getJWT();

  try {
    const response = await axios
      .post(
        "/api/v1/business-user/update-profile",
        {
          companyName,
          phoneNumber: "",
          businessType: "Corporate",
          contactName,
          companyRegistrationNumber,
          companyJurisdictionCode,
          businessName,
          businessIncorporationDate,
          state,
          country,
          postalCode,
        },
        headers
      )
      .catch((error) => {
        throw new Error(error);
      });
    return response;
  } catch (error) {
    console.log(`Error thrown: `, error);
  }

  console.log(data, "data")
}

export const userHasUpdatedCity = async () => {
  const headers = await getJWT();

  try {
    const response = await axios
      .get("/api/v1/user/get-profile", headers)
      .catch((error) => {
        throw new Error(error);
      });
    return response?.data?.data?.city !== null;
  } catch (error) {
    console.log(`Error thrown: `, error);
  }
};

export const userHasUploadKYCFile = async () => {
  const headers = await getJWT();

  try {
    const response = await axios
      .get("/api/v1/user/get-profile", headers)
      .catch((error) => {
        throw new Error(error);
      });
    return response?.data?.data?.userPassportFrontUrl !== null;
  } catch (error) {
    console.log(`Error thrown: `, error);
  }
};

export const userUploadAll = async () => {
  const headers = await getJWT();

  try {
    const response = await axios
      .get("/api/v1/user/get-profile", headers)
      .catch((error) => {
        throw new Error(error);
      });
    if (response?.data?.data?.userPassportFrontUrl === null && response?.data?.data?.city === null) {
      return '0';
    } else if (response?.data?.data?.userPassportFrontUrl !== null && response?.data?.data?.city === null) {
      return '1';
    } else {
      return '2';
    }

  } catch (error) {
    console.log(`Error thrown: `, error);
  }
};

export const uploadDocument = async (data: any) => {
  let { headers } = await getJWT();
  headers = {
    ...headers, // Existing headers which append with JWT
    ...{ ContentType: "multipart/form-data" }, // Need to state the multipart/form-data type
  };

  const formData = new FormData();
  formData.append("file", data.file);
  formData.append("fileName", data.fileName);
  formData.append("module", data.module);
  formData.append("imageSizeType", "");

  try {
    const response = await axios
      .post("/api/v1/general/upload-image", formData, { headers })
      .catch((error) => {
        throw new Error(error);
      });
    return response;
  } catch (error) {
    console.log(error);
  }
};


export const userRemoveProfilePic = async (data: boolean) => {

  const headers = await getJWT();

  try {
    const response = await axios
      .post(
        "/api/v1/user/update-img-file-status",
        { "isRemoveUserPhoto": data },
        headers
      )
      .catch((error) => {
        throw new Error(error);
      });
    return response;
  } catch (error) {
    console.log(`Error thrown: `, error);
  }
};
