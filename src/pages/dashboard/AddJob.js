import { FormRow, FormSelect } from '../../components'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import {
  clearValues,
  createJob,
  modifyJob,
  handleTheChange,
} from '../../features/job/jobSlice'
import React from 'react'

const AddJob = () => {
  var { user } = useSelector((state) => state.user)
  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    isEditing,
    editJobId,
  } = useSelector((store) => store.job)
  var dispatch = useDispatch()

  var handleSubmit = (e) => {
    e.preventDefault()
    if (!company || !jobLocation || !position) {
      toast.error('please fill out all fields')
      return
    }
    if (isEditing) {
      dispatch(
        modifyJob({
          jobId: editJobId,
          job: {
            position,
            company,
            jobLocation,
            jobType,
            status,
          },
        })
      )
      return
    }

    dispatch(createJob({ position, company, jobLocation, jobType, status }))
  }
  var handleChange = (e) => {
    var name = e.target.name
    var value = e.target.value
    dispatch(handleTheChange({ name, value }))
  }
  React.useEffect(() => {
    if (!isEditing) {
      dispatch(handleTheChange({ name: 'jobLocation', value: user.location }))
    }
  }, [dispatch, isEditing, user.location])
  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>{isEditing ? 'edit job' : 'add job'}</h3>
        <div className="form-center">
          {/* POSITION */}
          <FormRow
            type="text"
            label="position"
            name="position"
            value={position}
            handleChange={handleChange}
          />
          {/* COMPANY */}
          <FormRow
            type="text"
            label="company"
            name="company"
            value={company}
            handleChange={handleChange}
          />
          {/* JOB LOCATION */}
          <FormRow
            type="text"
            label="job location"
            name="jobLocation"
            value={jobLocation}
            handleChange={handleChange}
          />
          {/* status  select */}
          <FormSelect
            name="status"
            label="status"
            value={status}
            handleChange={handleChange}
            array={statusOptions}
          />
          {/* second select */}
          <FormSelect
            name="jobType"
            label="job type"
            value={jobType}
            handleChange={handleChange}
            array={jobTypeOptions}
          />
          {/* button container */}
          <div className="btn-container">
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={() => dispatch(clearValues())}
            >
              clear
            </button>
            <button
              type="submit"
              className="btn btn-block submit-btn"
              disabled={isLoading}
            >
              {isLoading ? 'submitting...' : 'submit'}
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}

export default AddJob
