import { API_BASE_URL } from "../app/variables" 


export class MoviesService {
  static async getMovies(limit=20, search="", page=1) {
    const url = new URL(API_BASE_URL + "films")
    url.searchParams.set("limit", page * limit)
    if (search) {
      search.replace(/ /g, "%20")
      url.searchParams.set("title", search)
    }
    console.log("Fetching from url: ", url)
    const response = await fetch(url)
    const data = await response.json()
    return data.slice((page - 1) * limit, page * limit)
  }

static async getMovieById(movieId) {
  const url = new URL(API_BASE_URL + `films/${movieId}`)
  console.log("Fetching from url: ", url)   
  const response = await fetch(url)
  return await response.json()
}
}

