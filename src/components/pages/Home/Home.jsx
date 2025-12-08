import ItemsList from "../../shared/UI/ItemsList/ItemsList"
import ItemCard from "../../shared/UI/ItemCard/ItemCard"
import "./Home.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchMovies } from "../../../store/moviesSlice";


export default function Home() {

  const { movies } = useSelector((state) => state.movies)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log("fetching")
    dispatch(fetchMovies({ limit: 4 }))
  }, [])

  console.log(movies)
  return (
    <div className="home-container">

      {/* Hero Section */}
      <header className="hero">
        <h1>Welcome to the World of Studio Ghibli</h1>
      </header>

      {/* About Section */}
      <section className="section about">
        <h2>About Studio Ghibli</h2>
        <p>
          Studio Ghibli is a legendary Japanese animation studio known for
          creating timeless stories filled with imagination, emotion, and
          breathtaking hand-drawn artistry. Founded by Hayao Miyazaki and Isao
          Takahata, the studio has inspired millions around the world with films
          like <em>Spirited Away</em>, <em>My Neighbor Totoro</em>, and{" "}
          <em>Princess Mononoke</em>.
        </p>
      </section>

      {/* Featured Films */}
      <section className="section films">
        <h2>Featured Films</h2>

        <ItemsList>
          {movies.map(movie => {
            return <ItemCard key={movie.id} item={movie}/>
          })}
        </ItemsList>
      </section>

      {/* Footer */}
      <footer className="footer">
        © 2025 Ghibli World — Fan-made project.
      </footer>
    </div>
  );
}
