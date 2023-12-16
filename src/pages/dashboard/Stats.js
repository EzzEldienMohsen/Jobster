import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getStats } from '../../features/allJobs/allJobsSlice'
import { Loading, ChartsContainer, StatsContainer } from '../../components'

const Stats = () => {
  var { isLoading, monthlyApplications } = useSelector((state) => state.allJobs)
  var dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(getStats())
  }, [dispatch])
  if (isLoading) {
    return <Loading center={true} />
  }
  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  )
}

export default Stats
