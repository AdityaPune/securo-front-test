import axios, { getJWT } from "./axios"

export const userForgetPassword = async(emailAddress: string) => {
    const response =  await axios.post("/api/v1/auth/user-forgot-password", {
        emailAddress
    }).catch(function(error){
        const errorMessage = error.response.data.message[0];
        console.error(errorMessage);
        return { data: {errorMessage}};
    })
    return response
}

export const login = async(emailAddress: string, password: string) => {
    const response = await axios.post("/api/v1/auth/user-login", {
        emailAddress,
        password
    }).catch(function(error)  {
        const errorMessage = error.response.data.message[0];
        console.error(errorMessage);
        return { data: {errorMessage}};
    })
    return response 
}

export const userChangePassword = async(newPassword: string, currentPassword: string) => {
    const headers = await getJWT();
    const response = await axios.post("/api/v1/auth/change-password", {
        currentPassword,
        newPassword
    }, headers).catch(error => {
        const errorMessage = error.response.data.message[0];
        console.error(errorMessage);
        return { data: {errorMessage}};
    })
    return response 
}

