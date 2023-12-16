import Wrapper from '../assets/wrappers/Navbar'
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa'
import Logo from './Logo'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearStore, toggleSidebar } from '../features/user/userSlice'

const Navbar = () => {
  var { user } = useSelector((state) => state.user)
  var [showSidebar, setShowSideBar] = React.useState(false)
  var dispatch = useDispatch()
  var toggle = () => {
    dispatch(toggleSidebar())
  }
  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggle}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <div className="logo-text">Dashboard</div>
        </div>
        <div className="btn-container">
          <button
            type="button"
            className="btn"
            onClick={() => setShowSideBar(!showSidebar)}
          >
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
          <div className={showSidebar ? 'dropdown show-dropdown' : 'dropdown'}>
            <button
              className="dropdown-btn"
              onClick={() => dispatch(clearStore('logging out...'))}
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Navbar
