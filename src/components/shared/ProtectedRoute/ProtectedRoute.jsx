import { useAuth } from '../../../hooks'
import { Navigate } from 'react-router-dom'
import Spinner from "../UI/Spinner/Spinner"


export default function ProtectedRoute({ children }) {
  const { user, loggedIn, loading } = useAuth()
  
  if (loading) {
    return <Spinner />
  }

  if (!loggedIn) {
    return <Navigate to="/login" replace/>
  }
  
  return children
}