import { Movie } from "./Movie.js";
import { MovieManagement } from "./MovieManagement.js";
// Tạo đối tượng quản lý phim
const manager = new MovieManagement();

// Tạo và thêm 3 bộ phim
const movie1 = new Movie(
  "Inception",
  "A mind-bending thriller.",
  "A thief who steals secrets through dream-sharing technology.",
  "Sci-Fi",
  ["Warner Bros."],
  "USA",
  148,
  "$567,606,706",
  8.8,
  "https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
  "https://image.tmdb.org/t/p/w500/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg"
);

const movie2 = new Movie(
  "The Shawshank Redemption",
  "Hope can set you free.",
  "Two imprisoned men bond over a number of years.",
  "Drama",
  ["Castle Rock Entertainment"],
  "USA",
  142,
  "$929,606,706",
  "9.3 / 10",
  "https://image.tmdb.org/t/p/original/vL5LR6WdxWPjLPFRLe133jXWsh5.jpg",
  "https://image.tmdb.org/t/p/w500/kyeqWdyUXW608qlYkRqosgbbJyK.jpg"
);

const movie3 = new Movie(
  "Interstellar",
  "Mankind was born on Earth. It was never meant to die here.",
  "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.",
  "Adventure, Drama, Science Fiction",
  ["Legendary Pictures", "Syncopy", "Lynda Obst Productions"],
  "2014-11-05", // Original Release
  169, // Running Time (số phút)
  "$746,606,706", // Box Office
  "8.455 / 10", // Vote Average
  "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg", // backgroundImage
  "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg" // posterImage (dùng chung ảnh trong HTML)
);

// Thêm vào danh sách quản lý
manager.addMovie(movie1);
manager.addMovie(movie2);
manager.addMovie(movie3);

// Truy cập vào các phần tử bằng getElementById
const movieImage = document.getElementById("movieImage");
const movieTitle = document.getElementById("movieTitle");
const movieIntro = document.getElementById("movieIntro");
const movieOverview = document.getElementById("movieOverview");
const movieGenre = document.getElementById("movieGenre");
const movieProductions = document.getElementById("movieProductions");
const releaseDate = document.getElementById("releaseDate");
const runtime = document.getElementById("runtime");
const boxOffice = document.getElementById("boxOffice");
const voteAverage = document.getElementById("voteAverage");
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
const backgroundImage = document.getElementsByTagName("body")[0];
// Hàm hiển thị thông tin phim
let typingTimer;
const debounceDelay = 500; // 0.5 giây

searchInput.addEventListener("input", function () {
  clearTimeout(typingTimer); // Reset timer mỗi khi người dùng gõ
  typingTimer = setTimeout(function () {
    let results = manager.findMoviesBySimilarTitle(searchInput.value.trim());
    searchResults.innerHTML = ""; // Xoá kết quả cũ
    if (results.length > 0) {
      results.forEach((movie) => {
        const resultItem = document.createElement("div");
        resultItem.className = "search-result-item";
        resultItem.textContent = movie.title;
        resultItem.addEventListener("click", () => {
          // Hiển thị thông tin phim khi người dùng click vào kết quả
          movieImage.src = movie.posterImage;
          backgroundImage.style.backgroundImage = `url(${movie.backgroundImage})`;
          movieTitle.textContent = movie.title;
          movieIntro.textContent = movie.intro;
          movieOverview.textContent = movie.overview;
          movieGenre.textContent = movie.genre.join(", ");
          movieProductions.textContent = movie.productions.join(", ");
          releaseDate.textContent = movie.releaseDate || "N/A";
          runtime.textContent = `${movie.runtime} minutes`;
          boxOffice.textContent = movie.boxOffice || "N/A";
          voteAverage.textContent = movie.voteAverage || "N/A";
          searchResults.innerHTML = ""; // Xoá kết quả cũ
        });
        searchResults.appendChild(resultItem);
      });
    }
  }, debounceDelay);
});
