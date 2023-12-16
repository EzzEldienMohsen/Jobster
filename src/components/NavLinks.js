import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toggleSidebar } from '../features/user/userSlice'
import { links } from '../utilities'

const NavLinks = () => {
  var dispatch = useDispatch()
  var toggle = () => {
    dispatch(toggleSidebar())
  }
  return (
    <div className="nav-links">
      {links.map((link) => {
        return (
          <NavLink
            key={link.id}
            to={link.path}
            className={({ isActive }) => {
              return isActive ? 'nav-link active' : 'nav-link'
            }}
            onClick={toggle}
          >
            <span className="icon">{link.icon}</span> {link.text}
          </NavLink>
        )
      })}
    </div>
  )
}

export default NavLinks
