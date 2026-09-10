import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getReferralLink, getReferralList } from '../api/referral'
import { getCommissionSummary } from '../api/commission'

function Dashboard() {
  const [user, setUser] = useState(null)
  const [link, setLink] = useState('')
  const [commission, setCommission] = useState(null)
  const [referrals, setReferrals] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }
    const userData = localStorage.getItem('user')
    if (userData) setUser(JSON.parse(userData))
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [l, c, r] = await Promise.all([
        getReferralLink(),
        getCommissionSummary(),
        getReferralList()
      ])
      setLink(l.data.referralLink)
      setCommission(c.data)
      setReferrals(r.data)
    } catch (err) {
      console.error(err)
    }
  }

  const copyLink = () => {
    navigator.clipboard.writeText(link)
    alert('Copied')
  }

  return (
    <div className="container" style={{ paddingTop: '40px' }}>
      <h1>Welcome, {user?.username}</h1>
      <div className="card">
        <h3>Stats</h3>
        <p>Total Referrals: {commission?.referralCount || 0}</p>
        <p>Available: ${commission?.availableCommission || 0}</p>
        <p>Total: ${commission?.totalCommission || 0}</p>
      </div>
      <div className="card">
        <h3>Referral Link</h3>
        <input type="text" readOnly value={link} />
        <button onClick={copyLink}>Copy</button>
      </div>
      <div className="card">
        <h3>Referrals ({referrals.length})</h3>
        {referrals.map(ref => (
          <p key={ref._id}>{ref.referred?.username} - ${ref.commission}</p>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
