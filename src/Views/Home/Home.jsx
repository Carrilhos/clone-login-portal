import { Link, useNavigate, useParams } from "react-router-dom"
import { Button, Card } from "reactstrap"

import logoCigam from "../../assets/images/logos_cigam/logo-cigam.png";

import "./Home.scss"
import { useEffect, useState } from "react";
import { buscarFornecedorIndexedDB } from "../../utils";
import axios from "axios";
import { toast } from "react-toastify";

const Home = () => {
  const [isOnline, setIsOnline] = useState(false)


  // useEffect(() => {

  //   const onlineStatus = () =>{navigator.onLine ? setIsOnline(false) : setIsOnline(false)}

  //   window.addEventListener("online", onlineStatus);
  //   window.addEventListener("offline", onlineStatus);
  // }, [])

  const { username } = useParams()

  const navigate = useNavigate();

  useEffect(() => {
    if(isOnline) return
    const handleCheck = async () => {
      const result = await buscarFornecedorIndexedDB()
      axios.get(`https://viacep.com.br/ws/${result.cep}/json/`)
      .then(response => {
        alert(`localidade ${response.data.localidade}`)
        const localStorageOld = localStorage.getItem("fornecedores") ? JSON.parse(localStorage.getItem("fornecedores")) : []
        localStorage.setItem("fornecedores", JSON.stringify([...localStorageOld, {
          ...response.data,
          nome: result.name,
          data: new Date()
        }]))
        toast.success("Dados pendentes de envio foram salvos")
      }).catch(error => {
        console.log(error)
        toast.error('Ocorreu um erro na busca')
      })

      return result
    }

    handleCheck()
  }, [isOnline])


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
      <div style={{height: '20px', marginBottom: '15px'}}>
      {<p style={{color:  "#FF9494"}}>{!isOnline && "Você está Offline"}</p>}
      </div>
      <Card className="card-container"> 
        <h3> {isOnline ? `Bem vindo ${username}!` : "Usuário offline."}</h3>
        <span style={{margin: '10px 0px'}}> O que deseja fazer?</span>
        <Button disabled={!isOnline} className="buttons-link mb-2">Lista de fornecedores</Button>
        <Button className="buttons-link" onClick={() => navigate('/fornecedores/cadastro')}>Cadastro de fornecedores</Button>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Button style={{width: '100px'}} className="mt-5" onClick={() => setIsOnline(!isOnline)}>{isOnline ? "Offline" : "Online"}</Button>
        </div>
      </Card>
    </div>
  )
}

export default Home