import API from './client'

export const getCommissionSummary = () => API.get('/api/commission/summary')
export const getCommissionHistory = () => API.get('/api/commission/history')
export const requestWithdrawal = (amount, bankAccount) => 
  API.post('/api/commission/withdraw', { amount, bankAccount })
export const getWithdrawals = () => API.get('/api/commission/withdrawals')
