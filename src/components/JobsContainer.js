import Wrapper from '../assets/wrappers/JobsContainer'
import { useSelector, useDispatch } from 'react-redux'
import React from 'react'
import { getAllJobs } from '../features/allJobs/allJobsSlice'
import { PageBtnContainer, JobContainer, Loading } from '.'
const JobsContainer = () => {
  var {
    jobs,
    isLoading,
    page,
    totalJobs,
    numOfPages,
    search,
    searchStatus,
    searchType,
    sort,
  } = useSelector((state) => state.allJobs)
  var dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(getAllJobs())
  }, [dispatch, page, search, searchStatus, searchType, sort])
  if (isLoading) {
    return (
      <Wrapper>
        <Loading center={true} />
      </Wrapper>
    )
  }
  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No Jobs to display...</h2>
      </Wrapper>
    )
  }
  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 && 's'} found
      </h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <JobContainer key={job._id} {...job} />
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  )
}

export default JobsContainer
