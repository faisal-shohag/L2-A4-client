import { Link } from 'react-router';
import { toast } from 'react-hot-toast';
import { useGetBooksQuery, useDeleteBookMutation } from '@/redux/api';
import type { IBook } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Edit, Trash2, BookOpen, AlertCircle, HeartHandshakeIcon } from 'lucide-react';

export default function AllBooks() {
  const { data: books, isLoading, isError, error } = useGetBooksQuery();
  const [deleteBook] = useDeleteBookMutation();

  const handleDelete = async (id: string) => {
    try {
      await deleteBook(id).unwrap();
      toast.success('Book deleted successfully!');
    } catch (err) {
      console.log(err);
      toast.error('Failed to delete the book.');
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
        <Card>
          <CardHeader>
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
          </CardHeader>
          <CardContent className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 w-full bg-gray-200 rounded animate-pulse"></div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Error loading books: {JSON.stringify(error)}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>All Books</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Title</th>
                  <th className="text-left py-3 px-4 font-medium">Author</th>
                  <th className="text-left py-3 px-4 font-medium">Genre</th>
                  <th className="text-left py-3 px-4 font-medium">Copies</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-right py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {books?.map((book: IBook) => (
                  <tr key={book._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{book.title}</td>
                    <td className="py-3 px-4">{book.author}</td>
                    <td className="py-3 px-4">
                      <Badge variant="secondary">{book.genre}</Badge>
                    </td>
                    <td className="py-3 px-4">{book.copies}</td>
                    <td className="py-3 px-4">
                      <Badge variant={book.available ? "default" : "destructive"}>
                        {book.available ? 'Available' : 'Unavailable'}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/edit-book/${book._id}`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>

                         <Button variant="ghost" size="sm" asChild disabled={!book.available}>
                          <Link to={`/details/${book._id}`}>
                            <BookOpen className="h-4 w-4" />
                          </Link>
                        </Button>

                         <Button variant="ghost" size="sm" asChild disabled={!book.available}>
                          <Link to={`/borrow/${book._id}`}>
                            <HeartHandshakeIcon className="h-4 w-4" />
                          </Link>
                        </Button>


                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Book</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{book.title}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(book._id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>

                       
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}