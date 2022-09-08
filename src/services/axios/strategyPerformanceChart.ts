import axios, { getJWT } from './axios'

export const getStrategyPerformanceChart = async (p: string, ID: string) => {
    const header = await getJWT()
    return await axios.post('/api/v1/product/get-strategy-performance-chart', { "period": p, "productId": ID }, header)
}