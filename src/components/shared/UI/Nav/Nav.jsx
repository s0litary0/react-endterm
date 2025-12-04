import { NavLink } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'
import { useAuth } from '../../../../hooks'
import { useDispatch } from 'react-redux'
import { logoutUser } from "../../../../store/authSlice"
import Search from '../Search/Search'
import './Nav.css'


export default function Nav() {

  const [searchParams, setSearchParams] = useSearchParams("")
  const { loggedIn } = useAuth()
  const dispatch = useDispatch()

  const onSearch = (value) => {
    if (!value) {
      setSearchParams({})
      return
    }
    setSearchParams({ search: value})
  }

  return (
    <nav className="nav-bar">
      <ul className="nav-bar__menu">
        <li>
          <ul className="nav-bar__menu-left">
            <li className="nav-bar__menu-link"><NavLink to="">Home</NavLink></li>
            <li className="nav-bar__menu-link"><NavLink to="movies">Movies</NavLink></li>
            <li className="nav-bar__menu-link"><NavLink to="favourites">Favourites</NavLink></li>
          </ul>
        </li>
        <li className="nav-bar__menu-search">
          <Search onSearch={onSearch} value={searchParams}>Search movies...</Search>
        </li>
        <li>
          <ul className="nav-bar__menu-right">
            {!loggedIn ? (
              <>
                <li className="nav-bar__menu-link"><NavLink to="login">Login</NavLink></li>
                <li className="nav-bar__menu-link"><NavLink to="signup">Sign up</NavLink></li>
              </>
            )
            : (
              <>
                <li className="nav-bar__menu-link"><NavLink to="profile">Profile</NavLink></li>
                <li className="nav-bar__menu-link logout-btn" onClick={() => dispatch(logoutUser())}>Logout</li>
              </>
            )}
          </ul>
        </li>
      </ul>
    </nav>
  )
}