import { autoFetch } from '../../utilities'
import { logoutUser } from '../user/userSlice'
import { authHeader } from '../job/jobThunk'

export var getAllJobsThunk = async (_, thunkAPI) => {
  var { search, searchStatus, searchType, sort, page } =
    thunkAPI.getState().allJobs
  var url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`
  if (search) {
    url = url + `&search=${search}`
  }
  try {
    var response = await autoFetch(url, authHeader(thunkAPI))
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

export var getStatsThunk = async (_, thunkAPI) => {
  try {
    var response = await autoFetch('/jobs/stats', authHeader(thunkAPI))
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
