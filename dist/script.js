// TODO Movie Section Start

//! main.js

const apiKey = "de43e026419e728c18b4662e1e6ae466";
const urlTopRated = "https://api.themoviedb.org/3/movie/top_rated";
const urlTrending = "https://api.themoviedb.org/3/trending/all/week";
const movieContainer = document.querySelector("#movie-container");
const topRatedBtn = document.querySelector("#topRated-btn");
const trendingBtn = document.querySelector("#trending-btn");

// Tambahkan event listener untuk tombol Top Rated
topRatedBtn.addEventListener("click", function () {
  clearMovieContainer(); // Bersihkan isi kontainer sebelum menambahkan yang baru
  fetch(`${urlTopRated}?api_key=${apiKey}`)
    .then((response) => response.json())
    .then((data) => {
      data.results.forEach((movie) => {
        updateMovieContainer(topRated(movie));
      });
    });
});

// Tambahkan event listener untuk tombol Trending
trendingBtn.addEventListener("click", function () {
  clearMovieContainer(); // Bersihkan isi kontainer sebelum menambahkan yang baru
  fetch(`${urlTrending}?api_key=${apiKey}`)
    .then((response) => response.json())
    .then((data) => {
      data.results.forEach((movie) => {
        updateMovieContainer(trendingMovie(movie));
      });
    });
});

// Fungsi untuk membersihkan isi kontainer
function clearMovieContainer() {
  movieContainer.innerHTML = "";
}

// Fungsi untuk memperbarui kontainer dengan konten film
function updateMovieContainer(content) {
  let movieCard = document.createElement("div");
  movieCard.innerHTML = content;
  movieContainer.appendChild(movieCard);
}

function topRated(movie) {
  return /*html*/ `<div class="card-style">
                    <div class="fixed-card">
                      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="Poster Film" class="image-card-style" />
                        <div div class="card-title">
                        <h2 class="font-bold text-2xl text-primary">${movie.title}</h2>
                        <p class="text-white">Rating: ${movie.vote_average}</p>
                        <p class="text-white">Vote Count : ${movie.vote_count}</p>
                        <button class="detail-btn">Lihat Details</button>
                   </div>  
                  </div>
                </div>`;
}

// TODO Movie Section End
