import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/osmonov-library');

// Models
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'librarian', 'user'], default: 'user' },
  library: { type: mongoose.Schema.Types.ObjectId, ref: 'Library' },
});

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  isbn: { type: String, required: true, unique: true },
  category: String,
  location: { type: mongoose.Schema.Types.ObjectId, ref: 'Library' },
  status: { type: String, enum: ['available', 'borrowed', 'maintenance'] },
});

const LibrarySchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: {
    type: String,
    enum: ['republican', 'regional', 'district', 'city', 'children', 'branch', 'rural'],
  },
  address: String,
  contact: String,
});

const LoanSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  borrowDate: { type: Date, default: Date.now },
  dueDate: Date,
  returnDate: Date,
  status: { type: String, enum: ['active', 'returned', 'overdue'] },
});

const User = mongoose.model('User', UserSchema);
const Book = mongoose.model('Book', BookSchema);
const Library = mongoose.model('Library', LibrarySchema);
const Loan = mongoose.model('Loan', LoanSchema);

// Middleware
const auth = async (req: any, res: any, next: any) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) throw new Error();

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    const user = await User.findById(decoded.id);
    
    if (!user) throw new Error();
    
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate' });
  }
};

// Routes
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});