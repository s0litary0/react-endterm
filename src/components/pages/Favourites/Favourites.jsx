import { useFavourites } from "../../../hooks";
// import { useSelector, useDispatch } from "react-redux";
import ItemsList from "../../shared/UI/ItemsList/ItemsList";
import ItemCard from "../../shared/UI/ItemCard/ItemCard";
import Spinner from "../../shared/UI/Spinner/Spinner"
import "./Favourites.css";
import { useNavigate } from "react-router-dom";

export default function Favourites() {
  const { favouriteMovies, loading } = useFavourites();
  const navigate = useNavigate();
  
  console.log(favouriteMovies)

  if (loading) {
    return <Spinner />
  }

  if (favouriteMovies.length === 0) {
    return <h1 className="no-favourites-message">No favourite movies</h1>
  }

  return (
    <div className="favourite-page">
      <ItemsList>
        {favouriteMovies.map((movie) => (
          <ItemCard
            key={movie.id}
            item={movie}
            onClick={() => navigate(`/movies/${movie.id}`)}
          />
        ))}
      </ItemsList>
    </div>
  );
}
