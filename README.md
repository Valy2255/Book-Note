# Book Notes

Book Notes is a user-friendly web application that helps you keep track of all the books you've read or plan to read. With Book Notes, you can effortlessly add new books to your collection, edit details of existing entries and remove books when needed. Morever, it uses the [Open Library API](https://openlibrary.org/developers/api) to fetch book cover images based on ISBN, title or author.

## Prerequisites
Before you begin, be sure that you have the following installed:

- **Node.js:** [Download Node.js](https://nodejs.org/) (v12 or higher)
- **npm:** Comes bundled with Node.js
- **PostgreSQL:** [Download PostgreSQL](https://www.postgresql.org/) (v10 or higher)

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Valy2255/Book-Note.git
   cd Book-Note
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

## Configuration

**Environment Variables**

Create a `.env` file in the root directory to store your environment variables in a secure place.

```env
DB_USER=your_db_username
DB_HOST=localhost
DB_NAME=book_notes
DB_PASSWORD=your_db_password
DB_PORT=5432
```

Replace `your_db_username` and `your_db_password` with your PostgreSQL username and password.

## Database Setup

1. **Start PostgreSQL**

   Make sure your PostgreSQL server is running.

2. **Create Database**

   Log in to your PostgreSQL shell or use a tool like pgAdmin to create a new database:

   ```sql
   CREATE DATABASE booknotes;
   ```

3. **Create `books` Table**

   Connect to the `booknotes` database and create the `books` table:

   ```sql
   CREATE TABLE books (
     id SERIAL PRIMARY KEY,
     title VARCHAR(255) NOT NULL,
     author VARCHAR(255) NOT NULL,
     cover_url VARCHAR(255),
     rating INTEGER,
     review TEXT,
     date_read DATE
   );
   ```

## Running the Application

1. **Start the Server**

   ```bash
   npm start
   ```

   The server will start on `http://localhost:3000`.

2. **Access the Application**

   Open your web browser and navigate to `http://localhost:3000`.




