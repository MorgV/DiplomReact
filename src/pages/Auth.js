import React, { useContext, useState } from "react";
import { Button, Card, Container, Form, Row } from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { login, registration } from "../http/UserAPI";
import { REGISTRATION_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/constans'
import {Context} from '../index'
import { observer } from "mobx-react-lite";
import CodeConfirmation from "../components/CodeConfirmation";
import { generateСode } from '../http/deviceAPI'


const Auth = observer(() => {
    const {user} = useContext(Context)
    const navigation = useNavigate()
    const location = useLocation()
    const isAuth = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [show, setShow] = useState(false)
    const [code, setCode] = useState(false)

    const click = async () => {
        try {        
            let data;
            if (isAuth) {
                data = await login(email,password)
            } else {
                if(password != password2){
                    alert('Пароли не совпадают')
                }else{
                    setShow(true)
                    generateСode(email).then(dat => {
                        setCode(dat)
                    })
                }
            }
            if (isAuth) {
                user.setUser(data.email)
                user.setAuth(true)  
                user.setRole(data.role) 
                user.setId(data.id)
                localStorage.setItem('isAuth', true)
                navigation(SHOP_ROUTE)
            }
        }catch (e){
            alert(e.response.data.message)
        }
    }

    console.log(user._role)
    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ height: window.innerHeight - 54, paddingTop:'185px'}}
        >
            <Card style={{ width: 600 }} className='p-5'>
                <h2 className="m-auto">{isAuth ? 'Авторизация' : 'Регистрация'}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        placeholder="Введите ваш email..."
                        className="mt-3"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    ></Form.Control>

                    <Form.Control
                        placeholder="Введите ваш пароль..."
                        className="mt-3"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    ></Form.Control>
                    {!isAuth ? <div> <Form.Control
                            placeholder="Подтвердите ваш пароль..."
                            className="mt-3"
                            type="password"
                            value={password2}
                            onChange={e => setPassword2(e.target.value)}
                        ></Form.Control>
                        <CodeConfirmation  email={email} password={password} code={code} onHide={() => setShow(!show) } show={show}/>
                        </div>
                :<div></div>}
                    <Row className="pl-3 pr-3 pm-3" >
                        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0 0 0' }}>
                            {isAuth ? <span>Нет акаунта? <NavLink style={{ margin: "0 0 0 10px" }} to={REGISTRATION_ROUTE}>Зарегестрируйся!</NavLink></span>
                                :
                                <span>Есть акаунт? <NavLink style={{ margin: "0 0 0 10px" }} to={LOGIN_ROUTE}>Войдите!</NavLink></span>}
                            <Button onClick={() => click()} className="mt-2" variant="outline-primary">
                                {isAuth ? 'Войти' : "Регистрация"}
                            </Button>
                        </div>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth