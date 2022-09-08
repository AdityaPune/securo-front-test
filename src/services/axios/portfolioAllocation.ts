import axios, { getJWT } from './axios'

export const getportfolioAllocation = async () => {
    const header = await getJWT()
    return await axios.get('/api/v1/portfolio/get-portfolio-distribution', header)
}