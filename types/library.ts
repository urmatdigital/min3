export interface Library {
  id: string;
  name: string;
  type: string;
  region: string;
  district?: string;
  address: string;
  coordinates?: [number, number];
  phone?: string;
  email?: string;
  director_name?: string;
  building_status?: string;
  total_area?: number;
  working_hours?: string;
  created_at: string;
  updated_at: string;
}

export interface LibraryStatistics {
  id: string;
  library_id: string;
  date: string;
  visitors_count: number;
  new_readers_count: number;
  books_issued_count: number;
  events_held_count: number;
}

export interface BookCollection {
  id: string;
  library_id: string;
  total_books: number;
  electronic_resources: number;
  periodicals: number;
  rare_books: number;
  last_inventory_date?: string;
}

export interface Event {
  id: string;
  library_id: string;
  title: string;
  description?: string;
  event_type?: string;
  start_date: string;
  end_date: string;
  status: 'planned' | 'ongoing' | 'completed' | 'cancelled';
  participants_count?: number;
}

export interface Resource {
  id: string;
  library_id: string;
  resource_type: string;
  name: string;
  quantity?: number;
  condition?: string;
  purchase_date?: string;
  last_maintenance_date?: string;
}

export interface Staff {
  id: string;
  library_id: string;
  user_id: string;
  position: string;
  education?: string;
  hire_date?: string;
  qualification?: string;
  last_attestation_date?: string;
}

export interface Document {
  id: string;
  library_id: string;
  title: string;
  document_type: string;
  content?: string;
  file_url?: string;
  status: string;
}

export interface Report {
  id: string;
  library_id: string;
  report_type: string;
  period_start?: string;
  period_end?: string;
  content: any;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
}

export interface Task {
  id: string;
  library_id: string;
  assigned_to?: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  due_date?: string;
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  position?: string;
  phone?: string;
  role: 'admin' | 'manager' | 'staff';
  library_id?: string;
}
