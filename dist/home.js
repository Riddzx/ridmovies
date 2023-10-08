//! Home Main JS
const apiKey = "?api_key=de43e026419e728c18b4662e1e6ae466";
const urlTopRated = "https://api.themoviedb.org/3/movie/top_rated";
const urlTrending = "https://api.themoviedb.org/3/trending/all/week";
const urlPopuler = "https://api.themoviedb.org/3/movie/popular";
const urlMovieID = "https://api.themoviedb.org/3/movie/";
const btnShow = document.getElementById("toggleButton");

// !=====================================================
trendingUI(apiKey, urlTrending); // TODO Show card trending
topRatedUI(apiKey, urlTopRated); //TODO Show card topRated
listMoviesPopuler(apiKey, urlPopuler); //TODO Show list movies populer
btnShow.addEventListener("click", function () {
  const movieNameOverlay = document.querySelectorAll(".movie-name");
  movieNameOverlay.forEach((card) => {
    card.classList.toggle("lg:hidden");
    const icon = document.querySelector("#toggle");
    if (card.classList.contains("lg:hidden")) {
      icon.setAttribute("data-feather", "toggle-left");
    } else {
      icon.setAttribute("data-feather", "toggle-right");
    }
  });
  feather.replace();
});
// !======================================================
const myModal = new Modal(document.getElementById("movieDetails"));
document.addEventListener("click", async function (e) {
  if (e.target.classList.contains("movie-details")) {
    const tmdbID = e.target.dataset.tmdbid;
    console.log(tmdbID);
    const movieid = await fetchMovieDetails(tmdbID);
    updateDetailsUI(movieid);
  }
});

async function fetchMovieDetails(tmdbID) {
  try {
    const res = await fetch(`${urlMovieID}${tmdbID}${apiKey}`);

    if (res.status === 404) {
      throw new Error("Movie not found");
    }
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    let alert = error;
    return alert;
  }
}

function updateDetailsUI(data) {
  const modalBody = document.querySelector(".modal-body-details");
  let movieDetails;
  console.log(data);
  if (data) {
    movieDetails = modalDetails(data);
    modalBody.innerHTML = movieDetails;
  }
}

function showAlert(message) {
  const alertBody = document.getElementById("alertBody");
  const alertText = document.querySelector(".alert-body");
  const closeAlert = document.getElementById("btn-alert");
  let timeoutID;

  alertText.textContent = message;
  alertBody.classList.remove("-translate-y-60");

  closeAlert.addEventListener("click", function () {
    clearTimeout(timeoutID);
    alertBody.classList.add("-translate-y-60");
  });

  timeoutID = setTimeout(() => {
    alertBody.classList.add("-translate-y-60");
  }, 3000);
}

async function listMoviesPopuler(apiKey, urlPopuler) {
  try {
    const response = await fetch(`${urlPopuler}${apiKey}`);
    const data = await response.json();
    let countMovie = 0;
    data.results.forEach((movie) => {
      if (countMovie < 10) {
        let card = listMovie(movie);
        let movieCard = document.createElement("div");
        let movieContainer = document.getElementById("film-populer");
        movieCard.innerHTML = card;
        movieContainer.appendChild(movieCard);
        countMovie++;
      }
    });
    // console.log(data);
  } catch (error) {
    console.error("Error Fetching Data : ", error);
  }
}

async function topRatedUI(apiKey, urlTopRated) {
  try {
    const response = await fetch(`${urlTopRated}${apiKey}`);
    const data = await response.json();
    data.results.forEach((movie) => {
      let card = cardMovie(movie);
      let movieCard = document.createElement("div");
      let movieContainer = document.getElementById("topRated-container");
      movieCard.innerHTML = card;
      movieContainer.appendChild(movieCard);
    });
  } catch (error) {
    console.log("Error Fetching data : ", error);
  }
}

async function trendingUI(apiKey, urlTrending) {
  try {
    const response = await fetch(`${urlTrending}${apiKey}`);
    const data = await response.json();
    data.results.forEach((movie) => {
      // console.log(movie);
      let card = cardMovie(movie);
      let movieCard = document.createElement("div");
      const movieTrendingContainer =
        document.getElementById("trending-container");
      movieCard.innerHTML = card;
      movieTrendingContainer.appendChild(movieCard);
    });
  } catch (error) {
    console.error("Error Fetching Data : ", error);
  }
}

function listMovie(movie) {
  return /*html*/ `<li class="cursor-pointer hover:text-primary">${
    movie.title ? movie.title : movie.original_name
  }</li>`;
}

function cardMovie(movie) {
  return /*html*/ `<div class="card-style group cursor-pointer ">
                      <div class="movie-id movie-details modal-details fixed-card lg:group-hover:scale-110 duration-300 relative" data-tmdbid=${
                        movie.id
                      } data-modal-target="movieDetails" data-modal-toggle="movieDetails" >
                        <img src="https://image.tmdb.org/t/p/w500${
                          movie.poster_path
                        }" alt="Movie Poster" class="image-card-style pointer-events-none"> 
                      <div class="movie-name lg:hidden px-4 pt-2 overlay-hp-mode  overlay-lg-mode pointer-events-none">                              
                      <div class="flex items-center">
                      <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                      </svg>
                      <p class="ml-2 text-[13px] font-bold text-white dark:text-white">${
                        movie.vote_average
                      }</p>
                      </div>
                        <h2 class="text-base text-white font-bold">${
                          movie.title ? movie.title : movie.original_name
                        }</h2>
                        <p class="text-white text-sm">Popularity : ${
                          movie.popularity
                        }</p>
                      </div>
                    </div>
                    </div>`;
}

function modalDetails(movie) {
  if (movie && movie.genres) {
    const genre = movie.genres.map((genres) => genres.name).join(", ");
    return /*html*/ `<div class="lg:flex border border-white p-5">
                        <div class="image w-full lg:w-1/3 flex justify-center align-items-center">
                          <img src="https://image.tmdb.org/t/p/w500${
                            movie.poster_path
                          }" alt="Movie Poster" class="w-48 lg:w-max object-cover object-center rounded-md">
                        </div>
                        <div class="w-full lg:w-2/3 modal-text-body mt-4 lg:mt-0 lg:px-4 text-white">
                          <h2 class="text-xl text-center font-bold">${
                            movie.title ? movie.title : "Not Found Error in API"
                          }</h2>
                          <p class="pt-4">${
                            movie.overview
                              ? movie.overview
                              : "Not Found Error in API"
                          }</p>
                          <div class="pt-4 ">
                          <p>Vote Average : ⭐${movie.vote_average}</p>
                          <p>Vote Count : ${movie.vote_count}</p>
                          <p>Runtime : ${movie.runtime}m</p>
                          <p>Genre : ${genre}</p>
                          <p>Link Official : <a href="${
                            movie.homepage
                          }" target="_blank">➡TEKAN DISINI⬅</a></p>
                          </div>
                        </div>
                      </div>`;
  } else {
    showAlert(movie);
    /*html*/ let text = `
      <div class="flex justify-center align-center">
        <h1 class="text-white text-2xl">${movie}</h1>
      </div>`;
    return text;
  }
}
