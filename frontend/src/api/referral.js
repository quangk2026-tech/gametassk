import API from './client'

export const getReferralInfo = () => API.get('/api/referral/my-info')
export const getReferralLink = () => API.get('/api/referral/link')
export const getReferralList = () => API.get('/api/referral/list')
