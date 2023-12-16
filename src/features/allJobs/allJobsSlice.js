import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { getAllJobsThunk, getStatsThunk } from './allJobsThunk'
const initialFiltersState = {
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
}

const initialState = {
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
}

export var getAllJobs = createAsyncThunk('allJobs/getAllJobs', getAllJobsThunk)
export var getStats = createAsyncThunk('allJobs/getStats', getStatsThunk)
var allJobsSlice = createSlice({
  name: 'allJobs',
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true
    },
    hideLoading: (state) => {
      state.isLoading = false
    },
    handleChange: (state, action) => {
      var name = action.payload.name
      var value = action.payload.value
      state.page = 1
      state[name] = value
    },
    clearFilters: (state) => {
      return { ...state, ...initialFiltersState }
    },
    changePage: (state, action) => {
      state.page = action.payload
    },
    clearAllJobs: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllJobs.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllJobs.fulfilled, (state, action) => {
        state.isLoading = false
        state.jobs = action.payload.jobs
        state.numOfPages = action.payload.numOfPages
        state.totalJobs = action.payload.totalJobs
      })
      .addCase(getAllJobs.rejected, (state, action) => {
        state.isLoading = false
        toast.error(action.payload)
      })
      .addCase(getStats.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getStats.fulfilled, (state, action) => {
        state.isLoading = false
        state.stats = action.payload.defaultStats
        state.monthlyApplications = action.payload.monthlyApplications
        console.log(state.stats)
        console.log(state.monthlyApplications)
      })
      .addCase(getStats.rejected, (state, action) => {
        state.isLoading = false
        toast.error(action.payload)
      })
  },
})

export var {
  showLoading,
  hideLoading,
  handleChange,
  clearFilters,
  changePage,
  clearAllJobs,
} = allJobsSlice.actions
export default allJobsSlice.reducer
