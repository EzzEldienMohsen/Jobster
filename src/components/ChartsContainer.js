import React from 'react'
import BarChar from './BarChar'
import AreChart from './AreChart'
import Wrapper from '../assets/wrappers/ChartsContainer'
import { useSelector } from 'react-redux'
const ChartsContainer = () => {
  var [bartChart, setBartChart] = React.useState(false)
  var { monthlyApplications } = useSelector((state) => state.allJobs)
  var data = monthlyApplications
  return (
    <Wrapper>
      <h5>Monthly Applications</h5>
      <button type="button" onClick={() => setBartChart(!bartChart)}>
        {bartChart ? 'Area Chart' : 'Bar Chart'}
      </button>
      {bartChart ? <BarChar data={data} /> : <AreChart data={data} />}
    </Wrapper>
  )
}

export default ChartsContainer
