import axios, { getJWT } from './axios'

export const getportfolioPerformanceChart = async (p: string) => {
    const header = await getJWT()
    return await axios.post('/api/v1/portfolio/get-portfolio-performance-chart', { "period": p }, header)
}