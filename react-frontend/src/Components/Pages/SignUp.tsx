import React from 'react'
import { Container } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from './SignUp.module.css'
import { useRef } from 'react';
import { useHistory } from 'react-router-dom';


function SignUp() {

  const history = useHistory()

    const signUpEmail = useRef<HTMLInputElement>(null)
    const signUpPassword = useRef<HTMLInputElement>(null)
    const signUpConfirmPassword = useRef<HTMLInputElement>(null)

    const formSubmitHandler = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        try{
          const inputEmail = signUpEmail.current?.value;
        const inputPassword = signUpPassword.current?.value;
        const inputConfirmPassword = signUpConfirmPassword.current?.value;

        console.log(">>",inputEmail,inputPassword,inputConfirmPassword)

        const response = await fetch('http://localhost:8000/user/signup',{
          method:'POST',
          body:JSON.stringify({
            email:inputEmail,
            password:inputPassword,
            confirmPassword:inputConfirmPassword
          }),
          headers:{
            'Content-Type':'application/json'
          }
          
        })

        console.log(response,)
        if(response.status ===500){
          const data = await response.json()
          console.log(data)
            const ErrorMessage:string = data
            throw new Error(ErrorMessage)
        }


        else if(response.status ===201){
          const data = await response.json()
          console.log(data)
          history.push('/login')
          
        }
        }
        catch(err){
          console.log(err)
          alert(err)

        }
        
      
    }

  return (
    <Container className={styles.container}>
      <h1>SignUp</h1>
      <Form onSubmit={formSubmitHandler}>
        <Form.Group className="mb-3" controlId="Email" >
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" ref={signUpEmail} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="Password" >
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" ref={signUpPassword} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="confirmPassword" >
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="Password" ref={signUpConfirmPassword}  />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  )
}

export default SignUp
