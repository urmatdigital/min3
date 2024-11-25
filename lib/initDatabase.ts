import { supabase } from './supabase';

export async function initDatabase() {
  try {
    // Create Users table
    await supabase.rpc('create_users_table', {
      sql: `
        CREATE TABLE IF NOT EXISTS users (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          email VARCHAR(255) UNIQUE NOT NULL,
          full_name VARCHAR(255) NOT NULL,
          phone VARCHAR(20),
          address TEXT,
          role VARCHAR(20) DEFAULT 'user',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `
    });

    // Create Authors table
    await supabase.rpc('create_authors_table', {
      sql: `
        CREATE TABLE IF NOT EXISTS authors (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          name VARCHAR(255) NOT NULL,
          biography TEXT,
          birth_date DATE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `
    });

    // Create Categories table
    await supabase.rpc('create_categories_table', {
      sql: `
        CREATE TABLE IF NOT EXISTS categories (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          name VARCHAR(100) NOT NULL,
          description TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `
    });

    // Create Books table
    await supabase.rpc('create_books_table', {
      sql: `
        CREATE TABLE IF NOT EXISTS books (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          title VARCHAR(255) NOT NULL,
          isbn VARCHAR(13) UNIQUE,
          publication_year INTEGER,
          publisher VARCHAR(255),
          description TEXT,
          total_copies INTEGER NOT NULL DEFAULT 1,
          available_copies INTEGER NOT NULL DEFAULT 1,
          category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `
    });

    // Create Book_Authors junction table
    await supabase.rpc('create_book_authors_table', {
      sql: `
        CREATE TABLE IF NOT EXISTS book_authors (
          book_id UUID REFERENCES books(id) ON DELETE CASCADE,
          author_id UUID REFERENCES authors(id) ON DELETE CASCADE,
          PRIMARY KEY (book_id, author_id),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `
    });

    // Create BookLoans table
    await supabase.rpc('create_book_loans_table', {
      sql: `
        CREATE TABLE IF NOT EXISTS book_loans (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          user_id UUID REFERENCES users(id) ON DELETE CASCADE,
          book_id UUID REFERENCES books(id) ON DELETE CASCADE,
          loan_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          due_date TIMESTAMP WITH TIME ZONE NOT NULL,
          return_date TIMESTAMP WITH TIME ZONE,
          status VARCHAR(20) DEFAULT 'borrowed' CHECK (status IN ('borrowed', 'returned', 'overdue')),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `
    });

    // Create Reviews table
    await supabase.rpc('create_reviews_table', {
      sql: `
        CREATE TABLE IF NOT EXISTS reviews (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          user_id UUID REFERENCES users(id) ON DELETE CASCADE,
          book_id UUID REFERENCES books(id) ON DELETE CASCADE,
          rating INTEGER CHECK (rating >= 1 AND rating <= 5),
          comment TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `
    });

    // Create indexes
    await supabase.rpc('create_indexes', {
      sql: `
        CREATE INDEX IF NOT EXISTS idx_books_category ON books(category_id);
        CREATE INDEX IF NOT EXISTS idx_book_loans_user ON book_loans(user_id);
        CREATE INDEX IF NOT EXISTS idx_book_loans_book ON book_loans(book_id);
        CREATE INDEX IF NOT EXISTS idx_reviews_book ON reviews(book_id);
        CREATE INDEX IF NOT EXISTS idx_reviews_user ON reviews(user_id);
        CREATE INDEX IF NOT EXISTS idx_book_authors_book ON book_authors(book_id);
        CREATE INDEX IF NOT EXISTS idx_book_authors_author ON book_authors(author_id);
      `
    });

    // Create trigger function
    await supabase.rpc('create_trigger_function', {
      sql: `
        CREATE OR REPLACE FUNCTION update_updated_at_column()
        RETURNS TRIGGER AS $$
        BEGIN
          NEW.updated_at = CURRENT_TIMESTAMP;
          RETURN NEW;
        END;
        $$ language 'plpgsql';
      `
    });

    // Create triggers
    await supabase.rpc('create_triggers', {
      sql: `
        CREATE TRIGGER update_users_updated_at
          BEFORE UPDATE ON users
          FOR EACH ROW
          EXECUTE FUNCTION update_updated_at_column();

        CREATE TRIGGER update_books_updated_at
          BEFORE UPDATE ON books
          FOR EACH ROW
          EXECUTE FUNCTION update_updated_at_column();

        CREATE TRIGGER update_authors_updated_at
          BEFORE UPDATE ON authors
          FOR EACH ROW
          EXECUTE FUNCTION update_updated_at_column();

        CREATE TRIGGER update_categories_updated_at
          BEFORE UPDATE ON categories
          FOR EACH ROW
          EXECUTE FUNCTION update_updated_at_column();

        CREATE TRIGGER update_book_loans_updated_at
          BEFORE UPDATE ON book_loans
          FOR EACH ROW
          EXECUTE FUNCTION update_updated_at_column();

        CREATE TRIGGER update_reviews_updated_at
          BEFORE UPDATE ON reviews
          FOR EACH ROW
          EXECUTE FUNCTION update_updated_at_column();
      `
    });

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}
