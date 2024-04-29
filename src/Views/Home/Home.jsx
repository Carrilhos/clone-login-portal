import { Link, useParams } from "react-router-dom"
import { Card } from "reactstrap"

import logoCigam from "../../assets/images/logos_cigam/logo-cigam.png";

import "./Home.scss"
import "../Login/Login.scss"

const Home = () => {

  const { username } = useParams()

  return (
    <div className="main-container">
      <Link className="brand-logo" to="/" style={{position: "absolute", top: '2rem'}}>
        <div className="media-logo">
          <img
            className="img-top-left"
            style={{position: 'fixed', left: '10px'}}
            height="50vh"
            src={logoCigam}
            alt="Logo da Cigam no canto superior esquerdo"
          />
        </div>
        <div className="brand-text text-primary ml-1" />
      </Link>
      <Card className="card-container"> 
        <h3> Bem vindo {username}!</h3>
      </Card>
    </div>
  )
}

export default Home