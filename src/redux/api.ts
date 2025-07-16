import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IBook, IBorrow, IBorrowSummary } from "@/types";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  tagTypes: ["Books", "Borrows"],
  endpoints: (builder) => ({
    getBooks: builder.query<IBook[], void>({
      query: () => "/books",
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: IBook[];
      }) => response.data,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Books" as const, id: _id })),
              { type: "Books", id: "LIST" },
            ]
          : [{ type: "Books", id: "LIST" }],
    }),
    getBookById: builder.query<IBook, string>({
      query: (id) => `/books/${id}`,
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: IBook;
      }) => response.data,
      providesTags: (_result, _error, id) => [{ type: "Books", id }],
    }),
    addNewBook: builder.mutation<IBook, Partial<IBook>>({
      query: (newBook) => ({
        url: "/books",
        method: "POST",
        body: newBook,
      }),
      invalidatesTags: [{ type: "Books", id: "LIST" }],
    }),
    updateBook: builder.mutation<IBook, Partial<IBook> & { _id: string }>({
      query: ({ _id, ...patch }) => ({
        url: `/books/${_id}`,
        method: "PATCH",
        body: patch,
      }),
      async onQueryStarted({ _id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          api.util.updateQueryData("getBooks", undefined, (draft) => {
            const book = draft.find((b) => b._id === _id);
            if (book) Object.assign(book, patch);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: (_result, _error, { _id }) => [
        { type: "Books", id: _id },
        { type: "Books", id: "LIST" },
      ],
    }),
    deleteBook: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Books", id: "LIST" }],
    }),
    borrowBook: builder.mutation<
      IBorrow,
      { book: IBook; bookId: string; quantity: number; dueDate: string }
    >({
      query: ({ ...body }) => ({
        url: `/borrow`,
        method: "POST",
        body,
      }),
      invalidatesTags: [
        { type: "Books", id: "LIST" },
        { type: "Borrows", id: "SUMMARY" },
      ],
    }),
    getBorrowSummary: builder.query<IBorrowSummary[], void>({
      query: () => "/borrow/summary",
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: IBorrowSummary[];
      }) => response.data,
      providesTags: [{ type: "Borrows", id: "SUMMARY" }],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useAddNewBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useBorrowBookMutation,
  useGetBorrowSummaryQuery,
} = api;
