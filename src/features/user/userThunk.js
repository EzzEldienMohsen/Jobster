import { autoFetch } from '../../utilities'
import { logoutUser } from './userSlice'
import { clearAllJobs } from '../allJobs/allJobsSlice'
import { clearValues } from '../job/jobSlice'

export var clearStoreThunk = async (message, thunkAPI) => {
  try {
    // logging user out
    thunkAPI.dispatch(logoutUser(message))
    // clear all job states
    thunkAPI.dispatch(clearAllJobs())
    //clear the add job page parameters
    thunkAPI.dispatch(clearValues())
    return Promise.resolve()
  } catch (error) {
    return Promise.reject()
  }
}

export var registerUserThunk = async (url, user, thunkAPI) => {
  try {
    var response = await autoFetch.post(url, user)
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}
export var loginThunk = async (url, user, thunkAPI) => {
  try {
    var response = await autoFetch.post(url, user)
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}

export var updateUserThunk = async (url, user, thunkAPI) => {
  try {
    var response = await autoFetch.patch(url, user, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    })
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
