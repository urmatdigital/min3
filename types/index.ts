export interface User {
  _id: string;
  username: string;
  role: 'admin' | 'librarian' | 'user';
  library?: {
    _id: string;
    name: string;
  };
}

export interface Book {
  _id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  status: 'available' | 'borrowed' | 'maintenance';
  location: {
    _id: string;
    name: string;
  };
}

export interface Document {
  _id: string;
  name: string;
  type: string;
  size: string;
  uploadedAt: string;
  url: string;
}

export interface Library {
  _id: string;
  name: string;
  type: 'republican' | 'regional' | 'district' | 'city' | 'children' | 'branch' | 'rural';
  address: string;
  contact: string;
}