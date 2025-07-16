
import { useGetBorrowSummaryQuery } from '@/redux/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Library, Loader2, AlertCircle } from 'lucide-react';


const BorrowSummary = () => {
  const { data: borrowSummary, isLoading: isFetching, error } = useGetBorrowSummaryQuery();

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error || !borrowSummary) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to load borrow summary. Please try again.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-3xl font-bold tracking-tight">Borrow Summary</h1>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Library className="h-5 w-5 mr-2" />
            Borrow Records
          </CardTitle>
        </CardHeader>
        <CardContent>
          {borrowSummary.length === 0 ? (
            <p className="text-gray-600">No borrow records found.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Book Title</TableHead>
                  <TableHead>ISBN</TableHead>
                  <TableHead>Total Quantity Borrowed</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {borrowSummary.map((record, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{record.book.title}</TableCell>
                    <TableCell>{record.book.isbn}</TableCell>
                    <TableCell>{record.totalQuantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BorrowSummary;