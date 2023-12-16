import React from 'react'
import { Logo, FormRow } from '../components'
import Wrapper from '../assets/wrappers/RegisterPage'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { registerUser, loginUser } from '../features/user/userSlice'
import { useNavigate } from 'react-router-dom'

var initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
}

const Register = () => {
  var [values, setValues] = React.useState(initialState)
  var dispatch = useDispatch()
  var { isLoading, user } = useSelector((state) => state.user)
  var navigate = useNavigate()
  var handleChange = (e) => {
    var name = e.target.name
    var value = e.target.value
    setValues({ ...values, [name]: value })
  }

  var onSubmit = (e) => {
    e.preventDefault()
    var { name, email, password, isMember } = values
    if (!email || !password || (!isMember && !name)) {
      toast.warn('please fill out all  fields')
    }
    if (isMember) {
      dispatch(loginUser({ email: email, password: password }))
      return
    }
    dispatch(registerUser({ name, email, password }))
  }

  var toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember })
  }
  React.useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/')
      }, 1500)
    }
  }, [user, navigate])
  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? 'Login' : 'register'}</h3>
        {/* NAME FIELD */}
        {!values.isMember && (
          <FormRow
            name="name"
            type="text"
            label="name"
            value={values.name}
            handleChange={handleChange}
          />
        )}
        {/* EMAIL */}
        <FormRow
          name="email"
          type="email"
          label="email"
          value={values.email}
          handleChange={handleChange}
        />
        {/* PASSWORD */}
        <FormRow
          name="password"
          type="password"
          label="password"
          value={values.password}
          handleChange={handleChange}
        />
        {/* SUBMIT BUTTON */}
        <button disabled={isLoading} type="submit" className="btn btn-block">
          {isLoading ? 'is submitting...' : 'submit'}
        </button>
        {/* demo user */}

        <button
          type="button"
          className="btn btn-block btn-hipster"
          disabled={isLoading}
          onClick={() => {
            dispatch(
              loginUser({ email: 'testUser@test.com', password: 'secret' })
            )
          }}
        >
          {isLoading ? 'loading...' : 'demo user (Read only)'}
        </button>
        {/* toggle button */}
        <p>
          {values.isMember ? 'Not a member yet?' : 'Already a member ?'}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? 'register' : 'login'}
          </button>
        </p>
      </form>
    </Wrapper>
  )
}

export default Register
