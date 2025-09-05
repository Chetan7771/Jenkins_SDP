// App.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";   // external CSS
import config from "./config";  // ✅ Import config file

const API_BASE = config.url;   // ✅ Use from config.js

function App() {
  const [books, setBooks] = useState([]);
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get(API_BASE);
      setBooks(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch books: " + (err.response?.data?.message || err.message));
    }
  };

  const addBook = async () => {
    try {
      await axios.post(`${API_BASE}/add`, { name, author, isbn });
      setName(""); setAuthor(""); setIsbn("");
      fetchBooks();
      alert("Book added");
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || err.response?.data || err.message;
      alert("Add failed: " + msg);
    }
  };

  const deleteBook = async (isbnToDelete) => {
    const ok = window.confirm(`Delete book with ISBN: ${isbnToDelete}?`);
    if (!ok) return;

    try {
      await axios.delete(`${API_BASE}/delete/${encodeURIComponent(isbnToDelete)}`);
      fetchBooks();
      alert("Book deleted");
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || err.response?.data || err.message;
      alert("Delete failed: " + msg);
    }
  };

  return (
    <div className="container">
      <h1>📚 Books Library</h1>

      <div className="form">
        <input placeholder="Title" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="Author" value={author} onChange={e => setAuthor(e.target.value)} />
        <input placeholder="ISBN" value={isbn} onChange={e => setIsbn(e.target.value)} />
        <button onClick={addBook}>Add Book</button>
      </div>

      <div>
        <h2>All Books</h2>
        {books.length === 0 ? (
          <div className="no-books">No books found</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>ISBN</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {books.map(b => (
                <tr key={b.id}>
                  <td>{b.name}</td>
                  <td>{b.author}</td>
                  <td>{b.isbn}</td>
                  <td>
                    <button className="delete-btn" onClick={() => deleteBook(b.isbn)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;
