import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAddNewBookMutation } from '@/redux/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

import { BookPlus, Loader2, AlertCircle } from 'lucide-react';

const genres = [
  'POETRY',
  'FICTION',
  'NON_FICTION',
  'SCIENCE',
  'HISTORY',
  'BIOGRAPHY',
  'THRILLER',
  'ADVENTURE',
  'DITECTIVE',
  'NATURE',
  'FANTASY'
];

const AddBook = () => {
  const [addNewBook, { isLoading }] = useAddNewBookMutation();
  
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    isbn: '',
    description: '',
    copies: 1,
    available: true
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
    }

    if (!formData.genre) {
      newErrors.genre = 'Genre is required';
    }

    if (!formData.isbn.trim()) {
      newErrors.isbn = 'ISBN is required';
    } else if (!/^\d{10}(\d{3})?$/.test(formData.isbn.replace(/-/g, ''))) {
      newErrors.isbn = 'Invalid ISBN format';
    }

    if (formData.copies < 1) {
      newErrors.copies = 'Copies must be at least 1';
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
      const bookData = {
        ...formData,
        copies: Number(formData.copies)
      };

      await addNewBook(bookData).unwrap();
      toast.success('Book added successfully!');
    } catch (error) {
      console.error('Error adding book:', error);
      toast.error('Failed to add book. Please try again.');
    }
  };

  const handleReset = () => {
    setFormData({
      title: '',
      author: '',
      genre: '',
      isbn: '',
      description: '',
      copies: 1,
      available: true
    });
    setErrors({});
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-3xl font-bold tracking-tight">Add New Book</h1>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BookPlus className="h-5 w-5 mr-2" />
            Book Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter book title"
                  className={errors.title ? 'border-red-500' : ''}
                />
                {errors.title && (
                  <p className="text-sm text-red-500 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.title}
                  </p>
                )}
              </div>

              {/* Author */}
              <div className="space-y-2">
                <Label htmlFor="author">Author *</Label>
                <Input
                  id="author"
                  value={formData.author}
                  onChange={(e) => handleInputChange('author', e.target.value)}
                  placeholder="Enter author name"
                  className={errors.author ? 'border-red-500' : ''}
                />
                {errors.author && (
                  <p className="text-sm text-red-500 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.author}
                  </p>
                )}
              </div>

              {/* Genre */}
              <div className="space-y-2">
                <Label htmlFor="genre">Genre *</Label>
                <Select value={formData.genre} onValueChange={(value) => handleInputChange('genre', value)}>
                  <SelectTrigger className={errors.genre ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select genre" />
                  </SelectTrigger>
                  <SelectContent>
                    {genres.map((genre) => (
                      <SelectItem key={genre} value={genre}>
                        {genre.replace(/_/g, ' ')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.genre && (
                  <p className="text-sm text-red-500 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.genre}
                  </p>
                )}
              </div>

              {/* ISBN */}
              <div className="space-y-2">
                <Label htmlFor="isbn">ISBN *</Label>
                <Input
                  id="isbn"
                  value={formData.isbn}
                  onChange={(e) => handleInputChange('isbn', e.target.value)}
                  placeholder="Enter ISBN (10 or 13 digits)"
                  className={errors.isbn ? 'border-red-500' : ''}
                />
                {errors.isbn && (
                  <p className="text-sm text-red-500 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.isbn}
                  </p>
                )}
              </div>

              {/* Copies */}
              <div className="space-y-2">
                <Label htmlFor="copies">Number of Copies *</Label>
                <Input
                  id="copies"
                  type="number"
                  min="1"
                  value={formData.copies}
                  onChange={(e) => handleInputChange('copies', parseInt(e.target.value) || 1)}
                  className={errors.copies ? 'border-red-500' : ''}
                />
                {errors.copies && (
                  <p className="text-sm text-red-500 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.copies}
                  </p>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Enter book description"
                rows={4}
              />
            </div>

            {/* Available Checkbox */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="available"
                checked={formData.available}
                onCheckedChange={(checked) => handleInputChange('available', checked)}
              />
              <Label htmlFor="available">Available for borrowing</Label>
            </div>

            {/* Submit Buttons */}
            <div className="flex items-center justify-between pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
                disabled={isLoading}
              >
                Reset Form
              </Button>
              <div className="flex space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => console.log('Navigate back to /books')}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button onClick={handleSubmit} disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Add Book
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddBook;