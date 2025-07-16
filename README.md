# Butterfly Library Management System 

<img height="100px" src="https://github.com/faisal-shohag/L2-A4-client/blob/master/public/logo.png?raw=true" alt="logo"/>

## Overview
The Minimal Library Management System is a web application built to manage a library's book inventory and borrowing process. It allows users to view, add, edit, delete, and borrow books, as well as view a summary of borrowed books. The application is designed with a clean, responsive UI and integrates with a RESTful API for seamless data management. Developed using modern web technologies, it emphasizes type safety, state management, and user-friendly interactions without requiring authentication.

This project fulfills the requirements of a minimal library management system, including book CRUD operations, borrowing functionality, and a borrow summary, all while maintaining a responsive and intuitive interface.

## Features
### Book Management 🛠️
- **Book List**: Displays all books in a responsive table with columns for Title, Author, Genre, ISBN, Copies, Availability, and Actions (Edit, Delete, Borrow, View Details).
- **Add Book**: Form to create a new book with fields for Title, Author, Genre, ISBN, Description, Copies, and Available (defaults to true). Redirects to the book list upon submission.
- **Edit Book**: Form pre-filled with existing book data for updating. Automatically marks a book as unavailable if copies reach 0.
- **Delete Book**: Confirmation dialog before deleting a book, updating the UI instantly.
- **View Details**: Displays detailed information about a single book, including creation and update timestamps.

### Borrow Management
- **Borrow Book**: Form to borrow a book, with fields for Quantity and Due Date. Validates that the quantity does not exceed available copies and marks the book as unavailable if copies reach 0. Redirects to the borrow summary upon success.
- **Borrow Summary**: Displays an aggregated summary of borrowed books, showing Book Title, ISBN, and Total Quantity Borrowed in a table format.

### UI/UX
- **Minimalist UI**: Clean and intuitive design using Tailwind CSS, ensuring a consistent look across all pages.
- **Responsive Layout**: Fully responsive, adapting seamlessly to mobile, tablet, and desktop devices.
- **Toast Notifications**: User feedback for actions (e.g., success, error) using `react-hot-toast`.
- **Optimistic UI Updates**: Instant UI updates for book creation, updates, and deletions using RTK Query’s caching and invalidation.
- **Type-Safe Forms**: All forms are built with TypeScript for type safety, ensuring robust data handling.

### Navigation
- **Navbar**: Simple navigation with links to All Books, Add Book, and Borrow Summary.
- **Footer**: Basic footer with project credits and information.

## Page List
- `/books`: Lists all books with actions to view, edit, delete, and borrow.
- `/create-book`: Form to add a new book.
- `/books/:id`: Displays detailed book information.
- `/edit-book/:id`: Form to edit an existing book.
- `/borrow/:bookId`: Form to borrow a book.
- `/borrow-summary`: Shows an aggregated summary of borrowed books.

## Technology Stack
| Layer             | Technology                       |
|-------------------|----------------------------------|
| **Frontend**      | React, TypeScript                |
| **State Management** | Redux Toolkit, RTK Query       |
| **Backend**       | Node.js, Express.js              |
| **Database**      | MongoDB, Mongoose                |
| **Styling**       | Tailwind CSS                     |
| **Icons**         | Lucide React                     |
| **Notifications** | react-hot-toast                  |

## Backend API
The backend is built with Node.js, Express.js, and MongoDB, following an MVC pattern. It provides the following endpoints:
- **Books**:
  - `GET /api/books`: Retrieves all books (supports pagination).
  - `GET /api/books/:id`: Retrieves a single book by ID.
  - `POST /api/books`: Creates a new book.
  - `PATCH /api/books/:id`: Updates an existing book.
  - `DELETE /api/books/:id`: Deletes a book.
- **Borrows**:
  - `POST /api/borrows/:bookId`: Creates a borrow record.
  - `GET /api/borrows/summary`: Retrieves an aggregated borrow summary.

### Database Schema
- **Books**:
  ```typescript
  interface IBook {
    _id: string;
    title: string;
    author: string;
    genre: string;
    isbn: string;
    description: string;
    copies: number;
    available: boolean;
    createdAt?: string;
    updatedAt?: string;
  }
  ```
- **Borrows**:
  ```typescript
  interface IBorrow {
    _id: string;
    bookId: string;
    quantity: number;
    dueDate: string;
    borrowDate: string;
  }
  ```
- **Borrow Summary**:
  ```typescript
  interface IBorrowSummary {
    bookTitle: string;
    isbn: string;
    totalQuantityBorrowed: number;
  }
  ```

## Setup Instructions
### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance, e.g., MongoDB Atlas)
- Git

### Backend Setup
1. Clone the repository:
   ```bash
   git clone <backend-repo-url>
   cd library-management-backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the backend root with:
   ```env
   PORT=5000
   MONGODB_URI=<your-mongodb-connection-string>
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```
   The API will be available at `http://localhost:5000/api`.

### Frontend Setup
1. Clone the repository:
   ```bash
   git clone <frontend-repo-url>
   cd library-management-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the frontend root with:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

## API Integration
- **RTK Query**: All API calls are managed using Redux Toolkit Query, with endpoints defined in `src/redux/api.ts`.
- **Endpoints**: The frontend consumes the backend APIs for books and borrows, with optimistic updates for CRUD operations and proper cache invalidation.
- **Error Handling**: User-friendly error messages are displayed via toast notifications and alerts for failed API requests.

## Deployment
- **Frontend**: Deployed on Vercel at `<frontend-deployment-url>` (e.g., `https://library-management-frontend.vercel.app`).
- **Backend**: Deployed on Render at `<backend-deployment-url>` (e.g., `https://library-management-backend.onrender.com`).
- **Database**: MongoDB Atlas is used for the cloud database, ensuring scalability and reliability.

## Bonus Features Implemented
- **Optimistic UI Updates (+2)**: RTK Query’s cache invalidation and optimistic updates ensure instant UI updates for book CRUD operations.
- **Toast Notifications (+2)**: `react-hot-toast` is used for success and error feedback across all actions.
- **Responsive Layout (+4)**: Tailwind CSS ensures the UI is fully responsive across mobile, tablet, and desktop devices.
- **Type-Safe Forms (+2)**: All forms use TypeScript for type safety, with robust validation for inputs.

**Total Bonus Points**: 10

## Project Structure
```
library-management-frontend/
├── src/
│   ├── components/
│   │   ├── ui/               # Reusable UI components (Button, Card, Table, etc.)
│   │   ├── Navbar.tsx        # Navigation bar
│   │   ├── Footer.tsx        # Footer
│   ├── pages/
│   │   ├── Books.tsx         # Book list with actions
│   │   ├── AddBook.tsx       # Form to add a new book
│   │   ├── EditBook.tsx      # Form to edit a book
│   │   ├── ViewDetails.tsx   # Book details page
│   │   ├── Borrow.tsx        # Form to borrow a book
│   │   ├── BorrowSummary.tsx # Borrow summary table
│   ├── redux/
│   │   ├── api.ts            # RTK Query API slice
│   │   ├── store.ts          # Redux store configuration
│   ├── types/
│   │   ├── index.ts          # TypeScript interfaces (IBook, IBorrow, IBorrowSummary)
│   ├── App.tsx               # Main app with routing
│   ├── main.tsx              # Entry point
├── .env                      # Environment variables
├── package.json
├── vite.config.ts

library-management-backend/
├── src/
│   ├── models/
│   │   ├── Book.ts           # Mongoose schema for books
│   │   ├── Borrow.ts         # Mongoose schema for borrows
│   ├── controllers/
│   │   ├── bookController.ts # Book CRUD logic
│   │   ├── borrowController.ts # Borrow logic
│   ├── routes/
│   │   ├── books.ts          # Book API routes
│   │   ├── borrows.ts        # Borrow API routes
│   ├── app.ts                # Express app setup
│   ├── server.ts             # Server entry point
├── .env                      # Environment variables
├── package.json
├── tsconfig.json
```

## Future Improvements
- Add authentication to restrict access to certain actions (e.g., admin-only book management).
- Implement pagination and filtering in the book list for better scalability.
- Enhance the borrow summary with sorting and additional details (e.g., borrow date).
- Add a search feature to filter books by title, author, or ISBN.


---

