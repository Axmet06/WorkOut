import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AdminState, AdminUser, AdminJob, Report } from '../../types';

const initialState: AdminState = {
  users: [],
  jobs: [],
  reports: [],
  statistics: {
    totalUsers: 0,
    totalJobs: 0,
    totalReports: 0,
    activeUsers: 0,
    completedJobs: 0,
    blockedUsers: 0,
    blockedJobs: 0,
  },
  isLoading: false,
  error: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setUsers: (state, action: PayloadAction<AdminUser[]>) => {
      state.users = action.payload;
      state.statistics.totalUsers = action.payload.length;
      state.statistics.activeUsers = action.payload.filter(user => !user.isBlocked).length;
      state.statistics.blockedUsers = action.payload.filter(user => user.isBlocked).length;
    },
    setJobs: (state, action: PayloadAction<AdminJob[]>) => {
      state.jobs = action.payload;
      state.statistics.totalJobs = action.payload.length;
      state.statistics.completedJobs = action.payload.filter(job => job.status === 'completed').length;
      state.statistics.blockedJobs = action.payload.filter(job => job.isBlocked).length;
    },
    setReports: (state, action: PayloadAction<Report[]>) => {
      state.reports = action.payload;
      state.statistics.totalReports = action.payload.length;
    },
    blockUser: (state, action: PayloadAction<string>) => {
      const user = state.users.find(u => u.id === action.payload);
      if (user) {
        user.isBlocked = true;
        state.statistics.activeUsers--;
        state.statistics.blockedUsers++;
      }
    },
    unblockUser: (state, action: PayloadAction<string>) => {
      const user = state.users.find(u => u.id === action.payload);
      if (user) {
        user.isBlocked = false;
        state.statistics.activeUsers++;
        state.statistics.blockedUsers--;
      }
    },
    blockJob: (state, action: PayloadAction<string>) => {
      const job = state.jobs.find(j => j.id === action.payload);
      if (job) {
        job.isBlocked = true;
        state.statistics.blockedJobs++;
      }
    },
    unblockJob: (state, action: PayloadAction<string>) => {
      const job = state.jobs.find(j => j.id === action.payload);
      if (job) {
        job.isBlocked = false;
        state.statistics.blockedJobs--;
      }
    },
    updateReportStatus: (state, action: PayloadAction<{ reportId: string; status: Report['status']; reviewedBy: string }>) => {
      const report = state.reports.find(r => r.id === action.payload.reportId);
      if (report) {
        report.status = action.payload.status;
        report.reviewedAt = new Date().toISOString();
        report.reviewedBy = action.payload.reviewedBy;
      }
    },
    deleteJob: (state, action: PayloadAction<string>) => {
      state.jobs = state.jobs.filter(job => job.id !== action.payload);
      state.statistics.totalJobs--;
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      const user = state.users.find(u => u.id === action.payload);
      if (user) {
        if (user.isBlocked) {
          state.statistics.blockedUsers--;
        } else {
          state.statistics.activeUsers--;
        }
        state.statistics.totalUsers--;
      }
      state.users = state.users.filter(u => u.id !== action.payload);
    },
  },
});

export const {
  setLoading,
  setError,
  setUsers,
  setJobs,
  setReports,
  blockUser,
  unblockUser,
  blockJob,
  unblockJob,
  updateReportStatus,
  deleteJob,
  deleteUser,
} = adminSlice.actions;

export default adminSlice.reducer;
