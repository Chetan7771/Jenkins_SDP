package com.example.movieslibrary.service;

import com.example.movieslibrary.model.Movie;
import com.example.movieslibrary.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class MovieService {

    @Autowired
    private MovieRepository movieRepository;

    public Movie addMovie(Movie movie) {
        if (movie.getTitle() == null || movie.getTitle().trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Movie title is required");
        }

        // duplicate title check
        if (movieRepository.findByTitle(movie.getTitle().trim()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A movie with the same title already exists");
        }

        movie.setTitle(movie.getTitle().trim());
        return movieRepository.save(movie);
    }

    public boolean deleteById(Long id) {
        if (movieRepository.existsById(id)) {
            movieRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }


    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }
}
