import axios, { getJWT } from './axios'

export const getStrategies = async () => {
    const header = await getJWT()
    return await axios.get('/api/v1/portfolio/get-strategy-performance', header)
}