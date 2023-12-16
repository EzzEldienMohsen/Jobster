import Wrapper from '../assets/wrappers/BigSidebar'
import { NavLinks } from '../components'
import Logo from '../components/Logo'
import { useSelector } from 'react-redux'
const BigSideBar = () => {
  var isSidebarOpen = useSelector((state) => state.user.isSidebarOpen)
  return (
    <Wrapper>
      <div
        className={
          isSidebarOpen
            ? 'sidebar-container show-sidebar'
            : 'sidebar-container '
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  )
}

export default BigSideBar
