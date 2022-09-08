import axios, { getJWT } from './axios'

export const getToken = async () => {
    const header = await getJWT()
    return await axios.get('/api/v1/auth/refresh-token', header)
}