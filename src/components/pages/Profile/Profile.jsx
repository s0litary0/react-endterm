import { useAuth } from "../../../hooks"
import Spinner from "../../shared/UI/Spinner/Spinner"
import "./Profile.css"


export default function Profile() {
  const { user, loading } = useAuth()  


  return (
  <>
    <h1>Profile page</h1>
    <p>{loading ? <Spinner /> : JSON.stringify(user)}</p>
  </>
  )
}