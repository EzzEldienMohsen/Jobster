import { FormRow } from '../../components'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import React from 'react'
import { updateUser } from '../../features/user/userSlice'
const Profile = () => {
  var { isLoading, user } = useSelector((state) => state.user)
  var [userData, setUserData] = React.useState({
    name: user?.name || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    location: user?.location || '',
  })
  var dispatch = useDispatch()
  var handleSubmit = (e) => {
    e.preventDefault()
    if (
      !userData.name ||
      !userData.lastName ||
      !userData.email ||
      !userData.location
    ) {
      toast.error('please fill out all fields')
      return
    }
    dispatch(
      updateUser({
        name: userData.name,
        lastName: userData.lastName,
        email: userData.email,
        location: userData.location,
      })
    )
  }
  var handleChange = (e) => {
    var name = e.target.name
    var value = e.target.value
    setUserData({ ...userData, [name]: value })
  }
  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>profile</h3>
        <div className="form-center">
          {/* Name */}
          <FormRow
            name="name"
            label="first name"
            type="text"
            value={userData.name}
            handleChange={handleChange}
          />
          {/*last Name */}
          <FormRow
            name="lastName"
            label="last name"
            type="text"
            value={userData.lastName}
            handleChange={handleChange}
          />
          {/* email */}
          <FormRow
            name="email"
            label="email"
            type="email"
            value={userData.email}
            handleChange={handleChange}
          />
          {/* location */}
          <FormRow
            name="location"
            label="location"
            type="text"
            value={userData.location}
            handleChange={handleChange}
          />
          <button
            className="btn btn-block"
            type="submit"
            onSubmit={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? 'please wait...' : 'save changes'}
          </button>
        </div>
      </form>
    </Wrapper>
  )
}

export default Profile
