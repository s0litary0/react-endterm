import { useAuth } from "../../../hooks"
import { useFavourites } from "../../../hooks"
import Spinner from "../../shared/UI/Spinner/Spinner"
import "./Profile.css"
import ImageUploader from "../../shared/UI/ImageUploader/ImageUploader"


export default function Profile() {
  const { user, loading } = useAuth()  
  const { favourites } = useFavourites()
  if (loading) {
    return <Spinner />
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        
        <ImageUploader />
        <p className="profile-email">{user.email}</p>

        <div className="profile-info">
          <h3>Favourites</h3>
          {favourites?.length > 0 ? (
            <ul>
              {favourites.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : (
            <p>No favourites yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}