import { useState } from 'react'

import { useNavigate, Link } from "react-router-dom";

import {
  Button,
  Card,
  FormGroup,
  Input,
  Label,
  CardTitle,
  CardText,
  Col,
  Row,
  Form,
} from "reactstrap";

import logoCigam from "../assets/images/logos_cigam/logo-cigam.png";

import source from "../assets/images/pages/login-v2.svg";

import "./Login.scss";
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();

  const [acessKey, setAcessKey] = useState("")
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")

  // const illustration = "login-v2.svg",
  //   source = require(`../assets/images/pages/${illustration}`).default;

  const handleLogin = (e) => {
    const loginBase64 = btoa(`${user}:${password}`);

		const headers = acessKey
			? {
					Authorization: `Basic ${loginBase64}`,
					Acesso: `${acessKey}`,
					"Access-Control-Allow-Origin": "*",
			  }
			: {
					Authorization: `Basic ${loginBase64}`,
					"Access-Control-Allow-Origin": "*",
			  };


    axios.post(` ${process.env.REACT_APP_API}/autenticacao/autenticar`, {
      username: user,
      password
    }, {headers: headers})
      .then(response => {
        alert('Logado')
        console.log(response)
      })
      .catch(error => console.log(error))
  }

  return (
    <div className="app">
    <div className="auth-wrapper auth-v2">
      <Row className="auth-inner m-0">

      <Link className="brand-logo" to="/" onClick={(e) => e.preventDefault()}>
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
      <Col className="d-none d-lg-flex align-items-center" lg="8" sm="12">
        <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
          <img
            className="img-fluid"
            src={source}
            alt="Imagem ilustrando uma reunião em equipe."
          />
        </div>
      </Col>
        <Col
          className="d-flex align-items-center auth-bg px-2 p-lg-5"
          lg="4"
          sm="12"
        >
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
            <CardTitle tag="h2" className="font-weight-bold mb-1">
              {process.env.IS_DEV ? "Rodando localhost" : "Rodando build"}
            </CardTitle>
            <CardText className="mb-2">Por favor, entre na sua conta</CardText>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin()
                // navigate("/home");
              }}
            >
              <FormGroup>
                <Label className="form-label" for="access-key">
                  Chave de acesso
                </Label>
                <Input
                  type="text"
                  autoFocus
                  tabIndex="1"
                  value={acessKey}
                  onChange={({target : {value}} ) => setAcessKey(value)}
                  required
                  id="acesskey"
                />
              </FormGroup>

              <FormGroup>
                <Label className="form-label" for="login-email">
                  Usuário
                </Label>
                <Input
                  type="text"
                  tabIndex="1"
                  //placeholder='cigam@example.com'
                  //autoFocus
                  value={user}
                  onChange={({target : {value}} ) => setUser(value)}
                  required
                  id="user"
                />
              </FormGroup>
              <FormGroup>
                <div className="d-flex justify-content-between">
                  <Label className="form-label" for="login-password">
                    Senha
                  </Label>
                </div>
                <Input
                  className="input-group-merge mb-2"
                  htmlFor="merge-password"
                  tabIndex="1"
                  id="password"
                  //autoFocus
                  value={password}
                  onChange={({target : {value}} ) => setPassword(value)}
                  required
                  placeholder=""
                />
              </FormGroup>
              <Button
                className="button-login"
                id="buttonLogin"
                color="primary"
                onClick={false}
                style={{width: '100%'}}
              >
                Entrar
              </Button>
            </Form>
          </Col>
        </Col>
      </Row>
    </div>
    </div>
  );
};

export default Login;
