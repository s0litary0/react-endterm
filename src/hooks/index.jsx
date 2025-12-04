import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FavouritesService } from "../services/FavouritesService"
import { addFavourite, fetchFavouritesByIds, removeFavourite, setFavourites } from '../store/favouritesSlice'
import { addUserFavourite, mergeFavourites, onFavouritesChange, removeUserFavourite } from '../firebase/favouritesHelpers'


function useAuth() {
  return useSelector((state) => state.auth)
}

function useDebouncedValue(value, delay=300) {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(timeout)
  }, [value, delay])

  return debouncedValue
}

function useFavourites() {
  const { user } = useAuth()
  const dispatch = useDispatch()
  const { favourites, favouriteMovies, loading } = useSelector((state) => state.favourites)

  useEffect(() => {
    const localFavourites = FavouritesService.getLocalFavourites()
    if (!user) {
      dispatch(setFavourites(localFavourites))
      return
    } else {
      if (!localFavourites.length === 0) {
        mergeFavourites(user.uid, localFavourites).then((merged) => {
          dispatch(setFavourites(merged))
          FavouritesService.clearLocalFavourites()
          if (localFavourites.length === 0) {
            alert("Your local favorites were merged with your account.")
          }
        })
      } 
    }
    const unsibscribe = onFavouritesChange(user.uid, (serverFavourites) => {
      dispatch(setFavourites(serverFavourites))
    })
    return () => unsibscribe()

  }, [dispatch, user])

  useEffect(() => {
    dispatch(fetchFavouritesByIds(favourites))
  }, [favourites, dispatch])

  const toggleFavourite = async (itemId) => {
    if (favourites.includes(itemId)) {
      const updated = favourites.filter(id => id !== itemId)
      dispatch(removeFavourite(itemId))
      if (user) {
        await removeUserFavourite(user.uid, itemId)
      } else {
        FavouritesService.setLocalFavourites(updated)
      }
    } else {
      const updated = [...favourites, itemId]
      dispatch(addFavourite(itemId))
      if (user) {
        await addUserFavourite(user.uid, itemId)
      } else {
        FavouritesService.setLocalFavourites(updated)
      }
    }  
  }

  return { favourites, favouriteMovies, loading, toggleFavourite }
}

export { useAuth, useDebouncedValue, useFavourites }

