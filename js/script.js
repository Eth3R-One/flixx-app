// Get current webpage path
const global = {
  currentPage: window.location.pathname,
};

// Generate popular tv shows
async function displayPopularTvShows() {
  const { results } = await fetchApiData("tv/popular");
  results.forEach((show) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
        <a href="tv-details.html?id=${show.id}">
          ${
            show.poster_path
              ? `<img
            src="https://image.tmdb.org/t/p/w500${show.poster_path}"
            class="card-img-top"
            alt="${show.name}"
          />`
              : `<img
          src="images/no-image.jpg"
          class="card-img-top"
          alt="${show.name}"
        />`
          }
        </a>
        <div class="card-body">
          <h5 class="card-title">${show.name}</h5>
          <p class="card-text">
            <small class="text-muted">Release: ${show.first_air_date}</small>
          </p>
        </div>
    `;
    document.querySelector("#popular-shows").appendChild(div);
  });
}

// Generate popular movies from API
async function displayPopularMovies() {
  const { results } = await fetchApiData("movie/popular");
  results.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
        <a href="movie-details.html?id=${movie.id}">
          ${
            movie.poster_path
              ? `<img
            src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
            class="card-img-top"
            alt="${movie.title}"
          />`
              : `<img
          src="images/no-image.jpg"
          class="card-img-top"
          alt="${movie.title}"
        />`
          }
        </a>
        <div class="card-body">
          <h5 class="card-title">${movie.title}</h5>
          <p class="card-text">
            <small class="text-muted">Release: ${movie.release_date}</small>
          </p>
        </div>
    `;
    document.querySelector("#popular-movies").appendChild(div);
  });
}

// Fetch data from TMDB API
async function fetchApiData(endpoint) {
  const API_KEY = "324fb3a934cd823b07cfbe9b2453b961";
  const API_URL = "https://api.themoviedb.org/3";
  showSpinner();

  const response = await fetch(
    `${API_URL}/${endpoint}?api_key=${API_KEY}&language=en-US`
  );
  const data = await response.json();
  hideSpinner();
  return data;
}
function showSpinner() {
  document.querySelector(".spinner").classList.add("show");
}
function hideSpinner() {
  document.querySelector(".spinner").classList.remove("show");
}

// Highlight active link
function highlightActiveLink() {
  const links = document.querySelectorAll(".nav-link");
  links.forEach((link) => {
    if (link.getAttribute("href") === global.currentPage) {
      link.classList.add("active");
    }
  });
}

// Initial application
function init() {
  // Determine and handle current path
  switch (global.currentPage) {
    case "/":
    case "/index.html":
      displayPopularMovies();
      break;
    case "/shows.html":
      displayPopularTvShows();
      break;
    case "/movie-details.html":
      console.log("Movie details");
      break;
    case "/tv-details.html":
      console.log("Tv details");
      break;
    case "/search.html":
      console.log("Search");
      break;
  }
  //   highlight current link
  highlightActiveLink();
}

window.addEventListener("DOMContentLoaded", init);
