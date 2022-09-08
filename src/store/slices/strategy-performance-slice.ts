import { createSlice } from '@reduxjs/toolkit';

export interface IStrategyPerformanceComponent {
    productId: string,
    productName: string,
    pricePerFullShare: string,
    holding: string,
    share: string,
    ppfsChangePercentage: string,
    profitAndLoss: string,
    profitAndLossPercentage: string
}

export interface IAllocation {
    productName: string,
    sharesInUsd: string,
    shares: string,
    allocation: string,
    productId: number,
    changePercentage: string
}

export interface IPortfolioAllocation {
    currentTotalHolding: string,
    oneWeekAgoTotalHolding: string,
    totalHoldingChangePercentage: string,
    allocations: IAllocation[]
}

export interface IStrategyPerformance {
    strategyPerformanceList: IStrategyPerformanceComponent[],
    portfolioAllocation: IPortfolioAllocation
}

const initialState: IStrategyPerformance = {
    strategyPerformanceList: [],
    portfolioAllocation: {
        currentTotalHolding: "",
        oneWeekAgoTotalHolding: "",
        totalHoldingChangePercentage: "",
        allocations: []
    }
}

const strategyPerformanceSlice = createSlice({
    name: 'strategyPerformance',
    initialState,
    reducers: {
        updateStrategyPerformanceList(state, action) {
            state.strategyPerformanceList = action.payload
        },
        updatePortfolioAllocation(state, action) {
            const { currentTotalHolding, oneWeekAgoTotalHolding, totalHoldingChangePercentage, allocations } = action.payload
            state.portfolioAllocation.currentTotalHolding = currentTotalHolding;
            state.portfolioAllocation.allocations = allocations;
            state.portfolioAllocation.oneWeekAgoTotalHolding = oneWeekAgoTotalHolding;
            state.portfolioAllocation.totalHoldingChangePercentage = totalHoldingChangePercentage
        },
        resetPortfolioAllocationAndStrategyPerformanceList(state) {
            state.portfolioAllocation = initialState.portfolioAllocation;
            state.strategyPerformanceList = initialState.strategyPerformanceList;
        }
    }
})

export const { updateStrategyPerformanceList, updatePortfolioAllocation, resetPortfolioAllocationAndStrategyPerformanceList } = strategyPerformanceSlice.actions

export default strategyPerformanceSlice.reducer