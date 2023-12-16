import { logoutUser } from '../user/userSlice'
import { showLoading, hideLoading, getAllJobs } from '../allJobs/allJobsSlice'
import { autoFetch } from '../../utilities'
import { clearValues } from './jobSlice'
import { redirect } from 'react-router-dom'

export var authHeader = (thunkAPI) => {
  return {
    headers: {
      authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
    },
  }
}

export var deleteJobThunk = async (jobId, thunkAPI) => {
  thunkAPI.dispatch(showLoading())
  try {
    var response = await autoFetch.delete(`/jobs/${jobId}`, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    })
    thunkAPI.dispatch(getAllJobs())
    return response.data
  } catch (error) {
    thunkAPI.dispatch(hideLoading())
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser())
      return thunkAPI.rejectWithValue('Unauthorized! Logging Out...')
    }
    console.log(error.response)
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}
export var createJobThunk = async (job, thunkAPI) => {
  try {
    var response = await autoFetch.post('/jobs', job, authHeader(thunkAPI))

    thunkAPI.dispatch(clearValues())
    redirect('/all-jobs')
    return response.data
  } catch (error) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser())
      return thunkAPI.rejectWithValue('Unauthorized! Logging Out...')
    }
    console.log(error.response)
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}
export var modifyJobThunk = async ({ jobId, job }, thunkAPI) => {
  try {
    var response = await autoFetch.patch(`/jobs/${jobId}`, job, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    })
    thunkAPI.dispatch(clearValues())
    redirect('/all-jobs')
    return response.data
  } catch (error) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser())
      return thunkAPI.rejectWithValue('Unauthorized! Logging Out...')
    }
    console.log(error.response)
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}
