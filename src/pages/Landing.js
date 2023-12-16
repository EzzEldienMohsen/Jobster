import { Link } from 'react-router-dom'
import main from '../assets/images/main.svg'
import Wrapper from '../assets/wrappers/LandingPage'
import { Logo } from '../components'

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        {/* INFO */}
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Exercitationem tempore facere aspernatur voluptates magnam! Error
            voluptatem officiis ut eveniet asperiores!
          </p>
          <Link to="/register" className="btn btn-hero">
            Login/Register
          </Link>
        </div>
        {/* IMAGE */}
        <img src={main} alt="jobster" className="img main-img" />
      </div>
    </Wrapper>
  )
}

export default Landing
