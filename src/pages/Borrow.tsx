import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { toast } from 'react-hot-toast';
import { useGetBookByIdQuery, useBorrowBookMutation } from '@/redux/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Book, Loader2, AlertCircle } from 'lucide-react';

const Borrow = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: book, isLoading: isFetching, error } = useGetBookByIdQuery(id!);
  const [borrowBook, { isLoading: isBorrowing }] = useBorrowBookMutation();

  const [formData, setFormData] = useState({
    quantity: 1,
    dueDate: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.quantity || formData.quantity < 1) {
      newErrors.quantity = 'Quantity must be at least 1';
    } else if (book && formData.quantity > book.copies) {
      newErrors.quantity = `Cannot borrow more than ${book.copies} available copies`;
    }

    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required';
    } else {
      const selectedDate = new Date(formData.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Normalize to start of day
      if (selectedDate <= today) {
        newErrors.dueDate = 'Due date must be in the future';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    try {
      await borrowBook({
        bookId: id!,
        book: book!,
        quantity: formData.quantity,
        dueDate: formData.dueDate,
      }).unwrap();
      toast.success('Book borrowed successfully!');
    } catch (error) {
      console.error('Error borrowing book:', error);
      toast.error('Failed to borrow book. Please try again.');
    }
  };

  const handleReset = () => {
    setFormData({
      quantity: 1,
      dueDate: '',
    });
    setErrors({});
  };

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

  if (!book.available || book.copies < 1) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          This book is not available for borrowing.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-3xl font-bold tracking-tight">Borrow Book</h1>
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
          <div className="space-y-6">
            {/* Book Information */}
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
                <h3 className="text-lg font-semibold">Available Copies</h3>
                <p className="text-gray-600">{book.copies}</p>
              </div>
            </div>

            {/* Borrow Form */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Quantity */}
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity *</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    value={formData.quantity}
                    onChange={(e) => handleInputChange('quantity', parseInt(e.target.value) || 1)}
                    placeholder="Enter number of copies"
                    className={errors.quantity ? 'border-red-500' : ''}
                  />
                  {errors.quantity && (
                    <p className="text-sm text-red-500 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.quantity}
                    </p>
                  )}
                </div>

                {/* Due Date */}
                <div className="space-y-2">
                  <Label htmlFor="dueDate">Due Date *</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => handleInputChange('dueDate', e.target.value)}
                    className={errors.dueDate ? 'border-red-500' : ''}
                  />
                  {errors.dueDate && (
                    <p className="text-sm text-red-500 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.dueDate}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-between pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleReset}
                  disabled={isBorrowing || isFetching}
                >
                  Reset Form
                </Button>
                <div className="flex space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/')}
                    disabled={isBorrowing || isFetching}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleSubmit} disabled={isBorrowing || isFetching}>
                    {isBorrowing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Borrow Book
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Borrow;