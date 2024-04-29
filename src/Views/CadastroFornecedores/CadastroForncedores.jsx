import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardText,
  CardTitle,
  Col,
  Input,
  Label,
} from "reactstrap";

import logoCigam from "../../assets/images/logos_cigam/logo-cigam.png";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { adicionarFornecedorAguardandoIndexedDB } from "../../utils";

const CadastroFornecedores = () => {
  const [name, setName] = useState("");
  const [cep, setCep] = useState("");

  const [isOnline, setIsOnline] = useState(true)

  const navigate = useNavigate();


  const handleSave = async (e) => {
    e.preventDefault()
    if(cep.length !== 8){
      toast.warning('CEP inválido')
    }
    if(isOnline){
      axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => {
          alert(`localidade ${response.data.localidade}`)
          const localStorageOld = localStorage.getItem("fornecedores") ? JSON.parse(localStorage.getItem("fornecedores")) : []
          localStorage.setItem("fornecedores", JSON.stringify([...localStorageOld, {
            ...response.data,
            nome: name,
            data: new Date()
          }]))
          navigate('/home/administ')
        }).catch(error => {
          console.log(error)
          toast.error('Ocorreu um erro na busca')
        })
    } else {
      toast.warning('Sem conexão no momento. Seus dados serão enviados assim que possível.')
      try {
        await adicionarFornecedorAguardandoIndexedDB({cep: cep, nome: name});
        toast.success("Cliente salvo com sucesso no IndexedDB!");
        navigate('/home/administ')
      } catch (error) {
        toast.error("Erro ao salvar cliente no IndexedDB: " + error);
      }
    }

  }

  return (
    <div className="main-container">
      <Link
        className="brand-logo"
        to="/home/administ"
        style={{ position: "absolute", top: "2rem" }}
      >
        <div className="media-logo">
          <img
            className="img-top-left"
            style={{ position: "fixed", left: "10px" }}
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

      <form
        onSubmit={(e) => handleSave(e)}
      >
      <Card className="card-container">
        <CardText tag="h5" className="font-weight-bold mb-3">
          Cadastro de fornecedores
        </CardText>
        <Col sm="12" md="12" lg="12">
          <Label className="form-label" for="login-email">
            Nome
          </Label>
          <Input
            type="text"
            tabIndex="1"
            //placeholder='cigam@example.com'
            //autoFocus
            value={name}
            onChange={({ target: { value } }) => setName(value)}
            required
            id="user"
          />
        </Col>
        <Col className="mt-2" sm="12" md="12" lg="12">
          <Label className="form-label" for="login-email">
            CEP
          </Label>
          <Input
            type="number"
            tabIndex="1"
            //placeholder='cigam@example.com'
            //autoFocus
            value={cep}
            onChange={({ target: { value } }) => setCep(value)}
            required
            id="user"
          />
        </Col>
        <Col sm="12" md="12" lg="12">
          <Button
            className="button-login mt-5"
            id="buttonLogin"
            color="primary"
            type="submit"
            style={{ width: "100%" }}
          >
            Salvar
          </Button>
        </Col>
      </Card>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Button style={{width: '100px'}} className="mt-5" onClick={() => setIsOnline(!isOnline)}>{isOnline ? "Offline" : "Online"}</Button>
        </div>
      </form>
    </div>
  );
};

export default CadastroFornecedores;
