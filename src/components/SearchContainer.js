import { FormRow, FormSelect } from '.'
import Wrapper from '../assets/wrappers/SearchContainer'
import { useSelector, useDispatch } from 'react-redux'
import { clearFilters, handleChange } from '../features/allJobs/allJobsSlice'
const SearchContainer = () => {
  var { isLoading, search, searchStatus, searchType, sort, sortOptions } =
    useSelector((state) => state.allJobs)
  var { jobTypeOptions, statusOptions } = useSelector((state) => state.job)
  var dispatch = useDispatch()
  var handleSearch = (e) => {
    if (isLoading) return
    dispatch(handleChange({ name: e.target.name, value: e.target.value }))
  }
  var handleSubmit = (e) => {
    e.preventDefault()
    dispatch(clearFilters())
  }
  return (
    <Wrapper>
      <form className="form">
        <h4>search form</h4>
        <div className="form-center">
          {/* SEARCH */}
          <FormRow
            type="text"
            name="search"
            label="search"
            value={search}
            handleChange={handleSearch}
          />
          {/* STATUS SELECT */}
          <FormSelect
            label="status"
            name="searchStatus"
            value={searchStatus}
            handleChange={handleSearch}
            array={['all', ...statusOptions]}
          />
          {/* TYPE SELECT */}
          <FormSelect
            label="type"
            name="searchType"
            value={searchType}
            handleChange={handleSearch}
            array={['all', ...jobTypeOptions]}
          />
          {/* SORT SELECT */}
          <FormSelect
            label="sort"
            name="sort"
            value={sort}
            handleChange={handleSearch}
            array={sortOptions}
          />
          <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  )
}

export default SearchContainer
