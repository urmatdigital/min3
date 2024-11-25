import React from 'react';
import { format } from 'date-fns';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

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

interface LoanListProps {
  loans: Loan[];
}

function LoanList({ loans }: LoanListProps) {
  const getStatusBadge = (status: Loan['status']) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="mr-1 h-4 w-4" />
            Active
          </span>
        );
      case 'returned':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <XCircle className="mr-1 h-4 w-4" />
            Returned
          </span>
        );
      case 'overdue':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <AlertCircle className="mr-1 h-4 w-4" />
            Overdue
          </span>
        );
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Book
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Borrower
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Borrow Date
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Due Date
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {loans.map((loan) => (
            <tr key={loan._id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex flex-col">
                  <div className="text-sm font-medium text-gray-900">
                    {loan.book.title}
                  </div>
                  <div className="text-sm text-gray-500">
                    ISBN: {loan.book.isbn}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {loan.user.username}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {format(new Date(loan.borrowDate), 'MMM d, yyyy')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {format(new Date(loan.dueDate), 'MMM d, yyyy')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {getStatusBadge(loan.status)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                {loan.status === 'active' && (
                  <button className="text-indigo-600 hover:text-indigo-900">
                    Return Book
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LoanList;