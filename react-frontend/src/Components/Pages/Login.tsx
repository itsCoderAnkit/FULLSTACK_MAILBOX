import React,{useRef} from 'react'
import { Container } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from './Login.module.css'
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { AuthActions } from '../../Store/AuthSlice';
import { useDispatch } from 'react-redux';

function Login() {

    const history = useHistory()
    const dispatch = useDispatch()
    const inputLoginEmail = useRef<HTMLInputElement>(null)
    const inputLoginPassword = useRef<HTMLInputElement>(null)

    const loginSubmitHandler=async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        try{
            const loginEmail = inputLoginEmail.current?.value
            const loginPassword = inputLoginPassword.current?.value
            console.log(loginEmail)

            const response = await fetch('http://localhost:8000/user/login',{
                method:'POST',
                body:JSON.stringify({
                    email:loginEmail,
                    password:loginPassword
                }),
                headers:{
                    'Content-Type':'application/json'
                }

            })

            //console.log(">>",response)
            if(response.status===200){
                const data = await response.json()
                console.log("log data",data)
                localStorage.setItem('token',data.token)
                dispatch(AuthActions.login({emailId:loginEmail, tokenId:data.token}))
                history.push('/welcome')
            }
            else{
                const data = await response.json()
                console.log(data)
                throw new Error(data.message)
            }
        }
        catch(err){
            console.log(err)
            alert(err)
        }

    }


  return (
    <Container className={styles.container}>
            <h1>Login Form</h1>
            <Form onSubmit={loginSubmitHandler}>
                <Form.Group className="mb-3" controlId="Email" >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" ref={inputLoginEmail} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="Password" >
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" ref={inputLoginPassword} required />
                </Form.Group>
                <Link to="/forgot-password">Forgot Password</Link>
                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        </Container>
  )
}

export default Login
