import axios from 'axios'
import { IoBarChartSharp } from 'react-icons/io5'
import { MdQueryStats } from 'react-icons/md'
import { FaWpforms } from 'react-icons/fa'
import { ImProfile } from 'react-icons/im'

var url = 'https://jobify-prod.herokuapp.com/api/v1/toolkit'

export var autoFetch = axios.create({
  baseURL: url,
})

export var addUserToLocalStorage = (user) => {
  localStorage.setItem('user', JSON.stringify(user))
}

export var removeUserFromLocalStorage = () => {
  localStorage.removeItem('user')
}

export var getUserFromLocalStorage = () => {
  var user = JSON.parse(localStorage.getItem('user')) || null
  return user
}


export var links = [
  {
    id: 1,
    text: 'stats',
    path: '/',
    icon: <IoBarChartSharp />,
  },
  {
    id: 2,
    text: 'all jobs',
    path: 'all-jobs',
    icon: <MdQueryStats />,
  },
  {
    id: 3,
    text: 'add job',
    path: 'add-job',
    icon: <FaWpforms />,
  },
  {
    id: 4,
    text: 'profile',
    path: 'profile',
    icon: <ImProfile />,
  },
]