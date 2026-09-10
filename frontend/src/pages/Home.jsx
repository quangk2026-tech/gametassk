import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="container" style={{ paddingTop: '40px' }}>
      <h1>Welcome to GameTaskk</h1>
      <p>Earn commissions by referring friends</p>
      <Link to="/register">Get Started</Link>
      <Link to="/login">Sign In</Link>
    </div>
  )
}

export default Home
