package com.example.bookslibrary.repository;

import com.example.bookslibrary.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface BookRepository extends JpaRepository<Book, Long> {
    Optional<Book> findByName(String name);
    Optional<Book> findByIsbn(String isbn);
}
