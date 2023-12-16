import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi'
import Wrapper from '../assets/wrappers/PageBtnContainer'
import { useSelector, useDispatch } from 'react-redux'
import { changePage } from '../features/allJobs/allJobsSlice'

const PageBtnContainer = () => {
  var { numOfPages, page } = useSelector((state) => state.allJobs)
  var dispatch = useDispatch()
  var pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1
  })
  var nextPage = () => {
    var newPage = page + 1
    if (newPage > numOfPages) {
      newPage = 1
    }
    dispatch(changePage(newPage))
  }
  var prevPage = () => {
    var newPage = page - 1
    if (newPage < 1) {
      newPage = numOfPages
    }
    dispatch(changePage(newPage))
  }
  return (
    <Wrapper>
      <button className="prev-btn" onClick={prevPage}>
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">
        {pages.map((pageNumber) => {
          return (
            <button
              type="button"
              className={pageNumber === page ? 'pageBtn active' : 'pageBtn'}
              key={pageNumber}
              onClick={() => dispatch(changePage(pageNumber))}
            >
              {pageNumber}
            </button>
          )
        })}
      </div>
      <button className="next-btn" onClick={nextPage}>
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  )
}

export default PageBtnContainer
