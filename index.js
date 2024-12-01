import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();
const port = 3000;

const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

db.connect();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM books ORDER BY date_read DESC"
    );
    res.render("index.ejs", { books: result.rows });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching books");
  }
});

app.post("/add", async (req, res) => {
  const { title, author, isbn, rating, review, date_read } = req.body;
  let coverUrl = null;

  try {
    if (isbn) {
      coverUrl = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
    } else {
      // If no ISBN, attempt to find a cover by title or author
      const response = await axios.get("https://openlibrary.org/search.json", {
        params: {
          title: title,
          author: author,
        },
      });

      if (response.data.docs.length > 0) {
        const book = response.data.docs[0];
        if (book.cover_i) {
          coverUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`;
        }
      }
    }

    await db.query(
      "INSERT INTO books (title, author, cover_url, rating, review, date_read) VALUES ($1, $2, $3, $4, $5, $6)",
      [title, author, coverUrl, rating, review, date_read]
    );

    res.redirect("/");
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).send("Error adding book");
  }
});

app.get("/edit/:id", async (req, res) => {
  const bookId = req.params.id;
  try {
    const result = await db.query("SELECT * FROM books WHERE id = $1", [
      bookId,
    ]);
    const book = result.rows[0];
    if (!book) {
      return res.status(404).send("Book not found");
    }
    res.render("edit.ejs", { book });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching book");
  }
});

app.post("/edit/:id", async (req, res) => {
  const bookId = req.params.id;
  const { title, author, rating, review, date_read } = req.body;

  try {
    await db.query(
      "UPDATE books SET title = $1, author = $2, rating = $3, review = $4, date_read = $5 WHERE id = $6",
      [title, author, rating, review, date_read, bookId]
    );
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating book");
  }
});

app.post("/delete", async (req, res) => {
  const bookId = req.body.id;
  try {
    await db.query("DELETE FROM books WHERE id = $1", [bookId]);
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting book");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
