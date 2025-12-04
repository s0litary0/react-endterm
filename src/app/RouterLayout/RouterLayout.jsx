import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../../components/pages/Home/Home";
import Signup from "../../components/pages/Signup/Signup";
import Login from "../../components/pages/Login/Login";
import AuthLayout from "../../components/layouts/AuthLayout/AuthLayout";
import ProtectedRoute from "../../components/shared/ProtectedRoute/ProtectedRoute";
import Profile from "../../components/pages/Profile/Profile";
import Movies from "../../components/pages/Movies/Movies";
import MoviesLayout from "../../components/layouts/MoviesLayout/MoviesLayout";
import MovieDetails from "../../components/pages/MovieDetails/MovieDetails";
import Favourites from "../../components/pages/Favourites/Favourites";


export default function RouterLayout() {
  return (
    <Routes>
      <Route index element={<Home />}></Route>
      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />}></Route>
        <Route path="signup" element={<Signup />}></Route>
      </Route>
      <Route path="favourites" element={<Favourites />}></Route>
      <Route path="movies" element={<MoviesLayout />}>
        <Route index element={<Movies />}></Route>
        <Route path=":id" element={<MovieDetails />}></Route>
      </Route>
      <Route
        path="profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      ></Route>
      <Route path="*" element={<h1>Not found</h1>}></Route>
    </Routes>
  );
}
