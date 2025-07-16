import { createBrowserRouter } from "react-router";
import MainLayout from "./layouts/MainLayout";
import AllBooks from "./pages/AllBooks";
import AddBook from "./pages/AddBook";
import BorrowSummary from "./pages/BorrowSummary";
import EditBook from "./pages/EditBook";
import ViewDetails from "./pages/ViewDetails";
import Borrow from "./pages/Borrow";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <AllBooks/>,
      },
      {
        path: "/add-book",
        element: <AddBook/>,
      },
        {
        path: "/edit-book/:id",
        element: <EditBook/>,
      },
         {
        path: "/details/:id",
        element: <ViewDetails/>,
      },
       {
        path: "/borrow/:id",
        element: <Borrow/>,
      },
       {
        path: "/borrow-summary",
        element: <BorrowSummary/>,
      },
    ],
  }
 
]);