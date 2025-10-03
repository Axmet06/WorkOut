export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'client' | 'executor' | 'admin';
}

export interface Job {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  currency: string;
  deadline: string;
  location: string;
  urgency: 'low' | 'medium' | 'high';
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  clientId: string;
  clientName: string;
  createdAt: string;
  updatedAt: string;
}

export interface JobFilters {
  category?: string;
  urgency?: string;
  minPrice?: number;
  maxPrice?: number;
  location?: string;
  search?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoggingIn: boolean;
  isRegistering: boolean;
  error: string | null;
}

export interface JobsState {
  list: Job[];
  selectedJob: Job | null;
  filters: JobFilters;
  userJobs: Job[];
  createJobStatus: 'idle' | 'loading' | 'success' | 'error';
  createJobError: string | null;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string;
}

export interface NotificationsState {
  list: Notification[];
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  jobId: string;
  clientId: string;
  executorId: string;
  clientName: string;
  executorName: string;
  lastMessage?: Message;
  unreadCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ChatState {
  conversations: Conversation[];
  currentConversation: Conversation | null;
}

// Admin types
export interface AdminUser extends User {
  isBlocked: boolean;
  registrationDate: string;
  lastActivity: string;
  totalJobs: number;
  completedJobs: number;
  rating: number;
}

export interface AdminJob extends Job {
  isBlocked: boolean;
  reportsCount: number;
  lastReported?: string;
}

export interface Report {
  id: string;
  jobId: string;
  reporterId: string;
  reporterName: string;
  reason: string;
  description: string;
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed';
  createdAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
}

export interface AdminState {
  users: AdminUser[];
  jobs: AdminJob[];
  reports: Report[];
  statistics: {
    totalUsers: number;
    totalJobs: number;
    totalReports: number;
    activeUsers: number;
    completedJobs: number;
    blockedUsers: number;
    blockedJobs: number;
  };
  isLoading: boolean;
  error: string | null;
}
