import { Movie } from "./Movie.js";
export class MovieManagement {
  constructor() {
    this.movies = [];
  }

  // Thêm một bộ phim mới
  addMovie(movie) {
    if (movie instanceof Movie) {
      this.movies.push(movie);
    } else {
      throw new Error("Only instances of Movie can be added.");
    }
  }

  // Xoá phim theo tiêu đề
  removeMovieByTitle(title) {
    this.movies = this.movies.filter((movie) => movie.title !== title);
  }

  // Tìm phim theo tiêu đề
  findMoviesBySimilarTitle(query) {
    return this.movies.filter((movie) =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
  }

  // Lấy danh sách tất cả các phim
  listAllMovies() {
    return this.movies;
  }
}
