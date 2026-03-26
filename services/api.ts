export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_TMDB_API_KEY,
  headers: {
    accept: "application/json",
  },
};

export const fetchMovies = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?api_key=${TMDB_CONFIG.API_KEY}&query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?api_key=${TMDB_CONFIG.API_KEY}&sort_by=popularity.desc`;

    // the tmdb config object contains the base URL for the TMDB API, the API key retrieved from environment variables, and the necessary headers for making API requests. The fetchMovies function constructs the appropriate endpoint based on whether a search query is provided. If a query is present, it uses the search endpoint; otherwise, it defaults to fetching popular movies. The encodeURIComponent function is used to safely encode the query string, ensuring that any special characters are properly handled in the API request.       
  // the endcode URI component is used to ensure that any special characters in the query string are properly escaped, preventing issues with the API request.
  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: TMDB_CONFIG.headers,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.results; // Assuming the API returns an object with a 'results' array
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error; // Re-throw the error after logging it
  }
};

export const fetchMovieDetails = async (id: string): Promise<MovieDetails> => {
  const endpoint = `${TMDB_CONFIG.BASE_URL}/movie/${id}?api_key=${TMDB_CONFIG.API_KEY}`;
  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: TMDB_CONFIG.headers,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

// const url = 'https://api.themoviedb.org/3/keyword/keyword_id/movies?include_adult=false&language=en-US&page=1';
// const options = {method: 'GET', headers: {accept: 'application/json'}};

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error(err));
