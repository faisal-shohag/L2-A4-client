
import { useParams } from 'react-router';
import { useGetBookByIdQuery } from '@/redux/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {  Book, Loader2, AlertCircle } from 'lucide-react';

const ViewDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: book, isLoading: isFetching, error } = useGetBookByIdQuery(id!);

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error || !book) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to load book details. Please try again.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-3xl font-bold tracking-tight">Book Details</h1>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Book className="h-5 w-5 mr-2" />
            {book.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Author</h3>
              <p className="text-gray-600">{book.author}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Genre</h3>
              <p className="text-gray-600">{book.genre.replace(/_/g, ' ')}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">ISBN</h3>
              <p className="text-gray-600">{book.isbn}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Description</h3>
              <p className="text-gray-600">{book.description || 'No description available'}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Copies</h3>
              <p className="text-gray-600">{book.copies}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Availability</h3>
              <p className="text-gray-600">{book.available ? 'Available' : 'Not Available'}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Created At</h3>
              <p className="text-gray-600">
                {book.createdAt ? new Date(book.createdAt).toLocaleString() : 'N/A'}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Updated At</h3>
              <p className="text-gray-600">
                {book.updatedAt ? new Date(book.updatedAt).toLocaleString() : 'N/A'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewDetails;