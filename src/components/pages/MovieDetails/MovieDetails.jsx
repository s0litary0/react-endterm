import { useEffect } from "react";
import "./MovieDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchMovieById } from "../../../store/moviesSlice";
import { useFavourites } from "../../../hooks";
import Button from "../../shared/UI/Button/Button";
import Spinner from "../../shared/UI/Spinner/Spinner";
import calendar from "../../../assets/calendar.svg";
import time from "../../../assets/time.svg";
import star from "../../../assets/star.svg";

export default function MovieDetails() {
  const { selectedMovie, error, loading } = useSelector(
    (state) => state.movies
  );
  const dispatch = useDispatch();
  const params = useParams();
  const movieId = params.id;
  const { favourites, toggleFavourite } = useFavourites();
  const isFavourite =favourites.includes(movieId)
  console.log(isFavourite)

  useEffect(() => {
    dispatch(fetchMovieById({ movieId }));
  }, [dispatch, movieId]);

  // Source - https://stackoverflow.com/a
  // Posted by ConorLuddy, modified by community. See post 'Timeline' for change history
  // Retrieved 2025-11-30, License - CC BY-SA 4.0
  const convertMinsToHrsMins = (mins) => {
    let h = Math.floor(mins / 60);
    let m = mins % 60;
    h = h < 10 ? "0" + h : h; // (or alternatively) h = String(h).padStart(2, '0')
    m = m < 10 ? "0" + m : m; // (or alternatively) m = String(m).padStart(2, '0')
    return `${h}:${m}`;
  };

  if (loading || !selectedMovie || selectedMovie.id !== params.id) {
    return (
      <div className="page-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <h1>Error occured: {error}</h1>;
  }

  return (
    <>
      <section className="details-container">
        <img
          src={selectedMovie.image}
          alt=""
          className="details-container__banner"
        />
        <article className="movie-details">
          <div className="movie-details__front">
            <h1 className="movie-details__front-title">
              {selectedMovie.title}
            </h1>
            {isFavourite ? (
              <Button
                className="movie-details__front-favourite-btn-remove"
                onClick={() => {
                  toggleFavourite(selectedMovie.id)
                }}
              >
                - Remove from favourites
              </Button>
            ) : (
              <Button
                className="movie-details__front-favourite-btn"
                onClick={() => {
                  toggleFavourite(selectedMovie.id)
                }}
              >
                + Add to favourite
              </Button>
            )}
          </div>
          <p className="movie-details__tags">
            <span className="movie-details__tags-tag">
              <img className="tag-icon" src={calendar} alt="calendar-icon" />
              {selectedMovie["release_date"]}
            </span>
            <span className="movie-details__tags-tag">
              <img className="tag-icon" src={time} alt="time-icon" />
              {convertMinsToHrsMins(selectedMovie["running_time"])}
            </span>
            <span className="movie-details__tags-tag">
              <img className="tag-icon" src={star} alt="star-icon" />
              {selectedMovie["rt_score"]}
            </span>
          </p>
          <p className="movie-details__description">
            {selectedMovie.description}
          </p>
          <div className="movie-detail__detailed-description">
            <p>Director: {selectedMovie.director}</p>
            <p>Producer: {selectedMovie.producer}</p>
          </div>
        </article>
      </section>
    </>
  );
}
