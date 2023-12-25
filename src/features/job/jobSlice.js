import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getUserFromLocalStorage } from '../../utilities';
import { createJobThunk, deleteJobThunk, modifyJobThunk } from './jobThunk';

const initialState = {
  isLoading: false,
  position: '',
  company: '',
  jobLocation: '',
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  jobType: 'full-time',
  statusOptions: ['interview', 'declined', 'pending'],
  status: 'pending',
  isEditing: false,
  editJobId: '',
};
export var deleteJob = createAsyncThunk('job/deleteJob', (jobId, thunkAPI) =>
  deleteJobThunk(jobId, thunkAPI)
);

export var createJob = createAsyncThunk('job/createJob', (job, thunkAPI) => {
  createJobThunk(job, thunkAPI);
});

export var modifyJob = createAsyncThunk(
  'job/modifyJob',
  ({ jobId, job }, thunkAPI) => modifyJobThunk({ jobId, job }, thunkAPI)
);

var jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    handleTheChange: (state, action) => {
      var { name, value } = action.payload;
      state[name] = value;
    },
    clearValues: () => {
      return {
        ...initialState,
        jobLocation: getUserFromLocalStorage()?.location || '',
      };
    },
    setEditJob: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success('job added');
      })
      .addCase(createJob.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      })
      .addCase(deleteJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteJob.fulfilled, (state) => {
        state.isLoading = false;
        toast.success('job deleted');
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      })
      .addCase(modifyJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(modifyJob.fulfilled, (state) => {
        state.isLoading = false;
        toast.success('Job Modified...');
      })
      .addCase(modifyJob.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      });
  },
});
export var { handleTheChange, clearValues, setEditJob } = jobSlice.actions;
export default jobSlice.reducer;
