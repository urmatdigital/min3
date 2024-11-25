import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Plus, Filter } from 'lucide-react';
import LoanList from './LoanList';
import { format } from 'date-fns';

interface Loan {
  _id: string;
  book: {
    title: string;
    isbn: string;
  };
  user: {
    username: string;
  };
  borrowDate: string;
  dueDate: string;
  returnDate?: string;
  status: 'active' | 'returned' | 'overdue';
}

function Loans() {
  const { data: loans, isLoading } = useQuery<Loan[]>({
    queryKey: ['loans'],
    queryFn: () => fetch('/api/loans').then(res => res.json()),
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Book Loans</h1>
        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
          <Plus className="h-4 w-4 mr-2" />
          New Loan
        </button>
      </div>

      <div className="flex space-x-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search loans..."
              className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <LoanList loans={loans || []} />
      )}
    </div>
  );
}

export default Loans;