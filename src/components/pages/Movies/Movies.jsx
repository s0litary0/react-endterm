import ItemsList from "../../shared/UI/ItemsList/ItemsList"
import ItemCard from "../../shared/UI/ItemCard/ItemCard"
import Button from "../../shared/UI/Button/Button"
import Pagination from "../../shared/UI/Pagination/Pagination"
import './Movies.css'
import { useSelector, useDispatch } from "react-redux"
import { useSearchParams } from "react-router-dom"
import { useEffect } from "react"
import { fetchMovies } from "../../../store/moviesSlice"
import { useNavigate } from "react-router-dom"


export default function Movies() {
  const { movies, loading, error } = useSelector((state) => state.movies)
  const dispatch = useDispatch()
  const navigate = useNavigate() 
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get("search") || ""
  const currentPage = searchParams.get("page") || 1

  const goToMovieDetails = (movieId) => {
    console.log("Go to movie details: ", movieId)
    navigate(`/movies/${movieId}`)
  }

  useEffect(() => {
    // dispatch is always called with object
    // default for limit is 20, but for pagination used 8(total of 22 movies)
    dispatch(fetchMovies({limit: 8, search: searchQuery, page: currentPage}))
  }, [dispatch, searchQuery, currentPage])


  if (!loading) {
    console.log("Movies: ", movies)
    console.log("Error:", error)
  }

  return (
    <>
      <section className="poster-block">
        <img className="poster-block__poster-img" src="my-neighbor-totoro-anime-movie.jpg" alt="avater-movie-poster" />
        <div className="poster-block__content">
          <div className="poster-block__content-btns">
            <Button className="watch-btn">Watch Now</Button>
            <Button className="details-btn">View Details</Button>
          </div>
          <div className="poster-block__content-info">
            <h2 className="content-info__title">My Neighbor Totoro</h2>
            <p className="content-info__description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam laudantium cumque sit eaque modi aut maxime! Porro quisquam quae repudiandae?</p>
          </div>
        </div>

      </section>
      <section className="movies-list-container">
        <h2 className="movies-list-container__title">All Movies</h2>
        <ItemsList>{movies.map((movie) => {
          return <ItemCard key={movie.id} item={movie} onClick={() => goToMovieDetails(movie.id)}/>
        })}</ItemsList>
      </section>
      <section>
        <Pagination totalPages={3} />
      </section>
    </>
  )
}