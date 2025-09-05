package com.example.bookslibrary.service;

import com.example.bookslibrary.model.Book;
import com.example.bookslibrary.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    public Book addBook(Book book) {
        if (book.getName() == null || book.getName().trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Book name is required");
        }
        if (book.getIsbn() == null || book.getIsbn().trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ISBN is required");
        }
        // duplicate name check
        if (bookRepository.findByName(book.getName().trim()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A book with the same name already exists");
        }
        // duplicate isbn check
        if (bookRepository.findByIsbn(book.getIsbn().trim()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A book with the same ISBN already exists");
        }

        book.setName(book.getName().trim());
        book.setIsbn(book.getIsbn().trim());
        return bookRepository.save(book);
    }

    public void deleteByIsbn(String isbn) {
        if (isbn == null || isbn.trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ISBN is required for deletion");
        }
        var maybe = bookRepository.findByIsbn(isbn.trim());
        if (maybe.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Book with ISBN " + isbn + " not found");
        }
        bookRepository.delete(maybe.get());
    }

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }
}
