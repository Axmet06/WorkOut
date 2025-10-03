import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Job, JobsState, JobFilters } from '../../types';

const initialState: JobsState = {
  list: [],
  selectedJob: null,
  filters: {},
  userJobs: [],
  createJobStatus: 'idle',
  createJobError: null,
};

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setJobs: (state, action: PayloadAction<Job[]>) => {
      state.list = action.payload;
    },
    setFilters: (state, action: PayloadAction<JobFilters>) => {
      state.filters = action.payload;
    },
    updateFilter: (state, action: PayloadAction<{ key: keyof JobFilters; value: any }>) => {
      const { key, value } = action.payload;
      if (value === undefined || value === '') {
        delete state.filters[key];
      } else {
        state.filters[key] = value;
      }
      // state.currentPage = 1; // Удалено из JobsState
    },
    // setCurrentPage: (state, action: PayloadAction<number>) => {
    //   state.currentPage = action.payload;
    // },
    // setPagination: (state, action: PayloadAction<{ totalPages: number; totalCount: number }>) => {
    //   state.totalPages = action.payload.totalPages;
    //   state.totalCount = action.payload.totalCount;
    // },
    // setLoading: (state, action: PayloadAction<boolean>) => {
    //   state.isLoading = action.payload;
    // },
    addJob: (state, action: PayloadAction<Job>) => {
      state.list.unshift(action.payload);
    },
    updateJob: (state, action: PayloadAction<Job>) => {
      const index = state.list.findIndex(job => job.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    removeJob: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter(job => job.id !== action.payload);
    },
    setUserJobs: (state, action: PayloadAction<Job[]>) => {
      state.userJobs = action.payload;
    },
    addUserJob: (state, action: PayloadAction<Job>) => {
      state.userJobs.unshift(action.payload);
    },
    updateUserJob: (state, action: PayloadAction<Job>) => {
      const index = state.userJobs.findIndex(job => job.id === action.payload.id);
      if (index !== -1) {
        state.userJobs[index] = action.payload;
      }
    },
    removeUserJob: (state, action: PayloadAction<string>) => {
      state.userJobs = state.userJobs.filter(job => job.id !== action.payload);
    },
    setSelectedJob: (state, action: PayloadAction<Job | null>) => {
      state.selectedJob = action.payload;
    },
    createJobStart: (state) => {
      state.createJobStatus = 'loading';
      state.createJobError = null;
    },
    createJobSuccess: (state, action: PayloadAction<Job>) => {
      state.createJobStatus = 'success';
      state.list.unshift(action.payload);
      state.userJobs.unshift(action.payload);
    },
    createJobFailure: (state, action: PayloadAction<string>) => {
      state.createJobStatus = 'error';
      state.createJobError = action.payload;
    },
    resetCreateJobStatus: (state) => {
      state.createJobStatus = 'idle';
      state.createJobError = null;
    },
  },
});

export const {
  setJobs,
  setFilters,
  updateFilter,
  // setCurrentPage,
  // setPagination,
  // setLoading,
  addJob,
  updateJob,
  removeJob,
  setUserJobs,
  addUserJob,
  updateUserJob,
  removeUserJob,
  setSelectedJob,
  createJobStart,
  createJobSuccess,
  createJobFailure,
  resetCreateJobStatus,
} = jobsSlice.actions;
export default jobsSlice.reducer;
