export class FavouritesService {
  static getLocalFavourites() {
    return JSON.parse(localStorage.getItem("favourites")) || []
  }

  static setLocalFavourites(items) {
    localStorage.setItem("favourites", JSON.stringify(items))
  }

  static clearLocalFavourites() {
    localStorage.removeItem("favourites")
  }
}