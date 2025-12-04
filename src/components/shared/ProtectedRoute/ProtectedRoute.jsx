import { useAuth } from '../../../hooks'
import { Navigate } from 'react-router-dom'


export default function ProtectedRoute({ children }) {
  const { user, loggedIn, loading } = useAuth()
  
  if (loading) {
    return <h1>Loading</h1>
  }

  if (!loggedIn) {
    return <Navigate to="/login" replace/>
  }
  
  return children
}